export const MOCK_ORG_SEARCH_RESULTS = {
  body: {
    took: 0,
    timed_out: false,
    _shards: {
      total: 1,
      successful: 1,
      skipped: 0,
      failed: 0,
    },
    hits: {
      total: {
        value: 10000,
        relation: 'gte',
      },
      max_score: 1.0,
      hits: [
        {
          _index: 'org',
          _type: '_doc',
          _id: '51d72ce7-3075-b4d9-941f-8a90b23c9c14',
          _score: 1.0,
          _source: {
            uuid: '51d72ce7-3075-b4d9-941f-8a90b23c9c14',
            company_name: 'BN Media',
            homepage_url: 'http://bnmediallc.com',
            country_code: '',
            city: '',
            short_description:
              'BN Media is an entity that features three cross promoted faith and inspiration brands including Affinity4, Beliefnet, and Cross Bridge.',
            description:
              'The mission of BN Media is to serve the vast online market for spirituality and inspiration, bringing audio-visual and written content to the masses while helping people make a difference for their favorite nonprofit organization. BN Media achieves this by bridging the gap through which ordinary activities inspire activism, online giving, and volunteerism.',
            funding_rounds: '0',
            funding_total_usd: '',
            employee_count: '11-50',
          },
        },
      ],
    },
  },
};
