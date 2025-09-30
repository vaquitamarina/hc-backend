import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { router } from './routes/index.js';
import authMiddleware from './middlewares/authMiddleware.js';

const app = express();
app.use(cors());
app.use(cookieParser());

app.disable('x-powered-by');
app.use(express.json());

app.use('/api', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
