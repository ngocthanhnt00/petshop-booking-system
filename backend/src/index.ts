import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';
import authRouter from '~/routes/auth.routes.js';
import ENV_VARS from './config.js';
import { connectDB } from './database/db.js';

const app = express();
const PORT = ENV_VARS.PORT;

const corsOptions = {
  origin: `${ENV_VARS.FE_URL}`,
  credentials: true // This allows the server to accept cookies from the client
};
app.use(cors(corsOptions));
app.use(express.json()); // will allow us to parse req.body
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/api/v1/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  connectDB();
});
