import { Request, Response } from "express";
import { StudentService } from "../services/student.service";

export interface AuthenticatedRequest extends Request {
  user?: any; // To be populated by middleware
}

export class StudentController {
  constructor(private studentService: StudentService) { }

  getProfile = async (req: Request, res: Response) => {
    try {
      const userId = (req as AuthenticatedRequest).user?.id;
      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      const student = await this.studentService.getProfile(userId);
      res.json(student);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  updateProfile = async (req: Request, res: Response) => {
    try {
      const userId = (req as AuthenticatedRequest).user?.id;
      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      const student = await this.studentService.updateProfile(userId, req.body);
      res.json(student);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}