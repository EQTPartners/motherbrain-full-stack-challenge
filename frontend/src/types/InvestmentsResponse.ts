import { Org } from './Org';

export interface InvestmentsResponse {
  status: string;
  investor: Org;
  investments: Org[];
}
