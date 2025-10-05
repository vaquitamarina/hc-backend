import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { router } from './routes/index.js';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://vaquitamarina.github.io'],
    credentials: true,
  })
);

app.use(cookieParser());

app.disable('x-powered-by');
app.use(express.json());

app.use('/api', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
