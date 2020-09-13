import express, {Request, Response, NextFunction} from 'express';
const pool = require('../db');

const todoRouter = express.Router();

todoRouter.post('/',async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (e) {
        next(e);
    }
});

module.exports = todoRouter;