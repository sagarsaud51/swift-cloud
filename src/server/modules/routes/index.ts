import { Router } from 'express';
import SongRouter from './songs.router';
import { AnalyticsRouter } from './analytics.router';

export const router: Router = Router();

router.use('/songs', SongRouter);

router.use('/analytics', AnalyticsRouter);
