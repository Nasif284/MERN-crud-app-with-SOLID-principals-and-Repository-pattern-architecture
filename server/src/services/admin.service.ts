import { StudentRepository } from "../repositories/student.repository";
import { IStudentDocument } from "../models/student.model";

export class AdminService {
    constructor(private studentRepo: StudentRepository) { }

    async getAllStudents(): Promise<IStudentDocument[]> {
        return this.studentRepo.findAll();
    }

    async blockStudent(id: string): Promise<IStudentDocument | null> {
        return this.studentRepo.update(id, { blocked: true });
    }

    async unblockStudent(id: string): Promise<IStudentDocument | null> {
        return this.studentRepo.update(id, { blocked: false });
    }

    async updateStudent(id: string, data: Partial<IStudentDocument>): Promise<IStudentDocument | null> {
        return this.studentRepo.update(id, data);
    }
}
