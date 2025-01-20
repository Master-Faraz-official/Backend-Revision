import { Response } from "express";
import { ZodError } from "zod";

// Utility for handling errors
export const handleError = (res: Response, error: any) => {
  if (error instanceof ZodError) {
    console.error("Validation Error:", error.errors);
    res.status(400).json({ message: "Validation error", errors: error.errors });
    return
  }

  if (error instanceof Error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
    return
  }

  else {
    console.error("Unknown Error:", error);
    res.status(500).json({ message: "Internal server error" });
    return
  }
};
