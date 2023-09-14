/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { songService } from '../services';
import { createSearchCriteria } from '../util/search.util';
import { NOT_FOUND_ERROR_MESSAGE } from '../../../const/error';
import { errorResponder } from '../util/response.util';
import { SongEntity } from '../models/song.entity';

export const getSongs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: SongEntity[] = await songService.select(['*'], createSearchCriteria(req.query), req.context);
        res.send(data);
    } catch (error) {
        req.context.logger.error(error, 'gotSongsError');
        errorResponder(res);
    }
};

export const getSongById = async (req: Request, res: Response) => {
    try {
        const data: SongEntity[] = await songService.select(['*'], { search: { id: req.params.id } }, req.context);
        if (!data || data.length == 0) {
            return res.status(404).json({
                message: NOT_FOUND_ERROR_MESSAGE,
                error: 'Not Found',
            });
        }
        res.send(data[0]);
    } catch (error) {
        req.context.logger.error(error, 'getSongById');
        errorResponder(res);
    }
};
