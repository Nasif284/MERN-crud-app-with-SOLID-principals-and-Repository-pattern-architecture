import { Request, Response } from "express";
import { StudentService } from "../services/student.service";
import { HttpStatus } from "../utils/statusCodes";

export interface AuthenticatedRequest extends Request {
  user?: any; // To be populated by middleware
}

export class StudentController {
  constructor(private _studentService: StudentService) { }

  getProfile = async (req: Request, res: Response) => {
    try {
      const userId = (req as AuthenticatedRequest).user?.id;
      if (!userId) {
        res.status(HttpStatus.UNAUTHORIZED).json({ error: "Unauthorized" });
        return;
      }
      const student = await this._studentService.getProfile(userId);
      res.status(HttpStatus.OK).json(student);
    } catch (error: any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }

  updateProfile = async (req: Request, res: Response) => {
    try {
      const userId = (req as AuthenticatedRequest).user?.id;
      if (!userId) {
        res.status(HttpStatus.UNAUTHORIZED).json({ error: "Unauthorized" });
        return;
      }
      const student = await this._studentService.updateProfile(userId, req.body);
      res.status(HttpStatus.OK).json(student);
    } catch (error: any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }
}