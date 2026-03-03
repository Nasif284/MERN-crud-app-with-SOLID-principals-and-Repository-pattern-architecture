import { UserRepository } from "../repositories/user.repository";
import { StudentRepository } from "../repositories/student.repository";
import { AdminRepository } from "../repositories/admin.repository";

import { UserSqlRepository } from "../repositories/sql/user.sql.repository";
import { StudentSqlRepository } from "../repositories/sql/student.sql.repository";
import { AdminSqlRepository } from "../repositories/sql/admin.sql.repository";

import { IUserDocument } from "../models/user.model";
import { IStudentDocument } from "../models/student.model";
import { RegisterDTO } from "../dtos/auth.dto";

export class DbSyncService {
    constructor(
        private userMongoRepo: UserRepository,
        private studentMongoRepo: StudentRepository,
        private adminMongoRepo: AdminRepository,
        private userSqlRepo: UserSqlRepository,
        private studentSqlRepo: StudentSqlRepository,
        private adminSqlRepo: AdminSqlRepository
    ) { }
    private async syncUserToSql(user: IUserDocument): Promise<number | null> {
        try {
            const existing = await this.userSqlRepo.findByMongoId(
                String(user._id)
            );

            if (existing) {
                await existing.update({
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    role: user.role,
                    blocked: user.blocked,
                });
                return existing.id;
            }

            const created = await this.userSqlRepo.create({
                mongoId: String(user._id),
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role,
                blocked: user.blocked,
            });
            return created.id;
        } catch (err) {
            console.error("[Sync] Failed to sync user to SQL:", err);
            return null;
        }
    }

    async onStudentCreated(student: IStudentDocument): Promise<void> {
        const sqlUserId = await this.syncUserToSql(student);
        if (!sqlUserId) return;

        try {
            const existing = await this.studentSqlRepo.findByUserId(sqlUserId);
            if (!existing) {
                await this.studentSqlRepo.create({
                    userId: sqlUserId,
                    course: student.course,
                    age: student.age,
                });
                console.log(`[Sync] Student ${student.email} mirrored to SQL ✅`);
            }
        } catch (err) {
            console.error("[Sync] Failed to sync student profile to SQL:", err);
        }
    }

    async onAdminCreated(user: IUserDocument & { permissions?: string[] }): Promise<void> {
        const sqlUserId = await this.syncUserToSql(user);
        if (!sqlUserId) return;

        try {
            const existing = await this.adminSqlRepo.findByUserId(sqlUserId);
            if (!existing) {
                await this.adminSqlRepo.create({
                    userId: sqlUserId,
                    permissions: JSON.stringify(user.permissions ?? []),
                });
                console.log(`[Sync] Admin ${user.email} mirrored to SQL ✅`);
            }
        } catch (err) {
            console.error("[Sync] Failed to sync admin profile to SQL:", err);
        }
    }

    async onStudentUpdated(student: IStudentDocument): Promise<void> {
        const sqlUserId = await this.syncUserToSql(student);
        if (!sqlUserId) return;

        try {
            const studentRow = await this.studentSqlRepo.findByUserId(sqlUserId);
            if (studentRow) {
                await studentRow.update({
                    course: student.course,
                    age: student.age,
                });
                console.log(`[Sync] Student ${student.email} updated in SQL ✅`);
            }
        } catch (err) {
            console.error("[Sync] Failed to update student in SQL:", err);
        }
    }

    async onStudentBlockStatusChanged(
        mongoId: string,
        blocked: boolean
    ): Promise<void> {
        try {
            const userRow = await this.userSqlRepo.findByMongoId(mongoId);
            if (userRow) {
                await userRow.update({ blocked });
                console.log(
                    `[Sync] Student mongoId=${mongoId} blocked=${blocked} synced to SQL ✅`
                );
            }
        } catch (err) {
            console.error("[Sync] Failed to sync block status to SQL:", err);
        }
    }
    async fullResync(): Promise<{ synced: number; errors: number }> {
        let synced = 0;
        let errors = 0;

        console.log("[Sync] Starting full re-sync from MongoDB → SQL...");

        try {
            const students = await this.studentMongoRepo.findAll();
            for (const student of students) {
                try {
                    await this.onStudentCreated(student);
                    synced++;
                } catch {
                    errors++;
                }
            }
        } catch (err) {
            console.error("[Sync] Failed to fetch students for re-sync:", err);
        }

        console.log(
            `[Sync] Full re-sync complete. Synced: ${synced}, Errors: ${errors}`
        );
        return { synced, errors };
    }
}
