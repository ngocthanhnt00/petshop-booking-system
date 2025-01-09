import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";
import { protectRoute } from "./middleware/protectRoute.js";

import ENV_VARS from "./config.js";
const app = express();

const PORT = ENV_VARS.PORT;

import authRouter from "./routes/auth.route.js";
import indexRouter from "./routes/index.route.js";
import { connectDB } from "./db.js";
const corsOptions = {
  origin: `${ENV_VARS.API_URL}`,
  credentials: true, // This allows the server to accept cookies from the client
};
app.use(cors(corsOptions));
console.log(ENV_VARS.API_URL);
app.use(express.json());
app.use(cookieParser());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
console.log("MONGO_URI", process.env.MONGODB_URI);
app.use("/api/v1/auth", authRouter);
app.use("/", indexRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  connectDB();
});
