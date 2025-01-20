import { Router } from "express";
import { register, login } from "../controllers/authController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected route example (only accessible with a valid token)
router.get("/protected", protect, (req, res) => {
  res.status(200).json({ message: "This is a protected route" });
  
});

export default router;
