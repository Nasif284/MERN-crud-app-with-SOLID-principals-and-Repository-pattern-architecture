import { BaseRepository } from "./base.repository";
import { IStudentDocument, StudentModel } from "../models/student.model";

export class StudentRepository extends BaseRepository<IStudentDocument> {
    constructor() {
        super(StudentModel);
    }
}