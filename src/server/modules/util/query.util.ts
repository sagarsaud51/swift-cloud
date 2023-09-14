import { SongSearchCriteria } from '../models/songs.type';

const ARRAY_COLS = ['artist', 'writer'];
const SORT_COLUMNS = ['id', 'song', 'artist', 'writer', 'album', 'year', 'total'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getPropertyKeysWithoutUndefined(obj: any): string[] {
    return Object.keys(obj).filter((key) => obj[key] !== undefined);
}

export const conditionGenerator = (conditions: SongSearchCriteria) => {
    let whereClause: string = '';
    let sortClause: string = '';
    let limit: string = '';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const search: any = conditions.search;
    const conditionKeys = getPropertyKeysWithoutUndefined(search);
    if (conditionKeys && Object.keys(conditionKeys).length > 0) {
        whereClause =
            'where ' +
            conditionKeys
                .map((key) => {
                    if (ARRAY_COLS.includes(key)) {
                        return `arrayExists(x-> x == '${search[key]}', ${key})`;
                    }
                    if (typeof search[key] === 'string') {
                        return `${key} = ` + `'${search[key]}'`;
                    }
                    return `${key} = ` + search[key];
                })
                .join(' AND ');
    }

    if (conditions.sort && SORT_COLUMNS.includes(conditions.sort.column)) {
        sortClause = ` Order by ${conditions.sort.column} ${conditions.sort.order || 'ASC'}`;
    }
    if (conditions.limit) {
        limit = ` limit ${conditions.limit}`;
    }

    return {
        where: whereClause,
        sort: sortClause,
        limit,
    };
};
