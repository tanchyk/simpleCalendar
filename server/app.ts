import express, {Errback, Request, Response, NextFunction} from 'express';
import config from 'config';
import bodyParser from 'body-parser';
import cors from 'cors';

import authRouter from './routes/auth.routes';
import todoRouter from './routes/todo.routes';

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
app.use('/api/todo', todoRouter);

const PORT = config.get('port') || 5000;

app.listen(PORT, () => {
    console.log(`PORT ${PORT}`)
});