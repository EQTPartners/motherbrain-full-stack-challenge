import { Client } from '@googlemaps/google-maps-services-js';
import { FindPlaceFromTextRequest } from '@googlemaps/google-maps-services-js/dist';
import { PlaceInputType } from '@googlemaps/google-maps-services-js/dist/common';

import { Config, LatLng } from '../types';

export interface SearchParams {
  city?: string;
  countryCode?: string;
  companyName?: string;
}

export class GoogleMapsAPIClient {
  private static formatSearchInput(params: SearchParams): string {
    const { city, countryCode, companyName } = params;
    return [companyName, city, countryCode].join(', ');
  }

  private readonly client: Client;

  public constructor(private config: Config) {
    this.client = new Client({});
  }

  public async search(params: SearchParams): Promise<LatLng> {
    const request: FindPlaceFromTextRequest = {
      params: {
        input: GoogleMapsAPIClient.formatSearchInput(params),
        inputtype: PlaceInputType.textQuery,
        key: this.config.googleMaps.apiKey,
        fields: ['geometry'],
      },
    };
    const response = await this.client.findPlaceFromText(request);

    if (response?.data?.candidates?.[0]?.geometry?.location == null) {
      throw new Error(
        `unable to find location for: ${params.companyName}, ${params.city}, ${params.countryCode}`,
      );
    }

    return response.data.candidates[0].geometry.location;
  }
}
