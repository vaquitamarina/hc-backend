import express from 'express';

import { router } from './routes/index.js';

const app = express();

app.disable('x-powered-by');
app.use(express.json());

app.use('/api', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
