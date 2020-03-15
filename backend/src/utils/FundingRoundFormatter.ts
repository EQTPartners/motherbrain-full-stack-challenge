import { FundingRound, FundingRoundES } from '../types';

export class FundingRoundFormatter {
  public static formatFromES(fundingRoundES: FundingRoundES): FundingRound {
    return {
      fundingRoundUuid: fundingRoundES.funding_round_uuid,
      companyUuid: fundingRoundES.company_uuid,
      companyName: fundingRoundES.company_name,
      investmentType: fundingRoundES.investment_type,
      announcedOn: fundingRoundES.announced_on,
      raisedAmountUsd: fundingRoundES.raised_amount_usd,
      investorNames: FundingRoundFormatter.formatInvestorNamesToArray(
        fundingRoundES.investor_names,
      ),
    };
  }

  // The next two methods are for handling the investor names which are in a strange format
  // Investor names come in as "{\"Entrepreneurs Fund\",\"Heidelberg Innovation\"}", which looks pretty similar to JSON, however it's not so it needs special handling.
  public static formatInvestorNamesToES(investorNames: string[]): string {
    const investorNamesInQuotations = investorNames.map(investorName => `\"${investorName}\"`); // add double quotes to the beginning and end of each string
    const joinedInvestorNames = investorNamesInQuotations.join(',');
    return `{${joinedInvestorNames}}`;
  }

  public static formatInvestorNamesToArray(esInvestorNames: string): string[] {
    const investorNameStringWithoutBraces = esInvestorNames.substring(
      1,
      esInvestorNames.length - 1,
    ); // Drop the { and } from the outside of the string
    const investorNamesInQuotations = investorNameStringWithoutBraces.split(','); // split on the ',' to convert to an array
    return investorNamesInQuotations.map(name => name.substring(1, name.length - 1)); // remove the leading and trailing double quote
  }
}
