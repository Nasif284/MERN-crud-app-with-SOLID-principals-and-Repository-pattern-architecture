import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db";
import { UserSql } from "./user.sql.model";

export interface AdminSqlAttributes {
    id: number;
    userId: number;
    permissions: string;
}

export interface AdminSqlCreationAttributes
    extends Optional<AdminSqlAttributes, "id" | "permissions"> { }


export class AdminSql
    extends Model<AdminSqlAttributes, AdminSqlCreationAttributes>
    implements AdminSqlAttributes {
    declare id: number;
    declare userId: number;
    declare permissions: string;

    getPermissionsArray(): string[] {
        try {
            return JSON.parse(this.permissions || "[]");
        } catch {
            return [];
        }
    }
}

AdminSql.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: UserSql, key: "id" },
            onDelete: "CASCADE",
        },
        permissions: {
            type: DataTypes.TEXT,
            defaultValue: "[]",
            comment: "JSON-serialized permissions array",
        },
    },
    {
        sequelize,
        tableName: "admins",
        timestamps: false,
    }
);

UserSql.hasOne(AdminSql, { foreignKey: "userId", as: "adminProfile" });
AdminSql.belongsTo(UserSql, { foreignKey: "userId", as: "user" });
