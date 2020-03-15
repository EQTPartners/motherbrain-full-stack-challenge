import { InvestorsController } from './InvestorsController';
import { MOCK_CONFIG } from '../_mocks_';

const mockedGetInvestorsResponse = jest.fn();
jest.mock('../services', function() {
  return {
    InvestorsService: () => ({
      getInvestorsResponse: mockedGetInvestorsResponse,
    }),
  };
});

const mockReq = {} as any;
const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as any;

describe('InvestorsController', () => {
  it('should respond to requests for investors', async () => {
    mockedGetInvestorsResponse.mockResolvedValue({ test: 'test' });
    const investorsController = new InvestorsController(MOCK_CONFIG);
    await investorsController.handleInvestorsRequest(mockReq, mockRes);
    expect(mockRes.json).toHaveBeenCalledWith({ status: 'ok', test: 'test' });
  });

  it('should respond to service-level errors with 500 status code and message', async () => {
    mockedGetInvestorsResponse.mockRejectedValue(new Error('oops'));
    const investorsController = new InvestorsController(MOCK_CONFIG);
    await investorsController.handleInvestorsRequest(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ status: 'error', message: 'oops' });
  });
});
