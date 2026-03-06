import { StudentRepository } from "../repositories/student.repository";
import { IStudentDocument } from "../models/student.model";
import { DbSyncService } from "./db.sync.service";

export class StudentService {
    constructor(
        private _studentRepo: StudentRepository,
        private _syncService: DbSyncService
    ) { }

    async getProfile(id: string): Promise<IStudentDocument | null> {
        return this._studentRepo.findById(id);
    }

    async updateProfile(
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