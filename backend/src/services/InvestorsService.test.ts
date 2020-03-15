import { MOCK_INVESTOR_SERVICE_RESPONSE } from './_mocks_';
import { InvestorsService } from './InvestorsService';
import { MOCK_CONFIG, MOCK_ES_INVESTORS, MOCK_ES_ORGS } from '../_mocks_';

const mockedGetAggregatedInvestors = jest.fn();
const mockedSearchForOrg = jest.fn();
const mockedGoogleMapsAPISearch = jest.fn();
jest.mock('../clients', function() {
  return {
    ElasticsearchClient: () => ({
      getAggregatedInvestors: mockedGetAggregatedInvestors,
      searchForOrg: mockedSearchForOrg,
    }),
    GoogleMapsAPIClient: () => ({
      search: mockedGoogleMapsAPISearch,
    }),
  };
});

describe('InvestorsService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should construct a response', async () => {
    mockedGetAggregatedInvestors.mockResolvedValue(MOCK_ES_INVESTORS);
    mockedSearchForOrg.mockResolvedValue(MOCK_ES_ORGS[0]);
    mockedGoogleMapsAPISearch.mockResolvedValue({ lat: 0, lng: 0 });

    const investorsService = new InvestorsService(MOCK_CONFIG);
    const result = await investorsService.getInvestorsResponse();

    expect(mockedSearchForOrg).toBeCalledWith('{"Y Combinator"}');
    expect(mockedGoogleMapsAPISearch).toBeCalledWith({
      city: 'Delhi',
      companyName: 'Bulbulshop',
      countryCode: 'IND',
    });
    expect(result).toEqual(MOCK_INVESTOR_SERVICE_RESPONSE);
  });

  it('should not throw if there is an issue finding the org in elasticsearch', async () => {
    mockedGetAggregatedInvestors.mockResolvedValue(MOCK_ES_INVESTORS);
    mockedSearchForOrg.mockRejectedValue('oops');

    const investorsService = new InvestorsService(MOCK_CONFIG);
    const result = await investorsService.getInvestorsResponse();

    expect(mockedGoogleMapsAPISearch).not.toHaveBeenCalled();
    expect(result).toEqual({ investors: [] });
  });
});
