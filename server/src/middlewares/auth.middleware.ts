import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token.utils";

export interface AuthenticatedRequest extends Request {
    user?: any;
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        res.status(401).json({ error: "Access denied. No token provided." });
        return;
    }

    try {
        const decoded = verifyToken(token);
        (req as AuthenticatedRequest).user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({ error: "Invalid token." });
    }
};

export const authorize = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const user = (req as AuthenticatedRequest).user;
        if (!user || !roles.includes(user.role)) {
            res.status(403).json({ error: "Access denied." });
            return;
        }
        next();
    };
};
