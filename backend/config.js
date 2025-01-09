import dotenv from "dotenv";
dotenv.config();

const ENV_VARS = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  API_URL: process.env.API_URL,
};

export default ENV_VARS;
