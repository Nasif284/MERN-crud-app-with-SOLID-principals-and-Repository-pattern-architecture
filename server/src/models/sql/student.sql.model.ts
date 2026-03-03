import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db";
import { UserSql } from "./user.sql.model";

export interface StudentSqlAttributes {
    id: number;
    userId: number;   
    course: string;
    age: number;
}

export interface StudentSqlCreationAttributes
    extends Optional<StudentSqlAttributes, "id"> { }


export class StudentSql
    extends Model<StudentSqlAttributes, StudentSqlCreationAttributes>
    implements StudentSqlAttributes {
    declare id: number;
    declare userId: number;
    declare course: string;
    declare age: number;
}

StudentSql.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: UserSql, key: "id" },
            onDelete: "CASCADE",
        },
        course: { type: DataTypes.STRING, allowNull: false },
        age: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
        sequelize,
        tableName: "students",
        timestamps: false,
    }
);

UserSql.hasOne(StudentSql, { foreignKey: "userId", as: "studentProfile" });
StudentSql.belongsTo(UserSql, { foreignKey: "userId", as: "user" });
