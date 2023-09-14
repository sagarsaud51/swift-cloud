import { Response } from 'express';
import { INTERNAL_SERVER_ERROR_MESSAGE } from '../../../const/error';

export const errorResponder = async (res: Response) => {
    res.sendStatus(500).send({
        message: INTERNAL_SERVER_ERROR_MESSAGE,
        error: 'Internal Server Error',
    });
};
