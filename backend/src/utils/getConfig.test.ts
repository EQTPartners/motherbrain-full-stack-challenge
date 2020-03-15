import { getConfig } from './getConfig';
import { MOCK_CONFIG } from '../_mocks_';

describe('getConfig', () => {
  it('should return a correctly formatted config file', () => {
    process.env.ES_URL = 'es_url';
    process.env.GOOGLE_MAPS_API_KEY = 'google_api_key';
    process.env.REDIS_URL = 'redis_url';
    const config = getConfig();
    expect(config).toEqual(MOCK_CONFIG);
    delete process.env.ES_URL;
    delete process.env.GOOGLE_MAPS_API_KEY;
    delete process.env.REDIS_URL;
  });

  it('should throw if env variables are not available', () => {
    expect(() => getConfig()).toThrow();
  });
});
