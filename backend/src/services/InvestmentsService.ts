import {
  ElasticsearchClient,
  FundingRoundSearchParams,
  GoogleMapsAPIClient,
  SearchParams,
} from '../clients';
import { Config, InvestmentsResponse, OrgWithLocation } from '../types';
import { FundingRoundFormatter, logger, OrgFormatter } from '../utils';

export class InvestmentsService {
  private readonly elasticsearchClient: ElasticsearchClient;
  private readonly googleMapsAPIClient: GoogleMapsAPIClient;

  public constructor(private config: Config) {
    this.elasticsearchClient = new ElasticsearchClient(config);
    this.googleMapsAPIClient = new GoogleMapsAPIClient(config);
  }

  public async getInvestmentsResponse(investorName: string): Promise<InvestmentsResponse> {
    const searchParams: FundingRoundSearchParams = {
      investorName,
    };
    const fundingRounds = await this.elasticsearchClient.searchFundingRounds(searchParams);
    const formattedFundingRounds = fundingRounds.map(fundingRound =>
      FundingRoundFormatter.formatFromES(fundingRound),
    );
    const investor = await this.getInvestor(investorName);
    const investments = await Promise.all(
      formattedFundingRounds.map(fundingRound => this.getInvestment(fundingRound.companyUuid)),
    );
    const filteredInvestments = investments.filter(
      investment => investment != null,
    ) as OrgWithLocation[];
    return {
      investor,
      investments: filteredInvestments,
    };
  }

  private async getInvestor(investorName: string): Promise<OrgWithLocation> {
    const doc = await this.elasticsearchClient.searchForOrg(investorName);
    const investor = OrgFormatter.formatFromES(doc);
    const searchParams: SearchParams = {
      city: investor.city,
      countryCode: investor.countryCode,
      companyName: investor.companyName,
    };

    const location = await this.googleMapsAPIClient.search(searchParams);

    return {
      ...investor,
      location,
    };
  }

  private async getInvestment(id: string): Promise<OrgWithLocation | null> {
    const doc = await this.elasticsearchClient.getOrg(id);
    const investment = OrgFormatter.formatFromES(doc);
    try {
      const searchParams: SearchParams = {
        city: investment.city,
        countryCode: investment.countryCode,
        companyName: investment.companyName,
      };

      const location = await this.googleMapsAPIClient.search(searchParams);

      return {
        ...investment,
        location,
      };
    } catch (err) {
      logger.info(err); // info because it's usually the data being unavailable that's throwing
    }
    return null;
  }
}
