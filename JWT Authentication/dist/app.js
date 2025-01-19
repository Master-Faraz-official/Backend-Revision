import express from "express";
import dotenv from "dotenv";
// import authRoutes from "./routes/authRoutes.ts";
import protectedRoutes from "./routes/protectedRoutes.ts";
import authRoutes from "./routes/authRoutes.ts";
dotenv.config();
const app = express();
app.use(express.json());
// Routes
app.use("/auth", authRoutes);
app.use("/api", protectedRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
