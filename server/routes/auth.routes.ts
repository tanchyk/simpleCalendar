import express, {Request, Response, NextFunction} from 'express';
import {QueryResult} from "pg";
import {pool} from '../db';
import {check, validationResult} from 'express-validator';

import config from 'config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface User {
    userId: number
    email: string
    password: string
}

const authRouter = express.Router();

authRouter.post('/register',
    [
        check('email', 'Wrong email').isEmail(),
        check('password', 'Password should be more than 6 characters').isLength({min: 6})
    ],
    async (req: Request, res: Response): Promise<Response> => {
    try {
        const errors: any = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong data when trying to sign in'
            });
        }

        const {email, password} = req.body;
        const check: any = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (check.email) {
            return res.status(400).json({message: 'User already exists'});
        }

        const hashedPassword: string = await bcrypt.hash(password, 4);

        await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword]);

        return res.status(201).json({message: 'User created'});
    } catch (e) {
        return res.status(500).json({message: 'Try again'})
    }
    });

authRouter.post('/login',
    [
        check('email', 'Enter correct email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req: Request, res: Response): Promise<Response> => {
        try {
            const errors: any = validationResult(req);

            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Wrong data when trying to sign in'
                });
            }

            const {email, password} = req.body;

            const user: any = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

            if(!user) {
                return res.status(400).json({message: 'No such user'});
            }

            const check = await bcrypt.compare(password, user.password);

            if(!check) {
                return res.status(400).json({message: 'Wrong password'});
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            return res.status(200).json({
                token,
                userId: user.id
            });

        } catch (e) {
            return res.status(500).json({message: 'Try again'})
        }
    });

export default authRouter;