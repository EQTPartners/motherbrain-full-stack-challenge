import { OrgFormatter } from './OrgFormatter';
import { MOCK_ES_ORGS, MOCK_ORGS } from '../_mocks_';

describe('OrgFormatter', () => {
  it('should format from ES', () => {
    const result = OrgFormatter.formatFromES(MOCK_ES_ORGS[0]);
    expect(result).toEqual(MOCK_ORGS[0]);
  });
});
