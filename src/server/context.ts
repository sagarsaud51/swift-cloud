import { ClickHouseClient } from '@clickhouse/client';
import pino from 'pino';

export interface ServerContext {
    logger: pino.Logger;
    db: ClickHouseClient;
}
