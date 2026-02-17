import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository";
import { StudentRepository } from "../repositories/student.repository";
import { AdminRepository } from "../repositories/admin.repository";
import { LoginDTO, RegisterDTO } from "../dtos/auth.dto";
import { generateToken } from "../utils/token.utils";

export class AuthService {
    constructor(
        private userRepo: UserRepository,
        private studentRepo: StudentRepository,
        private adminRepo: AdminRepository
    ) { }

    async register(data: RegisterDTO) {
        const existing = await this.userRepo.findByEmail(data.email);
        if (existing) {
            throw new Error("Email already taken");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const userData = { ...data, password: hashedPassword };

        let user;
        if (data.role === "ADMIN") {
            user = await this.adminRepo.create(userData);
        } else {
            user = await this.studentRepo.create(userData);
        }

        const token = generateToken({ id: user._id, role: user.role });
        return { user, token };
    }

    async login(data: LoginDTO, role: "ADMIN" | "STUDENT") {
        const user = await this.userRepo.findByEmail(data.email);
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
            console.log('Password mismatch');
            throw new Error("Invalid credentials");
        }

        const token = generateToken({ id: user._id, role: user.role });
        return { user, token };
    }
}
