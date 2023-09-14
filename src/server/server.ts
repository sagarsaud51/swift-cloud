import express, { Express } from 'express';
import cors from 'cors';
import pino from 'pino';
import { config } from '../config/config';
import { ServerContext } from './context';
import { router } from './modules/routes';
import bodyParser from 'body-parser';
import { createClient } from '@clickhouse/client';
import morgan from 'morgan';
import { initSwagger } from './modules/util/swagger.util';

const app: Express = express();
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
export const logger = pino({
    level: config.environment === 'Development' ? 'trace' : 'info',
});

//db connection
const dbClient = createClient({ host: config.dbHost });

app.use((req, res, next) => {
    req.context = { logger, db: dbClient } as ServerContext;
    next();
});

// router init
app.use(`/api/v1`, router);

//swagger init
initSwagger(app);

export default app;
