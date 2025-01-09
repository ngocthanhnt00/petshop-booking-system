import mongoose from "mongoose";
import ENV_VARS from "./config.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV_VARS.MONGODB_URI);
    console.log(`Kết nối thành công: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Kết nối thất bại: ${error.message}`);
    process.exit(1); // 1 means exist with failure, 0 means exist with success
  }
};
