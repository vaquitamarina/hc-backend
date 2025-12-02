import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

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

// Swagger/OpenAPI configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Historia Clínica',
      version: '1.0.0',
      description: 'Documentación de la API interna',
    },
  },
  apis: [
    './docs/swagger-endpoints.js',
    './docs/antecedente.js',
    './docs/examenes.js',
    './docs/examenesEndpoints.js',
    './docs/seccionesEndpoints.js',
    './docs/estudiantesEndpoints.js',
    './docs/borradorEndpoints.js',
    './docs/catalogoEndpoints.js',
    './routes/*.js',
  ], // Incluye los archivos de documentación aparte
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
