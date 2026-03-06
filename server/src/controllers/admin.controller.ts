import { Request, Response } from "express";
import { AdminService } from "../services/admin.service";
import { HttpStatus } from "../utils/statusCodes";

export class AdminController {
    constructor(private _adminService: AdminService) { }

    getAllStudents = async (req: Request, res: Response) => {
        try {
            const students = await this._adminService.getAllStudents();
            res.status(HttpStatus.OK).json(students);
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    blockStudent = async (req: Request, res: Response) => {
        try {
            const result = await this._adminService.blockStudent(req.params.id as string);
            res.status(HttpStatus.OK).json(result);
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    unblockStudent = async (req: Request, res: Response) => {
        try {
            const result = await this._adminService.unblockStudent(req.params.id as string);
            res.status(HttpStatus.OK).json(result);
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    updateStudent = async (req: Request, res: Response) => {
        try {
            const result = await this._adminService.updateStudent(req.params.id as string, req.body);
            res.status(HttpStatus.OK).json(result);
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }
}
