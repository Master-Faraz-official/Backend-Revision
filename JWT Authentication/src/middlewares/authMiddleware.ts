import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/keys.js";

export interface AuthenticatedRequest extends Request {
    user?: any;
}

export const authenticateToken = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Access denied" });
        return;
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            res.status(403).json({ message: "Invalid token" });
            return;
        }
        req.user = user;
        next();
    });
};
