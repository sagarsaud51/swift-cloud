/**
 * @swagger
 * description: API to manage your books.
 * components:
 *   schemas:
 *     SongListResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Auto generated id for song
 *         song:
 *           type: string
 *           description: title of the songs
 *         album:
 *           type: string
 *           description: Name of the album
 *         year:
 *           type: string
 *           description: Year the song/album was released
 *         total:
 *           type: number
 *           description: total count of plays till date
 *       example:
 *         id: 2f12bacf-3aec-4dfc-8071-58aa50835a63
 *         song: Santa Baby (cover)
 *         album: Sounds of the Season
 *         year: 2007
 *         total: 162
 */
export interface SongLists {
    id: string;
    song: string;
    year: string;
    album: string;
    total: number;
}

/**
 * @swagger
 * description: API to manage your books.
 * components:
 *   schemas:
 *     MonthlySongList:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Auto generated id for song
 *         song:
 *           type: string
 *           description: title of the songs
 *         album:
 *           type: string
 *           description: Name of the album
 *         year:
 *           type: string
 *           description: Year the song/album was released
 *         total:
 *           type: number
 *           description: total count of plays till date
 *         monthCount:
 *           type: number
 *           description: monthCount count for requested month
 *       example:
 *         id: 2f12bacf-3aec-4dfc-8071-58aa50835a63
 *         song: Santa Baby (cover)
 *         album: Sounds of the Season
 *         year: 2007
 *         monthCount: 50
 *         total: 162
 */

export interface MonthlySongList extends SongLists {
    monthCount: number;
}

export interface SongSearchCriteria {
    search?: Song;
    sort?: Sort;
    limit?: number;
}

export interface Sort {
    column: string;
    order?: 'ASC' | 'DESC';
}

export interface Song {
    id?: string;
    song?: string;
    artist?: string;
    writer?: string;
    album?: string;
    year?: string;
}
