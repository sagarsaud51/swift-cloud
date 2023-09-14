import * as dotenv from 'dotenv';

dotenv.config({});

export const config = {
    environment: process.env.ENVIRONMENT || 'development',
    port: parseInt(process.env.port || '3000'),
    version: parseInt(process.env.VERSION || '1'),
    dbHost: process.env.DB_HOST || 'localhost',
};
