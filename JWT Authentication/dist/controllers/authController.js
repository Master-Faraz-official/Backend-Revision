import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { users } from "../models/userModel.js";
import { SECRET_KEY } from "../config/keys.js";
// Login and generate JWT
export const login = (req, res) => {
    const { username, password } = req.body;
    // Find user by username
    const user = users.find((u) => u.username === username);
    if (!user) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
    }
    // Validate password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
    }
    // Generate JWT
    const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, {
        expiresIn: "1h",
    });
    res.json({ token });
};
