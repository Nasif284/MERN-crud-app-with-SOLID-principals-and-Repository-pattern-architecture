import { BaseRepository } from "./base.repository";
import { IUserDocument, UserModel } from "../models/user.model";

export class UserRepository extends BaseRepository<IUserDocument> {
    constructor() {
        super(UserModel);
    }

    async findByEmail(email: string): Promise<IUserDocument | null> {
        return await this.model.findOne({ email }).exec();
    }
}
