import express, { Express } from 'express';
import cors from 'cors';
import pino from 'pino';
import { config } from '../config/config';
import { ServerContext } from './context';
import { router } from './modules/routes';
import bodyParser from 'body-parser';
import { createClient } from '@clickhouse/client';
import swaggerUi from 'swagger-ui-express';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerDoc = require('../../swagger.json');

const app: Express = express();
app.use(cors());
// app.use(morgan('tiny'));
app.use(bodyParser.json());
export const logger = pino({
    level: config.environment === 'Development' ? 'trace' : 'info',
});

const dbClient = createClient();

app.use((req, res, next) => {
    req.context = { logger, db: dbClient } as ServerContext;
    next();
});

app.use(`/api/v1`, router);

const option = {
    explorer: true,
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, { ...option }));

export default app;
