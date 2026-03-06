import mongoose from "mongoose";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export async function connectMongoDB(): Promise<void> {
        const uri = process.env.MONGO_URI || "mongodb://localhost:27017/student-management-system";
        try {
                await mongoose.connect(uri);
                console.log("MongoDB connected");
        } catch (err) {
                console.error("MongoDB connection error:", err);
        }
}

const dbUrl = process.env.DATABASE_URL || `postgres://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASS || 'password'}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '5432'}/${process.env.DB_NAME || 'student_db'}`;

export const sequelize = new Sequelize(dbUrl, {
        dialect: "postgres",
        logging: console.log,
});

export async function connectSQL(): Promise<void> {
        try {
                await sequelize.authenticate();
                console.log("PostgreSQL connected");
                await sequelize.sync();
                console.log("SQL tables synced");
        } catch (err) {
                console.error("SQL connection error:", err);
                process.exit(1);
        }
}

export async function connectDb(): Promise<void> {
        await connectMongoDB();
        await connectSQL();
}
