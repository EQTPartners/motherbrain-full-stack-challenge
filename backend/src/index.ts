import cors from 'cors';
import express from 'express';

import { Router } from './router';
import { getConfig, logger } from './utils';

const config = getConfig();

const app = express();
const router = new Router(config);
router.initialize();

app.use(cors());

app.use('/', router.router);

app.listen(config.express.port, () =>
  logger.info(`Example app listening on port ${config.express.port}!`),
);
