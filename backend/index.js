import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import blogRoutes from './routes/blogRoutes.js'

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({ 
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

// Serve uploaded images 
app.use("/uploads", express.static("uploads"));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/comment", commentRoutes);
app.use("/blogs", blogRoutes);

// Connect to MongoDB on startup
mongoose
  .connect("mongodb://localhost:27017/miniblog")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(3000, () => {console.log(`Server started at PORT: 3000`)})

export default app;
