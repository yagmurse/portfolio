import express from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import { nanoid } from "nanoid";
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import mongoose from "mongoose";
import "express-async-errors";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import cloudinary from "cloudinary";
import cookieParser from "cookie-parser";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();
app.use(cookieParser());

app.use(express.json());

app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/auth", authRouter);

app.use(errorHandlerMiddleware);

const __dirname = dirname(fileURLToPath(import.meta.url));

// Serve static files from the 'public/dist' directory
app.use(express.static(path.resolve(__dirname, "./public/dist")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Serve the main index.html file for any other routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/dist/index.html"));
});

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.error("Database connection error:", error);
  process.exit(1);
}
