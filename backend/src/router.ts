import express from 'express';
import expressRedisCache from 'express-redis-cache';

import { InvestmentsController, InvestorsController } from './controllers';
import { Config } from './types';

export class Router {
  private static readonly CACHE_EXPIRY_IN_SECONDS = 60 * 60 * 4; // cache expires in 4 hours

  private readonly cache: expressRedisCache.ExpressRedisCache;
  private readonly investmentsController: InvestmentsController;
  private readonly investorsController: InvestorsController;

  public constructor(private config: Config) {
    this.cache = expressRedisCache({
      host: config.redis.url,
      expire: {
        '5xx': 1,
        xxx: Router.CACHE_EXPIRY_IN_SECONDS,
      } as any,
      prefix: new Date().getTime().toString(), // prefix the cache with the server start time for dev purposes
    });
    this.investmentsController = new InvestmentsController(config);
    this.investorsController = new InvestorsController(config);
  }

  public router = express.Router();

  public initialize() {
    this.router.get('/', (req, res) => {
      res.json({
        status: 'ok',
        message: 'Motherbrain Challenge Backend',
      });
    });

    this.router.get('/status', (req, res) => {
      res.json({
        status: 'ok',
      });
    });

    this.router.get('/investors', this.cache.route(), (req, res) =>
      this.investorsController.handleInvestorsRequest(req, res),
    );

    this.router.get('/investors/:investorName/investments', this.cache.route(), (req, res) =>
      this.investmentsController.handleInvestmentsRequest(req, res),
    );
  }
}
