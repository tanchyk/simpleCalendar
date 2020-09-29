import express, {Request, Response, NextFunction} from 'express';
import {QueryResult} from "pg";
import {pool} from '../db';
import config from 'config';
import jwt from 'jsonwebtoken';

// const middleware = (req: Request, res: Response, next: NextFunction) => {
//     if (req.method === 'OPTIONS') {
//         return next();
//     }
//
//     try {
//         const token = req.headers.authorization!.split(' ')[1] // "Bearer TOKEN"
//
//         if (!token) {
//             return res.status(401).json({ message: 'No authorization' });
//         }
//
//         const decoded = jwt.verify(token, config.get('jwtSecret'));
//         console.log('f',decoded)
//         if(!decoded) {
//             return res.status(401).json({ message: 'No authorization' })
//         }
//         next()
//     } catch (err) {
//         res.status(401).json({message: 'No authorization'});
//     }
// }

const todoRouter = express.Router();

todoRouter.get('/:userId', async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
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

todoRouter.post('/', async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
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

todoRouter.put('/:id', async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const id: number = parseInt(req.params.id);
        const {description}= req.body;
        await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [description, id]);
        return res.status(200).json({
            todo: {
                todo_id: id,
                description
            }
        })
    } catch (e) {
        next(e);
        return res.status(500);
    }
});

todoRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
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