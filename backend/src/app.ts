import express from 'express';
import itemRoutes from './routes/itemRoutes';
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';
// import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// dotenv.config();



const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }))

// Routes
app.use('/api/items', itemRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;