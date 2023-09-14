/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { songService } from '../services';

export const topSongs = async (req: Request, res: Response, next: NextFunction) => {
    const limit = req.query.limit;
    const data = await songService.select(
        ['id', 'song', 'total', 'year', 'album'],
        { limit: limit ? parseInt(limit as string) : 10, sort: { column: 'total', order: 'DESC' } },
        req.context,
    );

    res.send(data);
};

export const topSongsByYear = async (req: Request, res: Response, next: NextFunction) => {
    const year = req.params.year;

    const data = await songService.getSongsByYear(year, req.context);
    res.send(data);
};

export const topSongsByMonth = async (req: Request, res: Response, next: NextFunction) => {
    const month = req.params.month;
    const monthExists = await songService.checkIfMonthExists(month, req.context);
    if (monthExists.length == 0) {
        res.status(400).send({ error: 'No data found' });
        return;
    }
    const data = await songService.getSongsByMonth(month, req.context);
    res.send(data);
};
