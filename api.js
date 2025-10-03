import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { router } from './routes/index.js';
import authMiddleware from './middlewares/authMiddleware.js';

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://vaquitamarina.github.io',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('CORS no permitido para este origen'));
      }
    },
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
