import { Org, OrgES } from '../types';

export class OrgFormatter {
  public static formatFromES(orgEs: OrgES): Org {
    return {
      uuid: orgEs.uuid,
      companyName: orgEs.company_name,
      homepageUrl: orgEs.homepage_url,
      countryCode: orgEs.country_code,
      city: orgEs.city,
      shortDescription: orgEs.short_description,
      description: orgEs.description,
      fundingRounds: orgEs.funding_rounds,
      fundingTotalUSD: orgEs.funding_total_usd,
      employeeCount: orgEs.employee_count,
    };
  }
}
