import express from 'express';
import businessRouter from '../routes/business.js';
import entertainmentRouter from '../routes/entertainment.js';
import generalRouter from '../routes/general.js';
import healthRouter from '../routes/health.js';
import scienceRouter from '../routes/science.js';
import sportsRouter from '../routes/sports.js';
import technologyRouter from '../routes/technology.js';
import { signIn, signUp } from '../routes/user.js';
import weatherRouter from '../routes/weather.js';
import stockRouter from '../routes/stock.js';
import newsListRouter from '../routes/newsList.js';
import followingRouter from '../routes/following.js';

const router = express.Router();

router.use('/',generalRouter);
router.use('/business',businessRouter);
router.use('/entertainment',entertainmentRouter);
router.use('/health',healthRouter);
router.use('/science',scienceRouter);
router.use('/sports',sportsRouter);
router.use('/technology',technologyRouter);
router.use('/signUp',signUp);
router.use('/signIn',signIn);
router.use('/weather',weatherRouter);
router.use('/stock',stockRouter);
router.use('/newsList',newsListRouter);
router.use('/following',followingRouter);



export default router;