import { SongSearchCriteria } from '../models/songs.type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createSearchCriteria = (query: Record<string, any>): SongSearchCriteria => {
    return {
        search: {
            id: query.id || undefined,
            song: query.song || undefined,
            artist: query.artist || undefined,
            writer: query.writer || undefined,
            album: query.album || undefined,
            year: query.year || undefined,
        },
        sort: query.sort
            ? {
                  column: query.sort || undefined,
                  order: query.order || undefined,
              }
            : undefined,
    };
};
