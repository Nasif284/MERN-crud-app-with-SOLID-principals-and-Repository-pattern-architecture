import { SqlBaseRepository } from "./sql.base.repository";
import {
    AdminSql,
    AdminSqlCreationAttributes,
} from "../../models/sql/admin.sql.model";
import { UserSql } from "../../models/sql/user.sql.model";

export class AdminSqlRepository extends SqlBaseRepository<
    AdminSql,
    AdminSqlCreationAttributes
> {
    constructor() {
        super(AdminSql);
    }

    async findByUserId(userId: number): Promise<AdminSql | null> {
        return AdminSql.findOne({ where: { userId } });
    }

    async findAllWithUser(): Promise<AdminSql[]> {
        return AdminSql.findAll({
            include: [{ model: UserSql, as: "user" }],
        });
    }
}
