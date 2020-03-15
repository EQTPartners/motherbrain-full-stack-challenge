import { Request, Response } from 'express';

import { InvestmentsService } from '../services';
import { Config } from '../types';
import { logger } from '../utils';

export class InvestmentsController {
  private investmentsService: InvestmentsService;

  public constructor(private config: Config) {
    this.investmentsService = new InvestmentsService(config);
  }

  public async handleInvestmentsRequest(req: Request, res: Response): Promise<void> {
    const { investorName } = req.params;
    if (investorName == null) {
      res.status(400).json({
        status: 'error',
        message: 'missing investor name',
      });
      return;
    }

    try {
      const response = await this.investmentsService.getInvestmentsResponse(investorName);
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
