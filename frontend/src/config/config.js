import dotenv from 'dotenv';
dotenv.config();

const ENV_VARS = {
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
};

export default ENV_VARS;
