import express from 'express';

import studentRoutes from './routes/students.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const app = express();

app.use('/students', studentRoutes);

// Handle 404 Error
app.use(notFoundHandler);

// Handle Internal Error
app.use(errorHandler);

export default app;
