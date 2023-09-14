import { Router } from 'express';
import { getSongById, getSongs } from '../controllers/song.controller';
import { idValidator } from '../middleware/id-validator.middleware';

const SongRouter: Router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Eror Message
 *         message:
 *           type: string
 *           description: Error Extra message
 *       example:
 *          error: Something went wrong
 *          message: Internal Server Error
 */

/**
 * @swagger
 * tags:
 *   name: Songs
 *   description: SWFITY MELLO
 */

/**
 * @swagger
 *  /api/v1/songs:
 *  get:
 *      tags: [Songs]
 *      summary: Gets all song with filter
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/SongResponse'
 *          500:
 *              description: Internal Server Error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '$components/schemas/ErrorResponse'
 *      parameters:
 *          - in: query
 *            name: id
 *            schema:
 *              type: UUID
 *            description: Song ID
 *            required: false
 *            example: 2cd0d371-79c8-4c84-abb3-6d3f58052662
 *          - in: query
 *            name: song
 *            schema:
 *              type: string
 *            description: Song name
 *            required: false
 *            example: Dancing with Our Hands Tied
 *          - in: query
 *            name: artist
 *            schema:
 *              type: string
 *            description: artist name
 *            required: false
 *            example: Taylor Swift
 *          - in: query
 *            name: writer
 *            schema:
 *              type: string
 *            description: writer name
 *            required: false
 *            example: Taylor Swift
 *          - in: query
 *            name: album
 *            schema:
 *              type: string
 *            description: album name
 *            required: false
 *            example: Reputation
 *          - in: query
 *            name: year
 *            schema:
 *              type: string
 *            description: year
 *            required: false
 *            example: 2017
 */
SongRouter.get('/', getSongs);

/**
 * @openapi
 * /api/v1/songs/song/{id}:
 *  get:
 *      tags: [Songs]
 *      summary: Gets song by ID
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            description: Song ID
 *            required: true
 *            example: 2cd0d371-79c8-4c84-abb3-6d3f58052662
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SongResponse'
 *          500:
 *              description: Internal Server Error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '$components/schemas/ErrorResponse'
 */
SongRouter.get('/song/:id', idValidator, getSongById);

export default SongRouter;
