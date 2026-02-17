import mongoose from "mongoose";

export async function connectDb() {
   return mongoose
     .connect("mongodb://localhost:27017/student-management-system")
     .then(() => console.log("Database connected"))
     .catch((err) => console.error("Database connection error:", err));
}