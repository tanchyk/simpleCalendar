import express, {Request, Response, NextFunction} from 'express';
const Event = require('../models/Event');
import config from 'config';
import jwt from 'jsonwebtoken';

const middleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token: Array<string> = req.headers.authorization!.split(' '); // "Bearer TOKEN"

        if (!token[1]) {
            return res.status(401).json({ message: 'No authorization 1' });
        }

        const decoded = jwt.verify(token[1], config.get('jwtSecret'));
        if(!decoded) {
            return res.status(401).json({ message: 'No authorization 2' });
        }
        next();
    } catch (err) {
        res.status(401).json({message: 'No authorization 3'});
    }
}

const eventRouter = express.Router();

eventRouter.get('/:userId', middleware, async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const userId: string = req.params.userId;
        const events = await Event.find({
            owner: userId
        })
        return res.status(200).json(events);
    } catch (e) {
        next(e);
        return res.status(500);
    }
});

eventRouter.post('/',middleware, async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const {start, duration, title, userId} = req.body;
        console.log({start, duration, title, userId})
        if(start && duration && title && userId) {
            const event = new Event({
                start, duration, title, owner: userId
            });
            await event.save();
            return res.status(200).json({event});
        } else {
            throw new Error('No description was provided');
        }
    } catch (e) {
        next(e);
        return res.status(500);
    }
});

eventRouter.delete('/:id', middleware, async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const id: string = req.params.id;
        await Event.findByIdAndDelete(id);
        return res.status(200).json({message: `Id ${id} is deleted`});
    } catch (e) {
        next(e);
        return res.status(500);
    }
});

export default eventRouter;