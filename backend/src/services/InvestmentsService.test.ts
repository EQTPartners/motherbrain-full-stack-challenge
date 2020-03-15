import { MOCK_CONFIG, MOCK_ES_FUNDING_ROUNDS, MOCK_ES_INVESTORS, MOCK_ES_ORGS } from '../_mocks_';
import { MOCK_INVESTMENTS_SERVICE_RESPONSE } from './_mocks_';
import { InvestmentsService } from './InvestmentsService';
import { InvestorsService } from './InvestorsService';

const MOCKED_INVESTOR_NAME = 'EQT';

const mockedSearchFundingRounds = jest.fn();
const mockedSearchForOrg = jest.fn();
const mockedGetOrg = jest.fn();
const mockedGoogleMapsAPISearch = jest.fn();
jest.mock('../clients', function() {
  return {
    ElasticsearchClient: () => ({
      searchFundingRounds: mockedSearchFundingRounds,
      searchForOrg: mockedSearchForOrg,
      getOrg: mockedGetOrg,
    }),
    GoogleMapsAPIClient: () => ({
      search: mockedGoogleMapsAPISearch,
    }),
  };
});

describe('InvestmentsService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should construct a response', async () => {
    mockedSearchFundingRounds.mockResolvedValue(MOCK_ES_FUNDING_ROUNDS);
    mockedSearchForOrg.mockResolvedValue(MOCK_ES_ORGS[0]);
    mockedGetOrg.mockResolvedValue(MOCK_ES_ORGS[0]);
    mockedGoogleMapsAPISearch.mockResolvedValue({ lat: 0, lng: 0 });

    const investmentsService = new InvestmentsService(MOCK_CONFIG);
    const result = await investmentsService.getInvestmentsResponse(MOCKED_INVESTOR_NAME);

    expect(mockedSearchFundingRounds).toHaveBeenCalledWith({ investorName: MOCKED_INVESTOR_NAME });
    expect(mockedSearchForOrg).toHaveBeenCalledWith(MOCKED_INVESTOR_NAME);
    expect(mockedGetOrg).toHaveBeenCalledWith('7dd26818-843a-d792-1675-b7dae4d2da2d');
    expect(mockedGoogleMapsAPISearch).toHaveBeenCalledTimes(2);
    expect(mockedGoogleMapsAPISearch).toHaveBeenCalledWith({
      city: 'Delhi',
      companyName: 'Bulbulshop',
      countryCode: 'IND',
    });
    expect(result).toEqual(MOCK_INVESTMENTS_SERVICE_RESPONSE);
  });

  it('should throw if there is an issue finding the location for the investor', async () => {
    mockedSearchFundingRounds.mockResolvedValue(MOCK_ES_FUNDING_ROUNDS);
    mockedSearchForOrg.mockResolvedValue(MOCK_ES_ORGS[0]);
    mockedGetOrg.mockResolvedValue(MOCK_ES_ORGS[0]);
    mockedGoogleMapsAPISearch.mockRejectedValueOnce('oops');

    const investmentsService = new InvestmentsService(MOCK_CONFIG);

    expect.assertions(2);

    try {
      await investmentsService.getInvestmentsResponse(MOCKED_INVESTOR_NAME);
    } catch (err) {
      expect(err).toBeDefined();
    }
    expect(mockedGoogleMapsAPISearch).toHaveBeenCalledTimes(1);
  });

  it('should not throw if there is an issue finding the location for the investment', async () => {
    mockedSearchFundingRounds.mockResolvedValue(MOCK_ES_FUNDING_ROUNDS);
    mockedSearchForOrg.mockResolvedValue(MOCK_ES_ORGS[0]);
    mockedGetOrg.mockResolvedValue(MOCK_ES_ORGS[0]);
    mockedGoogleMapsAPISearch.mockResolvedValueOnce({ lat: 0, lng: 0 });
    mockedGoogleMapsAPISearch.mockRejectedValue('oops');

    const investmentsService = new InvestmentsService(MOCK_CONFIG);
    const result = await investmentsService.getInvestmentsResponse(MOCKED_INVESTOR_NAME);
    expect(result).toBeDefined();
    expect(mockedGoogleMapsAPISearch).toHaveBeenCalledTimes(2);
  });
});
