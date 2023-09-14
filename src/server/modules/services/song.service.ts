import { VIEW_NAME } from '../../../const';
import { ServerContext } from '../../context';
import { SongEntity } from '../models/song.entity';
import { SongLists, SongSearchCriteria } from '../models/songs.type';
import { conditionGenerator } from '../util/query.util';

export const select = async (
    fields: string[],
    conditions: SongSearchCriteria,
    ctx: ServerContext,
): Promise<SongEntity[]> => {
    const { sort, where, limit } = conditionGenerator(conditions);

    const query = `SELECT ${fields.join(',')} FROM ${VIEW_NAME} ${where} ${sort} ${limit}`;
    ctx.logger.info({ query }, 'Running query');
    const result = await ctx.db.query({ query, format: 'JSONEachRow' });
    const data: SongEntity[] = await result.json();

    return data;
};

export const getSongsByYear = async (year: string, ctx: ServerContext): Promise<SongLists[]> => {
    const rows = await ctx.db.query({
        query: `select id, song, total, year, album from song_view sv where year = '${year}' order by total desc`,
        format: 'JSONEachRow',
    });
    const data: SongLists[] = await rows.json();
    return data;
};

export const getSongsByMonth = async (month: string, ctx: ServerContext, limit = 10): Promise<SongLists[]> => {
    const rows = await ctx.db.query({
        query: `select id, song, total, year, album, ${month} as monthCount from song_view sv order by ${month} desc limit ${limit}`,
        format: 'JSONEachRow',
    });
    const data: SongLists[] = await rows.json();
    return data;
};

export const checkIfMonthExists = async (columnName: string, ctx: ServerContext) => {
    const rows = await ctx.db.query({
        query: `
            SELECT
                column_name
            FROM
                information_schema.columns
            WHERE
                table_name = '${VIEW_NAME}'
                AND column_name = '${columnName}';
        `,
        format: 'JSONEachRow',
    });
    const data: unknown[] = await rows.json();
    return data;
};
