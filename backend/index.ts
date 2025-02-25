import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';
import ENV_VARS from './src/config.js';
import { connectDB } from './src/database/db.js';
import authRouter from './src/routes/auth.routes.js';
import categoryRouter from './src/routes/category.routes.js';
import productRouter from './src/routes/product.routes.js';
import userRouter from './src/routes/user.routes.js';
import { errorHandler } from './src/middlewares/errorHandler';

const app = express();

const PORT = ENV_VARS.PORT;

const corsOptions = {
  origin: `${ENV_VARS.FE_URL}`,
  credentials: true // This allows the server to accept cookies from the client
};
app.use(cors(corsOptions));
app.use(express.json()); // will allow us to parse req.body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1', categoryRouter);
app.use('/api/v1', productRouter);
app.use('/api/v1', userRouter);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  connectDB();
});
