import { NextFunction, Request, Response } from 'express';
import { validate } from 'uuid';

export const idValidator = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).json({
            error: 'Id is required',
        });
        return;
    }
    if (!validate(id)) {
        res.status(400).json({
            error: 'Invalid Id',
        });
        return;
    }

    next();
};
