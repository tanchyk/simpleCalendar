import express, {NextFunction, Request, Response} from 'express';
const User = require('../models/User');
import {check, validationResult} from 'express-validator';

import config from 'config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

        const hashedPassword: string = await bcrypt.hash(password, 4);

        const user = new User({email, password: hashedPassword});

        await user.save();

        return res.status(201).json({email, password});
    } catch (e) {
        return res.status(500).json({message: 'Try again maybe user already exists'})
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

            const user = await User.findOne({email});

            if(!user) {
                return res.status(400).json({message: 'No such user'});
            }

            const check = await bcrypt.compare(password, user.password);

            if(!check) {
                return res.status(400).json({message: 'Wrong password'});
            }

            const token = jwt.sign(
                {userId: user._id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            return res.status(200).json({
                token,
                userId: user._id
            });
        } catch (e) {
            return res.status(500).json({message: 'Try again'})
        }
    });

export default authRouter;