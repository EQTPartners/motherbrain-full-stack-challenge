import express from 'express';

import { Router } from './router';

const PORT = 8080;

const app = express();
const router = new Router();
router.initialize();

app.use('/', router.router);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
