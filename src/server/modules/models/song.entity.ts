/**
 * @swagger
 * description: API to manage your books.
 * components:
 *   schemas:
 *     SongResponse:
 *       type: object
 *       required:
 *          - id
 *       properties:
 *         id:
 *           type: string
 *           description: Auto generated id for song
 *         song:
 *           type: string
 *           description: title of the songs
 *         artist:
 *           type: array
 *           items:
 *              type: string
 *           description: List of artists on the song
 *         writer:
 *           type: array
 *           items:
 *              type: string
 *           description: List of writer on the song
 *         album:
 *           type: string
 *           description: Name of the album
 *         year:
 *           type: string
 *           description: Year the song/album was released
 *         june:
 *           type: number
 *           description: total count of plays on June month
 *         july:
 *           type: number
 *           description: total count of plays on july month
 *         august:
 *           type: number
 *           description: total count of plays on august month
 *         total:
 *           type: number
 *           description: total count of plays till date
 *       example:
 *         id: 2f12bacf-3aec-4dfc-8071-58aa50835a63
 *         song: Santa Baby (cover)
 *         artist: [Taylor Swift]
 *         writer: [Taylor Swift]
 *         album: Sounds of the Season
 *         year: 2007
 *         june: 110
 *         july: 52
 *         august: 0
 *         total: 162
 */

export interface SongEntity {
    id: string;
    song: string;
    artist: string[];
    writer: string[];
    album: string;
    year: string;
    june: number;
    july: number;
    august: number;
    total?: number;
}

export type SongKeys = keyof SongEntity;
