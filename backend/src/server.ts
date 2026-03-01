import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { db } from "./config/db";
import authRoutes from "./routes/auth.routes";
import { protect } from "./middlewares/auth.middleware";
// Load environment variables FIRST


const app = express();
const PORT = process.env.BACKEND_PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is undefined — check your .env file");
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.get("/api/profile", protect, (req: any, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});

// Database Connection
db();

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});