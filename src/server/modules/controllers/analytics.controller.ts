/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { songService } from '../services';
import { NOT_FOUND_ERROR_MESSAGE } from '../../../const/error';
import { errorResponder } from '../util/response.util';

export const topSongs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const limit = req.query.limit;
        const data = await songService.select(
            ['id', 'song', 'total', 'year', 'album'],
            { limit: limit ? parseInt(limit as string) : 10, sort: { column: 'total', order: 'DESC' } },
            req.context,
        );

        res.send(data);
    } catch (error) {
        req.context.logger.error(error, 'topSongs');
        errorResponder(res);
    }
};

export const topSongsByYear = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const year = req.params.year;
        const data = await songService.getSongsByYear(year, req.context);
        res.send(data);
    } catch (error) {
        req.context.logger.error(error, 'topSongsByYear');
        errorResponder(res);
    }
};

export const topSongsByMonth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const month = req.params.month;
        const monthExists = await songService.checkIfMonthExists(month, req.context);
        if (monthExists.length == 0) {
            res.status(400).send({ error: 'No data found', message: NOT_FOUND_ERROR_MESSAGE });
            return;
        }
        const data = await songService.getSongsByMonth(month, req.context);
        res.send(data);
    } catch (error) {
        req.context.logger.error(error, 'topSongsByMonth');
        errorResponder(res);
    }
};
