import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { HttpStatus } from "../utils/statusCodes";

export class AuthController {
    constructor(private _authService: AuthService) { }

    registerStudent = async (req: Request, res: Response) => {
        try {
            const data = { ...req.body, role: "STUDENT" };
            const result = await this._authService.register(data);
            res.status(HttpStatus.CREATED).json(result);
        } catch (error: any) {
            res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
        }
    }

    loginStudent = async (req: Request, res: Response) => {
        try {
            const result = await this._authService.login(req.body, "STUDENT");
            res.status(HttpStatus.OK).json(result);
        } catch (error: any) {
            res.status(HttpStatus.UNAUTHORIZED).json({ error: error.message });
        }
    }

    registerAdmin = async (req: Request, res: Response) => {
        try {
            const data = { ...req.body, role: "ADMIN" };
            const result = await this._authService.register(data);
            res.status(HttpStatus.CREATED).json(result);
        } catch (error: any) {
            res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
        }
    }

    loginAdmin = async (req: Request, res: Response) => {
        try {
            const result = await this._authService.login(req.body, "ADMIN");
            res.status(HttpStatus.OK).json(result);
        } catch (error: any) {
            res.status(HttpStatus.UNAUTHORIZED).json({ error: error.message });
        }
    }

    refreshToken = async (req: Request, res: Response) => {
        try {
            const { refreshToken } = req.body;
            const result = await this._authService.refreshToken(refreshToken);
            res.status(HttpStatus.OK).json(result);
        } catch (error: any) {
            res.status(HttpStatus.UNAUTHORIZED).json({ error: error.message });
        }
    }
}
