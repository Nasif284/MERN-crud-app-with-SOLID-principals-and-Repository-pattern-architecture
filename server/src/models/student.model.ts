import { Schema } from "mongoose";
import { Student } from "../interfaces/student.interface";
import { UserModel, IUserDocument } from "./user.model";

export interface IStudentDocument extends IUserDocument, Student { }

const StudentSchema = new Schema<IStudentDocument>({
    course: { type: String, required: true },
    age: { type: Number, required: true }
});

export const StudentModel = UserModel.discriminator<IStudentDocument>("Student", StudentSchema, "STUDENT");
