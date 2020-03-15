import { InvestorFormatter } from './InvestorFormatter';
import { MOCK_ES_INVESTORS, MOCK_INVESTORS } from '../_mocks_';

describe('InvestorFormatter', () => {
  it('should format from ES', () => {
    const result = InvestorFormatter.formatFromES(MOCK_ES_INVESTORS[0]);
    expect(result).toEqual(MOCK_INVESTORS[0]);
  });
});
