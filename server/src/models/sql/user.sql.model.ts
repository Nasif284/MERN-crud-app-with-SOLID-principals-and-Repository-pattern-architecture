import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db";

export interface UserSqlAttributes {
    id: number;
    mongoId: string;           
    name: string;
    email: string;
    password: string;
    role: "ADMIN" | "STUDENT";
    blocked: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserSqlCreationAttributes
    extends Optional<UserSqlAttributes, "id" | "blocked" | "createdAt" | "updatedAt"> { }

export class UserSql
    extends Model<UserSqlAttributes, UserSqlCreationAttributes>
    implements UserSqlAttributes {
    declare id: number;
    declare mongoId: string;
    declare name: string;
    declare email: string;
    declare password: string;
    declare role: "ADMIN" | "STUDENT";
    declare blocked: boolean;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

UserSql.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        mongoId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            comment: "MongoDB _id for cross-DB reference",
        },
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        role: {
            type: DataTypes.ENUM("ADMIN", "STUDENT"),
            allowNull: false,
        },
        blocked: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
        sequelize,
        tableName: "users",
        timestamps: true,
    }
);
