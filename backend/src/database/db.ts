import mongoose from 'mongoose';
import ENV_VARS from '../config.js';

export const connectDB = async () => {
  try {
    if (!ENV_VARS.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    mongoose.set('strictQuery', false); // Thêm dòng này để tắt cảnh báo

    const conn = await mongoose.connect(ENV_VARS.MONGODB_URI);
    console.log(`Kết nối thành công: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error connecting to MongoDB: ${error.message}`);
    } else {
      console.error('Error connecting to MongoDB: Unknown error');
    }
    process.exit(1); // 1 means exist with failure, 0 means exist with success
  }
};
