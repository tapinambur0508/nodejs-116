import * as fs from 'node:fs';
import path from 'node:path';

import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';

import routes from './routes/index.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const SWAGGER_DOCUMENT = JSON.parse(
  fs.readFileSync(path.join('docs', 'swagger.json')),
);

const app = express();

app.use(cors());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(SWAGGER_DOCUMENT));

app.use(express.json());
app.use(cookieParser());

app.use('/avatars', express.static(path.resolve('src', 'uploads', 'avatars')));

app.use(routes);

// Handle 404 Error
app.use(notFoundHandler);

// Handle Internal Error
app.use(errorHandler);

export default app;
