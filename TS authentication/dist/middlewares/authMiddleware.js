"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../db/db")); // Ensure this points to your Prisma client setup
const handleError_1 = require("../utils/handleError"); // Import the handleError function
// Middleware to protect routes
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Extract the token from the Authorization header
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        // Gracefully handle the missing token scenario
        res.status(401).json({ message: "Authorization token is required" });
    }
    try {
        // Verify the token using the secret key
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Retrieve the user from the database
        const user = yield db_1.default.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, email: true }, // Select only necessary fields
        });
        if (!user) {
            // Gracefully handle the case where the user does not exist
            res.status(404).json({ message: "User not found" });
        }
        // Attach user information to the request object
        req.user = { id: user === null || user === void 0 ? void 0 : user.id, email: user === null || user === void 0 ? void 0 : user.email };
        // Proceed to the next middleware or route handler
        next();
    }
    catch (err) {
        // Gracefully handle other errors (e.g., invalid token)
        if (err.name === "JsonWebTokenError") {
            res.status(401).json({ message: "Invalid token" });
        }
        if (err.name === "TokenExpiredError") {
            res.status(401).json({ message: "Token has expired" });
        }
        // Handle unexpected errors
        (0, handleError_1.handleError)(err, res);
    }
});
exports.protect = protect;
