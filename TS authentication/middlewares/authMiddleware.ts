import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../db/db"; // Ensure this points to your Prisma client setup
import { handleError } from "../utils/handleError"; // Import the handleError function

// Extend the Request interface to include a user property
interface AuthRequest extends Request {
    user?: { id: string; email: string };
}

// Middleware to protect routes
export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        // Gracefully handle the missing token scenario
         res.status(401).json({ message: "Authorization token is required" });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as { id: string };

        // Retrieve the user from the database
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, email: true }, // Select only necessary fields
        });

        if (!user) {
            // Gracefully handle the case where the user does not exist
            res.status(404).json({ message: "User not found" });
        }

        // Attach user information to the request object
        req.user = { id: user?.id!, email: user?.email! };

        // Proceed to the next middleware or route handler
        next();
    } catch (err: any) {
        // Gracefully handle other errors (e.g., invalid token)
        if (err.name === "JsonWebTokenError") {
            res.status(401).json({ message: "Invalid token" });
        }

        if (err.name === "TokenExpiredError") {
            res.status(401).json({ message: "Token has expired" });
        }

        // Handle unexpected errors
        handleError(err, res);
    }
};
