import { Request, Response } from 'express';

import { InvestorsService } from '../services';
import { Config } from '../types';
import { logger } from '../utils';

export class InvestorsController {
  private investorsService: InvestorsService;

  public constructor(private config: Config) {
    this.investorsService = new InvestorsService(config);
  }

  public async handleInvestorsRequest(req: Request, res: Response): Promise<void> {
    try {
      const response = await this.investorsService.getInvestorsResponse();
      res.json({
        status: 'ok',
        ...response,
      });
    } catch (err) {
      logger.error(err);
      res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  }
}
