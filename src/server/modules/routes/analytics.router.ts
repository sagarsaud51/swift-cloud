import { Router } from 'express';
import { topSongs, topSongsByMonth, topSongsByYear } from '../controllers/analytics.controller';

export const AnalyticsRouter: Router = Router();

AnalyticsRouter.use('/top-songs', topSongs);
AnalyticsRouter.use('/year/:year', topSongsByYear);
AnalyticsRouter.use('/month/:month', topSongsByMonth);
