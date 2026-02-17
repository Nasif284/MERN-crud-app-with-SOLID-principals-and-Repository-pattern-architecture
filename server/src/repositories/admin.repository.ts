import { BaseRepository } from "./base.repository";
import { IAdminDocument, AdminModel } from "../models/admin.model";

export class AdminRepository extends BaseRepository<IAdminDocument> {
    constructor() {
        super(AdminModel);
    }
}
