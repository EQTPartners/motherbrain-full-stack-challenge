export const MOCK_FUNDING_ROUNDS_SEARCH_QUERY = {
  index: 'funding',
  body: {
    query: {
      bool: {
        must: [
          { term: { country: 'US' } },
          { wildcard: { investor_names: { value: '*EQT*' } } },
          { term: { investment_type: 'series_a' } },
          { range: { announced_on: { gte: '2020-01-01', lt: '2020-03-01' } } },
        ],
        must_not: [{ term: { investor_names: '{}' } }],
        should: [
          {
            wildcard: {
              investor_names: { value: 'series_*', boost: 1, rewrite: 'constant_score' },
            },
          },
          { match: { investment_type: 'seed' } },
        ],
        minimum_should_match: 1,
      },
    },
  },
  size: 10,
};
