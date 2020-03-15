import { Investor, InvestorES } from '../types';

export class InvestorFormatter {
  public static formatFromES(investorES: InvestorES): Investor {
    return {
      name: investorES.key,
      investmentCount: investorES.doc_count,
    };
  }
}
