
import "../models/sql/user.sql.model";
import "../models/sql/student.sql.model";
import "../models/sql/admin.sql.model";

import { StudentRepository } from "../repositories/student.repository";
import { UserRepository } from "../repositories/user.repository";
import { AdminRepository } from "../repositories/admin.repository";


import { UserSqlRepository } from "../repositories/sql/user.sql.repository";
import { StudentSqlRepository } from "../repositories/sql/student.sql.repository";
import { AdminSqlRepository } from "../repositories/sql/admin.sql.repository";

import { DbSyncService } from "../services/db.sync.service";
import { StudentService } from "../services/student.service";
import { AuthService } from "../services/auth.service";
import { AdminService } from "../services/admin.service";

import { StudentController } from "../controllers/student.controller";
import { AuthController } from "../controllers/auth.controller";
import { AdminController } from "../controllers/admin.controller";

const studentRepo = new StudentRepository();
const userRepo = new UserRepository();
const adminRepo = new AdminRepository();

const userSqlRepo = new UserSqlRepository();
const studentSqlRepo = new StudentSqlRepository();
const adminSqlRepo = new AdminSqlRepository();

export const syncService = new DbSyncService(
    userRepo,
    studentRepo,
    adminRepo,
    userSqlRepo,
    studentSqlRepo,
    adminSqlRepo
);

export const studentService = new StudentService(studentRepo, syncService);
export const authService = new AuthService(
    userRepo,
    studentRepo,
    adminRepo,
    syncService
);
export const adminService = new AdminService(studentRepo, syncService);

export const studentController = new StudentController(studentService);
export const authController = new AuthController(authService);
export const adminController = new AdminController(adminService);
