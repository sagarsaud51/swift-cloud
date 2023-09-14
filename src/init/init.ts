import * as fs from 'fs';
import csvParser from 'csv-parser';
import { ClickHouseClient, createClient } from '@clickhouse/client';
import { SongCSV } from './song.interface';
import { SongEntity } from '../server/modules/models/song.entity';
import { v4 as uuidv4 } from 'uuid';
import pino from 'pino';

const object: SongCSV[] = [];

const delimiter = '|||';
const CSV_FILE_PATH = 'SwiftCloud.csv';

const logger = pino({ level: 'info' });

const readCsv = async () => {
    return new Promise((resolve, reject) => {
        logger.info(`Loading CSV file from ${CSV_FILE_PATH}`, 'readCsv');
        fs.createReadStream(CSV_FILE_PATH)
            .pipe(csvParser({ separator: ',' }))
            .on('data', (row: SongCSV) => {
                // console.log(row);
                object.push(row);
            })
            .on('end', () => {
                // console.log(object);
                logger.info(`Found ${object.length} songs`, 'readCsv');
                resolve(true);
            })
            .on('error', () => {
                reject('Error');
            });
    });
};

const parseArtists = (artist: string): string[] => {
    const stringWithoutFeaturingAnd = artist.replace(/featuring/gi, delimiter).replace(/and/gi, delimiter);
    // Split the modified string using the delimiter
    const resultArray = stringWithoutFeaturingAnd.split(delimiter).filter(Boolean);

    return resultArray.map((result) => result.trim());
};
const parseCSVTToInput = (data: SongCSV): SongEntity => {
    const { album, artist, august, july, june, song, writer, year } = data;
    return {
        id: uuidv4(),
        album,
        august,
        july,
        june,
        song,
        year,
        writer: writer.split('\n'),
        artist: parseArtists(artist),
    };
};

const initDb = async (dbClient: ClickHouseClient) => {
    logger.info('Creating DB');
    await Promise.all([
        dbClient.command({ query: `DROP TABLE IF EXISTS default.swift_cloud` }),
        dbClient.command({ query: `DROP VIEW IF EXISTS default.song_view` }),
    ]);
    await dbClient.command({
        query: `
            CREATE TABLE IF NOT EXISTS default.swift_cloud (
                id UUID DEFAULT generateUUIDv4(),
                song VARCHAR(100),
                artist Array(String),
                writer Array(String),
                album VARCHAR(100),
                year VARCHAR(100),
                june Int32 DEFAULT 0,
                july Int32 DEFAULT 0,
                august Int32 DEFAULT 0
            ) ENGINE = MergeTree
            ORDER BY (id, song, artist, writer, album)
        `,
    });

    await dbClient.command({
        query: `
        CREATE VIEW IF NOT EXISTS 
            song_view
        AS
            SELECT
                sc.id,
                sc.song,
                sc.artist,
                sc.writer ,
                sc.album ,
                sc.year,
                sc.june ,
                sc.july ,
                sc.august ,
                sc.june + sc.july + sc.august AS total
            FROM
                swift_cloud sc
            ORDER BY (id, song, artist, writer, album);
        `,
    });

    const values = object.map((obj) => parseCSVTToInput(obj));
    await dbClient.insert({
        table: 'swift_cloud',
        values,
        format: 'JSONEachRow',
    });

    logger.info('DB Init Success full ');
};

const init = async () => {
    try {
        await readCsv();
        const dbClinet = createClient({});
        await initDb(dbClinet);
    } catch (error: unknown) {
        logger.error('Ooops! Something went wrong!!', error);
    }
    logger.info('Terminating SWIFT CLOUD INIT!!!');
    process.exit(0);
};

init();
