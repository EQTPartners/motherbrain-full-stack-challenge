import { MOCK_CONFIG } from '../_mocks_';
import { MOCK_GOOGLE_MAPS_RESPONSE } from './_mocks_';
import { GoogleMapsAPIClient } from './GoogleMapsAPIClient';

const mockedFindPlaceFromText = jest.fn();
jest.mock('@googlemaps/google-maps-services-js', function() {
  return {
    Client: () => ({
      findPlaceFromText: mockedFindPlaceFromText,
    }),
  };
});

describe('GoogleMapsAPIClient', () => {
  const params = {
    city: 'Stockholm',
    countryCode: 'SE',
    companyName: 'EQT',
  };

  it('should return the lat/lng for a valid request', async () => {
    mockedFindPlaceFromText.mockResolvedValue(MOCK_GOOGLE_MAPS_RESPONSE);
    const googleMapsAPIClient = new GoogleMapsAPIClient(MOCK_CONFIG);
    const result = await googleMapsAPIClient.search(params);
    expect(mockedFindPlaceFromText).toHaveBeenCalledWith({
      params: {
        fields: ['geometry'],
        input: 'EQT, Stockholm, SE',
        inputtype: 'textquery',
        key: 'google_api_key',
      },
    });
    expect(result).toEqual({
      lat: -33.8599358,
      lng: 151.2090295,
    });
  });

  it('should throw an error when it cannot find the lat/lng', async () => {
    mockedFindPlaceFromText.mockResolvedValue({});
    const googleMapsAPIClient = new GoogleMapsAPIClient(MOCK_CONFIG);
    expect.assertions(1);
    try {
      await googleMapsAPIClient.search(params);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
});
