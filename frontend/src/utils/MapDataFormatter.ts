import { InvestmentsResponse, InvestorsResponse, Line, Point } from '../types';

export class MapDataFormatter {
  public static convertInvestorsResponseToPointData(response: InvestorsResponse): Point[] {
    return response.investors.map(investor => ({
      name: investor.companyName,
      shortDescription: investor.shortDescription,
      coordinates: [investor.location.lng, investor.location.lat],
    }));
  }

  public static convertInvestmentsResponseToLineData(response: InvestmentsResponse): Line[] {
    return response.investments.map(investment => ({
      from: {
        name: response.investor.companyName,
        coordinates: [response.investor.location.lng, response.investor.location.lat],
      },
      to: {
        name: investment.companyName,
        coordinates: [investment.location.lng, investment.location.lat],
      },
    }));
  }
}
