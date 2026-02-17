import { StudentRepository } from "../repositories/student.repository";
import { UserRepository } from "../repositories/user.repository";
import { AdminRepository } from "../repositories/admin.repository";

import { StudentService } from "../services/student.service";
import { AuthService } from "../services/auth.service";
import { AdminService } from "../services/admin.service";

import { StudentController } from "../controllers/student.controller";
import { AuthController } from "../controllers/auth.controller";
import { AdminController } from "../controllers/admin.controller";

const studentRepo = new StudentRepository();
const userRepo = new UserRepository();
const adminRepo = new AdminRepository();

export const studentService = new StudentService(studentRepo);
export const authService = new AuthService(userRepo, studentRepo, adminRepo);
export const adminService = new AdminService(studentRepo);

export const studentController = new StudentController(studentService);
export const authController = new AuthController(authService);
export const adminController = new AdminController(adminService);
