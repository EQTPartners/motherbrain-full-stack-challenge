import { MOCK_CONFIG } from '../_mocks_';
import { InvestmentsController } from './InvestmentsController';

const mockedGetInvestmentsResponse = jest.fn();
jest.mock('../services', function() {
  return {
    InvestmentsService: () => ({
      getInvestmentsResponse: mockedGetInvestmentsResponse,
    }),
  };
});

const mockReq = {} as any;
const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as any;

describe('InvestmentsController', () => {
  it('should respond to requests for investors', async () => {
    mockReq.params = { investorName: 'EQT' };
    mockedGetInvestmentsResponse.mockResolvedValue({ test: 'test' });
    const investmentsController = new InvestmentsController(MOCK_CONFIG);
    await investmentsController.handleInvestmentsRequest(mockReq, mockRes);
    expect(mockRes.json).toHaveBeenCalledWith({ status: 'ok', test: 'test' });
  });

  it('should respond to user errors with 400 status code and message', async () => {
    mockReq.params = {};
    const investmentsController = new InvestmentsController(MOCK_CONFIG);
    await investmentsController.handleInvestmentsRequest(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'missing investor name',
    });
  });

  it('should respond to service-level errors with 500 status code and message', async () => {
    mockReq.params = { investorName: 'EQT' };
    mockedGetInvestmentsResponse.mockRejectedValue(new Error('oops'));
    const investmentsController = new InvestmentsController(MOCK_CONFIG);
    await investmentsController.handleInvestmentsRequest(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ status: 'error', message: 'oops' });
  });
});
