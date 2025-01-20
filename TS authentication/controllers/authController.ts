import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../db/db";
import { generateToken } from "../utils/jwt";
import { userSchema } from "../utils/schemas/userSchema";
import { handleError } from "../utils/handleError";

// Register user
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        // Destructure email and password from req. Validates the input against the userSchema (Zod schema). 
        const { email, password } = userSchema.parse(req.body);

        // Check if the user already exists
        const existingUser = await prisma.user?.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        // Hash password and create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({ data: { email, password: hashedPassword } });

        if (!user) {
            res.status(500).json({ message: "Failed to create user" });
            return;
        }

        const token = generateToken(user?.id);

        res.status(201).json({
            message: "User registered successfully",
            user: { id: user?.id, email: user?.email },
            token,
        });
        return;
    } catch (error: unknown) {
        handleError(res, error);
    }
};

// Login user
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = userSchema.parse(req.body);

        const user = await prisma.user.findUnique({ where: { email } });

        // Check if user exists and password matches
        if (!user || !(await bcrypt.compare(password, user?.password))) {
            res.status(401).json({ message: "Invalid Credentials" });
            return;
        }

        const token = generateToken(user?.id!);

        res.status(200).json({
            message: "Login successful",
            user: { id: user?.id, email: user?.email },
            token,
        });
        return;
    } catch (error: unknown) {
        handleError(res, error);
    }
};
