import { LatLng } from './LatLng';

export interface InvestorES {
  key: string;
  doc_count: string;
}

export interface Investor {
  name: string;
  investmentCount: string;
}

export interface InvestorWithLocation extends Investor {
  location: LatLng;
}
