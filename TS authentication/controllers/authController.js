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
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../db/db"));
const jwt_1 = require("../utils/jwt");
const userSchema_1 = require("../utils/schemas/userSchema");
const handleError_1 = require("../utils/handleError");
// Register user
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Destructure email and password from req. Validates the input against the userSchema (Zod schema). 
        const { email, password } = userSchema_1.userSchema.parse(req.body);
        // Check if the user already exists
        const existingUser = yield ((_a = db_1.default.user) === null || _a === void 0 ? void 0 : _a.findUnique({ where: { email } }));
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
        }
        // Hash password and create a new user
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield db_1.default.user.create({ data: { email, password: hashedPassword } });
        if (!user) {
            res.status(500).json({ message: "Failed to create user" });
        }
        const token = (0, jwt_1.generateToken)(user === null || user === void 0 ? void 0 : user.id);
        res.status(201).json({
            message: "User registered successfully",
            user: { id: user === null || user === void 0 ? void 0 : user.id, email: user === null || user === void 0 ? void 0 : user.email },
            token,
        });
    }
    catch (error) {
        (0, handleError_1.handleError)(res, error);
    }
});
exports.register = register;
// Login user
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = userSchema_1.userSchema.parse(req.body);
        const user = yield db_1.default.user.findUnique({ where: { email } });
        // Check if user exists and password matches
        if (!user || !(yield bcryptjs_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password))) {
            res.status(401).json({ message: "Invalid Credentials" });
        }
        const token = (0, jwt_1.generateToken)(user === null || user === void 0 ? void 0 : user.id);
        res.status(200).json({
            message: "Login successful",
            user: { id: user === null || user === void 0 ? void 0 : user.id, email: user === null || user === void 0 ? void 0 : user.email },
            token,
        });
    }
    catch (error) {
        (0, handleError_1.handleError)(res, error);
    }
});
exports.login = login;
