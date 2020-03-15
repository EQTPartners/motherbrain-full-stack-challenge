import { MapDataFormatter } from './MapDataFormatter';
import {
  MOCK_INVESTMENTS_RESPONSE,
  MOCK_INVESTORS_RESPONSE,
  MOCK_LINES_DATA,
  MOCK_POINTS_DATA,
} from '../_mocks_';

describe('MapDataFormatter', () => {
  it('should format the investors response API to point data', () => {
    const result = MapDataFormatter.convertInvestorsResponseToPointData(MOCK_INVESTORS_RESPONSE);
    expect(result).toEqual(MOCK_POINTS_DATA);
  });

  it('should format the investments response API to line data', () => {
    const result = MapDataFormatter.convertInvestmentsResponseToLineData(MOCK_INVESTMENTS_RESPONSE);
    expect(result).toEqual(MOCK_LINES_DATA);
  });
});
