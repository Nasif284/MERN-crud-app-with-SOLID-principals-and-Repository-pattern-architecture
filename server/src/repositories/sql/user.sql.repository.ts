import { SqlBaseRepository } from "./sql.base.repository";
import {
    UserSql,
    UserSqlAttributes,
    UserSqlCreationAttributes,
} from "../../models/sql/user.sql.model";

export class UserSqlRepository extends SqlBaseRepository<
    UserSql,
    UserSqlCreationAttributes
> {
    constructor() {
        super(UserSql);
    }
    async findByEmail(email: string): Promise<UserSql | null> {
        return UserSql.findOne({ where: { email } });
    }
}
