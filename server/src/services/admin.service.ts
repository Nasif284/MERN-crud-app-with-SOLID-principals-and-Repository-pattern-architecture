import { StudentRepository } from "../repositories/student.repository";
import { IStudentDocument } from "../models/student.model";
import { DbSyncService } from "./db.sync.service";

export class AdminService {
    constructor(
        private _studentRepo: StudentRepository,
        private _syncService: DbSyncService
    ) { }

    async getAllStudents(): Promise<IStudentDocument[]> {
        return this._studentRepo.findAll();
    }

    async blockStudent(id: string): Promise<IStudentDocument | null> {
        const student = await this._studentRepo.update(id, { blocked: true });
        if (student) {
            this._syncService
                .onStudentBlockStatusChanged(String(student._id), true)
                .catch(console.error);
        }
        return student;
    }

    async unblockStudent(id: string): Promise<IStudentDocument | null> {
        const student = await this._studentRepo.update(id, { blocked: false });
        if (student) {
            this._syncService
                .onStudentBlockStatusChanged(String(student._id), false)
                .catch(console.error);
        }
        return student;
    }

    async updateStudent(
        id: string,
        data: Partial<IStudentDocument>
    ): Promise<IStudentDocument | null> {
        const student = await this._studentRepo.update(id, data);
        if (student) {
            this._syncService.onStudentUpdated(student).catch(console.error);
        }
        return student;
    }
}
