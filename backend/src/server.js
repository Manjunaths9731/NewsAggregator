import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import logger from './utils/logger.js';
import connectDB from './config/db.js';
import startCronJob from './cron.js';
import routes from './controllers/routes.js';
config();

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

connectDB();

app.use('/news', routes);
startCronJob();

app.listen(port, () => {
    logger.info(`Server running on port ${port}!`);
});