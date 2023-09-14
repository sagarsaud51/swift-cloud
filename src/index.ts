import app, { logger } from './server/server';
import { config } from './config/config';


app.listen(config.port, () => {
  logger.info(`swift-cloud server is now up and running in port ${config.port}`);
});

