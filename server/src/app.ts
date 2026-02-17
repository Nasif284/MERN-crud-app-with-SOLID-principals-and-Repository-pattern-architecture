import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import adminAuthRoutes from "./routes/admin.auth.route";
import studentAuthRoutes from "./routes/student.auth.route";
import adminRoutes from "./routes/admin.route";
import studentRoutes from "./routes/student.route";
import { connectDb } from "./config/db";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", studentAuthRoutes);       
app.use("/admin", adminAuthRoutes);    

app.use("/admin", adminRoutes);       
app.use("/student", studentRoutes);  
connectDb()
const PORT =5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
