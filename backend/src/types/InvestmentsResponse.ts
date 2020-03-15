import { OrgWithLocation } from './Org';

export interface InvestmentsResponse {
  investor: OrgWithLocation;
  investments: OrgWithLocation[];
}
