import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
    constructor(private authService: AuthService) { }

    registerStudent = async (req: Request, res: Response) => {
        try {
            const data = { ...req.body, role: "STUDENT" };
            const result = await this.authService.register(data);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    loginStudent = async (req: Request, res: Response) => {
        try {
            const result = await this.authService.login(req.body, "STUDENT");
            res.json(result);
        } catch (error: any) {
            res.status(401).json({ error: error.message });
        }
    }

    registerAdmin = async (req: Request, res: Response) => {
        try {
            const data = { ...req.body, role: "ADMIN" };
            const result = await this.authService.register(data);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    loginAdmin = async (req: Request, res: Response) => {
        try {
            const result = await this.authService.login(req.body, "ADMIN");
            res.json(result);
        } catch (error: any) {
            res.status(401).json({ error: error.message });
        }
    }
}
