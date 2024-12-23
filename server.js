import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./src/config/database.js";
import { errorHandler } from "./src/middleware/errorMiddleware.js";

// import routes
import userRoutes from "./src/routes/userRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json()); // Middleware to parse JSON
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Error handler middleware
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
