import { StudentRepository } from "../repositories/student.repository";
import { IStudentDocument } from "../models/student.model";

export class StudentService {
    constructor(private studentRepo: StudentRepository) { }

    async getProfile(id: string): Promise<IStudentDocument | null> {
        return this.studentRepo.findById(id);
    }

    async updateProfile(id: string, data: Partial<IStudentDocument>): Promise<IStudentDocument | null> {
        // Prevent updating critical fields like email/role via this method if necessary
        // For simplicity, allow updates
        return this.studentRepo.update(id, data);
    }
}