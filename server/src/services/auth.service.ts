import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository";
import { StudentRepository } from "../repositories/student.repository";
import { AdminRepository } from "../repositories/admin.repository";
import { LoginDTO, RegisterDTO } from "../dtos/auth.dto";
import { generateToken, generateRefreshToken, verifyRefreshToken } from "../utils/token.utils";
import { DbSyncService } from "./db.sync.service";
import { IStudentDocument } from "../models/student.model";
import { IUserDocument } from "../models/user.model";

export class AuthService {
    constructor(
        private _userRepo: UserRepository,
        private _studentRepo: StudentRepository,
        private _adminRepo: AdminRepository,
        private _syncService: DbSyncService
    ) { }

    async register(data: RegisterDTO) {
        const existing = await this._userRepo.findByEmail(data.email);
        if (existing) {
            throw new Error("Email already taken");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const userData = { ...data, password: hashedPassword };

        let user: IUserDocument;

        if (data.role === "ADMIN") {
            user = await this._adminRepo.create(userData);
            this._syncService
                .onAdminCreated(user as IUserDocument & { permissions?: string[] })
                .catch(console.error);
        } else {
            user = await this._studentRepo.create(userData);
            this._syncService
                .onStudentCreated(user as IStudentDocument)
                .catch(console.error);
        }

        const accessToken = generateToken({ id: user._id, role: user.role });
        const refreshToken = generateRefreshToken({ id: user._id, role: user.role });
        return { user, accessToken, refreshToken };
    }

    async login(data: LoginDTO, role: "ADMIN" | "STUDENT") {
        const user = await this._userRepo.findByEmail(data.email);
        if (!user) {
            throw new Error("Invalid credentials");
        }

        if (user.role !== role) {
            throw new Error("Unauthorized access for this role");
        }

        if (user.blocked) {
            throw new Error("User is blocked by admin");
        }

        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
            console.log("Password mismatch");
            throw new Error("Invalid credentials");
        }

        const accessToken = generateToken({ id: user._id, role: user.role });
        const refreshToken = generateRefreshToken({ id: user._id, role: user.role });
        return { user, accessToken, refreshToken };
    }

    async refreshToken(token: string) {
        try {
            const decoded = verifyRefreshToken(token);
            const user = await this._userRepo.findById(decoded.id);
            if (!user || user.blocked) {
                throw new Error("Invalid or blocked user");
            }
            const accessToken = generateToken({ id: user._id, role: user.role });
            return { accessToken };
        } catch (error) {
            throw new Error("Invalid refresh token");
        }
    }
}
