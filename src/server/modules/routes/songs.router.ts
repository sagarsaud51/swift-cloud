import { Router } from 'express';
import { getSongById, getSongs } from '../controllers/song.controller';
import { idValidator } from '../middleware/id-validator.middleware';

const SongRouter: Router = Router();

/**
 * @openapi
 * /api/v1/songs:
 *  get:
 *      tag:
 *          - Songs-Collection
 *      summary: Gets all the songs
 *      responses:
 *          200:
 *              description: List of SWIFT songs
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SongResponse'
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
 *      tag:
 *          - Songs-Collection
 *      summary: Gets song by ID
 *      responses:
 *          200:
 *              description: List of SWIFT songs
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SongResponse'
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: UUID
 *            description: Song ID
 *            required: false
 *            example: 2cd0d371-79c8-4c84-abb3-6d3f58052662
 */
SongRouter.get('/song/:id', idValidator, getSongById);

export default SongRouter;
