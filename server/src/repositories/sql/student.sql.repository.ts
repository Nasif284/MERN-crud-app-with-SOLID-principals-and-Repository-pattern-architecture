import { SqlBaseRepository } from "./sql.base.repository";
import {
    StudentSql,
    StudentSqlCreationAttributes,
} from "../../models/sql/student.sql.model";
import { UserSql } from "../../models/sql/user.sql.model";

export class StudentSqlRepository extends SqlBaseRepository<
    StudentSql,
    StudentSqlCreationAttributes
> {
    constructor() {
        super(StudentSql);
    }

    async findAllWithUser(): Promise<StudentSql[]> {
        return StudentSql.findAll({
            include: [{ model: UserSql, as: "user" }],
        });
    }

    async findByUserId(userId: number): Promise<StudentSql | null> {
        return StudentSql.findOne({ where: { userId } });
    }
}
