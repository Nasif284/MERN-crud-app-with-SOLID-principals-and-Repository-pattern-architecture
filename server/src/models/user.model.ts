import mongoose, { Schema, Document } from "mongoose";
import { User } from "../interfaces/user.interface";

export interface IUserDocument extends User, Document { }

const UserSchema = new Schema<IUserDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "STUDENT"], required: true },
    blocked: { type: Boolean, default: false },
}, {
    discriminatorKey: 'role',
    timestamps: true
});

export const UserModel = mongoose.model<IUserDocument>("User", UserSchema);
