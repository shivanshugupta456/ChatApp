import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";

dotenv.config();

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:3001")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

const PORT = process.env.PORT || 4001;
const URI = process.env.MONGODB_URI;

app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

const startServer = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB");
    server.listen(PORT, () => {
      console.log(`Server is Running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error starting server", error);
    process.exit(1);
  }
};

startServer();
