"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const zod_1 = require("zod");
// Utility for handling errors
const handleError = (res, error) => {
    if (error instanceof zod_1.ZodError) {
        console.error("Validation Error:", error.errors);
        res.status(400).json({ message: "Validation error", errors: error.errors });
        return;
    }
    if (error instanceof Error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: error.message });
        return;
    }
    else {
        console.error("Unknown Error:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};
exports.handleError = handleError;
