import { LatLng } from './LatLng';

export interface Org {
  uuid: string;
  companyName: string;
  homepageUrl: string;
  countryCode: string;
  city: string;
  shortDescription: string;
  description: string;
  fundingRounds: string;
  fundingTotalUSD: string;
  employeeCount: string;
  location: LatLng;
}
