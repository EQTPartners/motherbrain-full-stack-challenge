import { ElasticsearchClient, GoogleMapsAPIClient, SearchParams } from '../clients';
import { Config, InvestorsResponse, OrgWithLocation } from '../types';
import { logger, OrgFormatter } from '../utils';

export class InvestorsService {
  private readonly elasticsearchClient: ElasticsearchClient;
  private readonly googleMapsAPIClient: GoogleMapsAPIClient;

  public constructor(private config: Config) {
    this.elasticsearchClient = new ElasticsearchClient(config);
    this.googleMapsAPIClient = new GoogleMapsAPIClient(config);
  }

  public async getInvestorsResponse(): Promise<InvestorsResponse> {
    const investors = await this.elasticsearchClient.getAggregatedInvestors();
    const formattedInvestors = await Promise.all(
      investors.map(investor => this.getInvestor(investor.key)),
    );
    const filteredInvestors = formattedInvestors.filter(
      investment => investment != null,
    ) as OrgWithLocation[];
    return {
      investors: filteredInvestors,
    };
  }

  private async getInvestor(investorName: string): Promise<OrgWithLocation | null> {
    try {
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
    } catch (err) {
      logger.info(err); // info because it's usually the data being unavailable that's throwing
    }
    return null;
  }
}
