import express, {Errback, Request, Response, NextFunction} from 'express';
import config from 'config';
const bodyParser = require('body-parser');

const errorHandler = (err: Errback, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({error: err});
}

const app = express();

app.use(express.json());
app.use(bodyParser());
app.use(errorHandler);

//Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/todo', require('./routes/todo.routes'));

const PORT = config.get('port') || 5000;

app.listen(PORT, () => {
    console.log(`PORT ${PORT}`)
});