import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_SECRET = process.env.JWT_SECRET || "access_secret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret";

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (payload: object): string => {
    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, ACCESS_SECRET);
};

export const verifyRefreshToken = (token: string): any => {
    return jwt.verify(token, REFRESH_SECRET);
};
