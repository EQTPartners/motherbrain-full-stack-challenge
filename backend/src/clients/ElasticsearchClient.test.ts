import requireActual = jest.requireActual;
import { MOCK_CONFIG } from '../_mocks_';
import {
  MOCK_AGGREGATED_SEARCH_QUERY,
  MOCK_AGGREGATED_SEARCH_RESULTS,
  MOCK_FUNDING_ROUNDS_SEARCH_QUERY,
  MOCK_FUNDING_ROUNDS_SEARCH_RESULTS,
  MOCK_GET_AGGREGATED_INVESTORS_RESPONSE,
  MOCK_GET_ORG_RESPONSE,
  MOCK_ORG_GET_RESULTS,
  MOCK_ORG_SEARCH_RESULTS,
  MOCK_SEARCH_FUNDING_ROUNDS_RESPONSE,
  MOCK_SEARCH_ORG_RESPONSE,
} from './_mocks_';
import { ElasticsearchClient } from './ElasticsearchClient';

const mockedGet = jest.fn();
const mockedSearch = jest.fn();
jest.mock('@elastic/elasticsearch', function() {
  return {
    Client: () => ({
      get: mockedGet,
      search: mockedSearch,
    }),
    RequestParams: requireActual('@elastic/elasticsearch').RequestParams,
  };
});

describe('ElasticsearchClient', () => {
  describe('getAggregatedInvestors', () => {
    it('should get aggregated investors', async () => {
      mockedSearch.mockResolvedValue(MOCK_AGGREGATED_SEARCH_RESULTS);
      const elasticsearchClient = new ElasticsearchClient(MOCK_CONFIG);
      const result = await elasticsearchClient.getAggregatedInvestors(10);

      expect(mockedSearch).toHaveBeenCalledWith(MOCK_AGGREGATED_SEARCH_QUERY);
      expect(result).toEqual(MOCK_GET_AGGREGATED_INVESTORS_RESPONSE);
    });

    it('should throw if no data', async () => {
      mockedSearch.mockResolvedValue(null);
      const elasticsearchClient = new ElasticsearchClient(MOCK_CONFIG);

      expect.assertions(1);

      try {
        await elasticsearchClient.getAggregatedInvestors(10);
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
  });

  describe('searchFundingRounds', () => {
    it('should get a funding rounds by investor name', async () => {
      mockedSearch.mockResolvedValue(MOCK_FUNDING_ROUNDS_SEARCH_RESULTS);
      const elasticsearchClient = new ElasticsearchClient(MOCK_CONFIG);
      const params = {
        country: 'US',
        investorName: 'EQT',
        investmentType: 'series_a',
        fromDate: '2020-01-01',
        toDate: '2020-03-01',
        size: 10,
      };
      const result = await elasticsearchClient.searchFundingRounds(params);

      expect(mockedSearch).toHaveBeenCalledWith(MOCK_FUNDING_ROUNDS_SEARCH_QUERY);
      expect(result).toEqual(MOCK_SEARCH_FUNDING_ROUNDS_RESPONSE);
    });

    it('should throw an error if no funding rounds exist', async () => {
      mockedSearch.mockResolvedValue(null);
      const elasticsearchClient = new ElasticsearchClient(MOCK_CONFIG);
      expect.assertions(1);

      try {
        await elasticsearchClient.searchFundingRounds({});
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
  });

  describe('getOrg', () => {
    it('should get an org', async () => {
      mockedGet.mockResolvedValue(MOCK_ORG_GET_RESULTS);

      const elasticsearchClient = new ElasticsearchClient(MOCK_CONFIG);
      const result = await elasticsearchClient.getOrg('51d72ce7-3075-b4d9-941f-8a90b23c9c14');

      expect(mockedGet).toHaveBeenCalledWith({
        id: '51d72ce7-3075-b4d9-941f-8a90b23c9c14',
        index: 'org',
      });
      expect(result).toEqual(MOCK_GET_ORG_RESPONSE);
    });

    it('should throw an error if it cannot find the org', async () => {
      mockedGet.mockResolvedValue(null);
      const elasticsearchClient = new ElasticsearchClient(MOCK_CONFIG);
      expect.assertions(1);

      try {
        await elasticsearchClient.getOrg('51d72ce7-3075-b4d9-941f-8a90b23c9c14');
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
  });

  describe('searchOrg', () => {
    it('should search for an org', async () => {
      mockedSearch.mockResolvedValue(MOCK_ORG_SEARCH_RESULTS);

      const elasticsearchClient = new ElasticsearchClient(MOCK_CONFIG);
      const result = await elasticsearchClient.searchForOrg('EQT');

      expect(mockedSearch).toHaveBeenCalledWith({
        index: 'org',
        body: { query: { match: { company_name: 'EQT' } } },
        size: 1,
      });
      expect(result).toEqual(MOCK_SEARCH_ORG_RESPONSE);
    });

    it('should throw an error if it cannot find the org', async () => {
      mockedSearch.mockResolvedValue(null);
      const elasticsearchClient = new ElasticsearchClient(MOCK_CONFIG);
      expect.assertions(1);

      try {
        await elasticsearchClient.searchForOrg('EQT');
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
  });
});
