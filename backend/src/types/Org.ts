import { LatLng } from './LatLng';

export interface OrgES {
  uuid: string;
  company_name: string;
  homepage_url: string;
  country_code: string;
  city: string;
  short_description: string;
  description: string;
  funding_rounds: string;
  funding_total_usd: string;
  employee_count: string;
}

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
}

export interface OrgWithLocation extends Org {
  location: LatLng;
}
