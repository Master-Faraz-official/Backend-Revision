import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
const router = Router();
router.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: `Hello, ${req.user?.username}! Welcome to the protected route.` });
});
export default router;
