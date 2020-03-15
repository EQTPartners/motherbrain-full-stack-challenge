import { FundingRoundFormatter } from './FundingRoundFormatter';
import { MOCK_ES_FUNDING_ROUNDS, MOCK_FUNDING_ROUNDS } from '../_mocks_';

const esInvestorNames = '{"Entrepreneurs Fund","Heidelberg Innovation"}';
const formattedInvestorNames = ['Entrepreneurs Fund', 'Heidelberg Innovation'];

describe('FundingRoundFormatter', () => {
  it('should format funding rounds from ES', () => {
    const result = FundingRoundFormatter.formatFromES(MOCK_ES_FUNDING_ROUNDS[0]);
    expect(result).toEqual(MOCK_FUNDING_ROUNDS[0]);
  });

  it('should format investor names to an array', () => {
    const result = FundingRoundFormatter.formatInvestorNamesToArray(esInvestorNames);
    expect(result).toEqual(formattedInvestorNames);
  });

  it('should format investor names to ES', () => {
    const result = FundingRoundFormatter.formatInvestorNamesToES(formattedInvestorNames);
    expect(result).toEqual(esInvestorNames);
  });
});
