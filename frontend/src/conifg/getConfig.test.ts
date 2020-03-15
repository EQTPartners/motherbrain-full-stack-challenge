import { getConfig } from './getConfig';
import { MOCK_CONFIG } from '../_mocks_';

describe('getConfig', () => {
  it('should get the config data', () => {
    expect(getConfig()).toEqual(MOCK_CONFIG);
  });
});
