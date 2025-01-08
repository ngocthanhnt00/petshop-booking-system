import express from "express";
import cookieParser from "cookie-parser";

import { protectRoute } from "./middleware/protectRoute.js";
import dotenv from "dotenv";

import ENV_VARS from "./config.js";
const app = express();

const PORT = ENV_VARS.PORT;

import authRouter from "./routes/auth.route.js";
import indexRouter from "./routes/index.route.js";
import { connectDB } from "./db.js";
dotenv.config();

app.use(express.json());
app.use(cookieParser());
console.log("MONGO_URI", process.env.MONGODB_URI);
app.use("/api/v1/auth", authRouter);
app.use("/", indexRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  connectDB();
});
