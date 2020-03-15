export interface FundingRoundES {
  funding_round_uuid: string;
  company_uuid: string;
  company_name: string;
  investment_type: string;
  announced_on: string;
  raised_amount_usd: string;
  investor_names: string;
}

export interface FundingRound {
  fundingRoundUuid: string;
  companyUuid: string;
  companyName: string;
  investmentType: string;
  announcedOn: string;
  raisedAmountUsd: string;
  investorNames: string[];
}
