export interface SongLists {
    id: string;
    song: string;
    total: number;
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
