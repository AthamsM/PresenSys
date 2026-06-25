import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

app.use(cors()); 

app.use(express.json());

app.use('/api', routes);

// Tratamento global de erros
app.use(errorHandler);

export default app;