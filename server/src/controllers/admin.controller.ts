import { Request, Response } from "express";
import { AdminService } from "../services/admin.service";

export class AdminController {
    constructor(private adminService: AdminService) { }
    
    getAllStudents = async (req: Request, res: Response) => {
        try {
            const students = await this.adminService.getAllStudents();
            res.json(students);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    blockStudent = async (req: Request, res: Response) => {
        try {
            const result = await this.adminService.blockStudent(req.params.id);
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    unblockStudent = async (req: Request, res: Response) => {
        try {
            const result = await this.adminService.unblockStudent(req.params.id);
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    updateStudent = async (req: Request, res: Response) => {
        try {
            const result = await this.adminService.updateStudent(req.params.id, req.body);
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
