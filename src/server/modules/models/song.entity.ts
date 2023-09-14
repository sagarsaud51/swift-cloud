/**
 *  @openapi
 *components:
 *  schemas:
 *    SongResponse:
 *      type: object
 *      required:
 *        - title
 *        - description
 *        - price
 *        - image
 *      properties:
 *        title:
 *          type: string
 *          default: Canon EOS 1500D DSLR Camera with 18-55mm Lens
 *        description:
 *          type: string
 *          default: Designed for first-time DSLR owners who want impressive results
 *            straight out of the box, capture those magic moments no matter your
 *            level with the EOS 1500D. With easy to use automatic shooting modes,
 *            large 24.1 MP sensor, Canon Camera Connect app integration and
 *            built-in feature guide, EOS 1500D is always ready to go.
 *        price:
 *          type: number
 *          default: 879.99
 *        image:
 *          type: string
 *          default: https://i.imgur.com/QlRphfQ.jpg
 *    productResponse:
 *      type: object
 *      properties:
 *        user:
 *          type: string
 *        _id:
 *          type: string
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        price:
 *          type: number
 *        image:
 *          type: string
 *        productId:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *        __v:
 *          type: number
 *
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
