import { NextFunction, Request, Response } from 'express';
import { validate } from 'uuid';
import { BAD_REQUEST_ERROR_MESSAGE } from '../../../const/error';

export const idValidator = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).json({
            error: 'Id is required',
            message: BAD_REQUEST_ERROR_MESSAGE,
        });
        return;
    }
    if (!validate(id)) {
        res.status(400).json({
            error: 'Invalid Id',
            message: BAD_REQUEST_ERROR_MESSAGE,
        });
        return;
    }

    next();
};
