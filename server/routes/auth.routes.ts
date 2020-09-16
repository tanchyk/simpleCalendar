import express, {Request, Response, NextFunction} from 'express';
import {QueryResult} from "pg";
import {pool} from '../db';

import bcrypt from 'bcryptjs';


const authRouter = express.Router();

authRouter.post('/register', async (req: Request, res: Response) => {
    try {

    } catch (e) {
        res.status(500).json({message: 'Try again'})
    }
});

export default authRouter;