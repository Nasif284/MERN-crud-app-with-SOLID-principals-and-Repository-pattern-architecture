import jwt from "jsonwebtoken";

const SECRET_KEY = "abcd";

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, SECRET_KEY);
};
