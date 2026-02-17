import { Schema } from "mongoose";
import { Admin } from "../interfaces/admin.interface";
import { UserModel, IUserDocument } from "./user.model";

export interface IAdminDocument extends IUserDocument, Admin { }

const AdminSchema = new Schema<IAdminDocument>({
    permissions: [{ type: String, default: [] }]
});

export const AdminModel = UserModel.discriminator<IAdminDocument>("Admin", AdminSchema, "ADMIN");
