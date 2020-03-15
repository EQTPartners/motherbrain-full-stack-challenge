import { Client, RequestParams } from '@elastic/elasticsearch';

import { Config, FundingRoundES, InvestorES, OrgES } from '../types';

enum Indices {
  Org = 'org',
  Funding = 'funding',
}

export interface FundingRoundSearchParams {
  country?: string;
  investorName?: string;
  investmentType?: string;
  fromDate?: string; // YYYY-MM-DD format
  toDate?: string; // YYYY-MM-DD format
  size?: number;
}

interface ElasticsearchDocument<T> {
  _index: Indices;
  _type: string;
  _id: string;
  _score: number;
  _source: T;
}

// TODO: There are some efficiency gains that are possible by using the Bulk API
export class ElasticsearchClient {
  private static readonly DEFAULT_SEARCH_SIZE = 100;
  private static readonly MINIMUM_SHOULD_MATCH = 1;
  private static readonly EXCLUDED_SEARCH_PARAMS = [
    {
      term: {
        investor_names: '{}',
      },
    },
  ];
  private static readonly INCLUDED_FUNDING_ROUNDS = [
    {
      wildcard: {
        investor_names: {
          value: 'series_*',
          boost: 1.0,
          rewrite: 'constant_score',
        },
      },
    },
    {
      match: {
        investment_type: 'seed',
      },
    },
  ];

  private static formatDateRangeQuery(fromDate?: string, toDate?: string): any {
    const dateRangeQuery: any = {
      range: {
        announced_on: {},
      },
    };

    if (fromDate != null) {
      dateRangeQuery.range.announced_on.gte = fromDate;
    }

    if (toDate != null) {
      dateRangeQuery.range.announced_on.lt = toDate;
    }

    return dateRangeQuery;
  }

  private readonly client: Client;

  public constructor(config: Config) {
    this.client = new Client({
      node: config.elasticsearch.url,
    });
  }

  public async getAggregatedInvestors(size = 100): Promise<InvestorES[]> {
    const params: any = {
      index: Indices.Funding,
      body: {
        aggs: {
          investor_names: {
            terms: {
              field: 'investor_names',
              order: { _count: 'desc' },
              size,
            },
          },
        },
        query: {
          bool: {
            must_not: ElasticsearchClient.EXCLUDED_SEARCH_PARAMS,
            should: ElasticsearchClient.INCLUDED_FUNDING_ROUNDS,
            minimum_should_match: ElasticsearchClient.MINIMUM_SHOULD_MATCH,
          },
        },
      },
      size: 0,
    };

    const result = await this.client.search(params);

    if (result?.body?.aggregations?.investor_names?.buckets == null) {
      throw new Error('empty aggregation of funding rounds');
    }

    return result.body.aggregations.investor_names.buckets;
  }

  public async getFundingRound(id: string): Promise<FundingRoundES> {
    const params: RequestParams.Get = {
      index: Indices.Funding,
      id,
    };

    const result = await this.client.get(params);

    if (result?.body?.hits?.hits?.[0] == null) {
      throw new Error(`get results empty for funding round: ${id}`);
    }

    return result.body.hits.hits[0];
  }

  public async searchFundingRounds(
    searchParams: FundingRoundSearchParams,
  ): Promise<FundingRoundES[]> {
    const { country, investorName, investmentType, fromDate, toDate, size } = searchParams;

    const query: any = {
      bool: {
        must: [],
        must_not: ElasticsearchClient.EXCLUDED_SEARCH_PARAMS,
        should: ElasticsearchClient.INCLUDED_FUNDING_ROUNDS,
        minimum_should_match: ElasticsearchClient.MINIMUM_SHOULD_MATCH,
      },
    };

    if (country != null) {
      query.bool.must.push({
        term: {
          country: country,
        },
      });
    }

    // TODO: Might not be the most performant, but options are limited due to formatting of investor_names property
    if (investorName != null) {
      query.bool.must.push({
        wildcard: {
          investor_names: {
            value: `*${investorName}*`,
          },
        },
      });
    }

    if (investmentType != null) {
      query.bool.must.push({
        term: {
          investment_type: investmentType,
        },
      });
    }

    if (fromDate != null || toDate != null) {
      const dateRangeQuery = ElasticsearchClient.formatDateRangeQuery(fromDate, toDate);
      query.bool.must.push(dateRangeQuery);
    }

    const params: RequestParams.Search = {
      index: Indices.Funding,
      body: { query },
      size: size != null ? size : ElasticsearchClient.DEFAULT_SEARCH_SIZE,
    };

    const result = await this.client.search(params);

    if (result?.body?.hits?.hits == null || result.body.hits.hits.length === 0) {
      throw new Error(`search results empty for funding rounds`);
    }

    return result.body.hits.hits.map((hit: ElasticsearchDocument<FundingRoundES>) => hit._source);
  }

  public async getOrg(id: string): Promise<OrgES> {
    const params: RequestParams.Get = {
      index: Indices.Org,
      id,
    };

    const result = await this.client.get(params);

    if (result?.body?._source == null) {
      throw new Error(`get results empty for org: ${id}`);
    }

    return result.body._source;
  }

  public async searchForOrg(name: string): Promise<OrgES> {
    const params: RequestParams.Search = {
      index: Indices.Org,
      body: {
        query: {
          match: {
            company_name: name,
          },
        },
      },
      size: 1,
    };

    const result = await this.client.search(params);

    if (result?.body?.hits?.hits?.[0]?._source == null) {
      throw new Error(`search results empty for org: ${name}`);
    }

    return result.body.hits.hits[0]._source;
  }
}
