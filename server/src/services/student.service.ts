import { StudentRepository } from "../repositories/student.repository";
import { IStudentDocument } from "../models/student.model";
import { DbSyncService } from "./db.sync.service";

export class StudentService {
    constructor(
        private studentRepo: StudentRepository,
        private syncService: DbSyncService             
    ) { }

    async getProfile(id: string): Promise<IStudentDocument | null> {
        return this.studentRepo.findById(id);
    }

    async updateProfile(
        id: string,
        data: Partial<IStudentDocument>
    ): Promise<IStudentDocument | null> {
        const student = await this.studentRepo.update(id, data);
        if (student) {
            this.syncService.onStudentUpdated(student).catch(console.error);
        }
        return student;
    }
}