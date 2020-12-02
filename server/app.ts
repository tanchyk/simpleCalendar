import express, {Errback, Request, Response, NextFunction} from 'express';
import config from 'config';
import bodyParser from 'body-parser';
import cors from 'cors';
const mongoose = require('mongoose');

import authRouter from './routes/auth.routes';
import {CallbackError} from "mongoose";
import eventRouter from "./routes/event.routes";

const errorHandler = (err: Errback, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({error: err});
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(bodyParser());
app.use(errorHandler);

//Routes
app.use('/api/auth', authRouter);
app.use('/api/event', eventRouter);

const PORT = config.get('port') || 5000;

const startServer = async () => {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => {
            console.log(`Started ${PORT}`);
        });
    } catch (err) {
        console.log('Server Error', err.message);
        process.exit(1);
    }
}

startServer();