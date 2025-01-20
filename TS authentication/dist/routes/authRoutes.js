"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Public routes
router.post("/register", authController_1.register);
router.post("/login", authController_1.login);
// Protected route example (only accessible with a valid token)
router.get("/protected", authMiddleware_1.protect, (req, res) => {
    res.status(200).json({ message: "This is a protected route" });
});
exports.default = router;
