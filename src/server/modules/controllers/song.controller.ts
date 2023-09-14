/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { songService } from '../services';
import { createSearchCriteria } from '../util/search.util';

export const getSongs = async (req: Request, res: Response, next: NextFunction) => {
    const data = await songService.select(['*'], createSearchCriteria(req.query), req.context);
    res.send(data);
};

export const getSongById = async (req: Request, res: Response) => {
    const data = await songService.select(['*'], { search: { id: req.params.id } }, req.context);
    if (!data || data.length == 0) {
        return res.status(404).json({
            error: 'Song not found',
        });
    }
    res.send(data[0]);
};
