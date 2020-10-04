import express, {Request, Response, NextFunction} from 'express';
import {QueryResult} from "pg";
import {pool} from '../db';
import config from 'config';
import jwt from 'jsonwebtoken';

const middleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    console.log('Middleware is fired')

    try {
        const token: Array<string> = req.headers.authorization!.split(' '); // "Bearer TOKEN"
        console.log(token[1]);
        console.log(config.get('jwtSecret'))

        if (!token[1]) {
            return res.status(401).json({ message: 'No authorization' });
        }

        const decoded = jwt.verify(token[1], config.get('jwtSecret'));
        console.log('f',decoded)
        if(!decoded) {
            return res.status(401).json({ message: 'No authorization' });
        }
        next();
    } catch (err) {
        res.status(401).json({message: 'No authorization'});
    }
}

const todoRouter = express.Router();

todoRouter.get('/:userId', middleware, async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const userId: number = parseInt(req.params.userId);
        const newTodo: QueryResult = await pool.query(`SELECT * FROM todo WHERE user_id = $1;`, [userId]);
        console.log(newTodo.rows);
        return res.status(200).json({newTodo});
    } catch (e) {
        next(e);
        return res.status(500);
    }
});

todoRouter.post('/',middleware, async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const {description, userId}= req.body;
        if(description && userId) {
            await pool.query('INSERT INTO todo (description, complete, user_id) VALUES ($1, $2, $3)', [description, false, userId]);
            return res.status(200).json({
                todo: {
                    user_id: userId,
                    description
                }
            });
        } else {
            throw new Error('No description was provided');
        }
    } catch (e) {
        next(e);
        return res.status(500);
    }
});

todoRouter.put('/:id', middleware, async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const id: number = parseInt(req.params.id);
        const {complete}= req.body;
        await pool.query('UPDATE todo SET complete = $1 WHERE todo_id = $2', [complete, id]);
        return res.status(200).json({
            todo: {
                todo_id: id,
                complete
            }
        })
    } catch (e) {
        next(e);
        return res.status(500);
    }
});

todoRouter.delete('/:id', middleware, async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const id: number = parseInt(req.params.id);
        await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);
        return res.status(200).json({message: `Id ${id} is deleted`});
    } catch (e) {
        next(e);
        return res.status(500);
    }
});

export default todoRouter;