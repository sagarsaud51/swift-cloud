import { Router } from 'express';
import { topSongs, topSongsByMonth, topSongsByYear } from '../controllers/analytics.controller';

export const AnalyticsRouter: Router = Router();

/**
 * @openapi
 * /api/v1/analytics/top-songs:
 *  get:
 *      tags: [Anaytics]
 *      summary: Gets top songs
 *      parameters:
 *          - in: query
 *            name: limit
 *            schema:
 *              type: number
 *            description: limit for fetch size default (10)
 *            required: false
 *            example: 10
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SongListResponse'
 *          500:
 *              description: Internal Server Error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '$components/schemas/ErrorResponse'
 */
AnalyticsRouter.use('/top-songs', topSongs);

/**
 * @openapi
 * /api/v1/analytics/year/{year}:
 *  get:
 *      tags: [Anaytics]
 *      summary: Gets songs by year
 *      parameters:
 *          - in: path
 *            name: year
 *            schema:
 *              type: string
 *            description: year (yyyy format)
 *            required: true
 *            example: 2017
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SongListResponse'
 *          500:
 *              description: Internal Server Error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '$components/schemas/ErrorResponse'
 */
AnalyticsRouter.use('/year/:year', topSongsByYear);

/**
 * @openapi
 * /api/v1/analytics/month/{month}:
 *  get:
 *      tags: [Anaytics]
 *      summary: Gets songs stats by month
 *      parameters:
 *          - in: path
 *            name: month
 *            schema:
 *              type: string
 *            description: month
 *            required: true
 *            example: june
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/MonthlySongList'
 *          500:
 *              description: Internal Server Error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '$components/schemas/ErrorResponse'
 */
AnalyticsRouter.use('/month/:month', topSongsByMonth);
