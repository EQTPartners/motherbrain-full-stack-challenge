export const MOCK_AGGREGATED_SEARCH_QUERY = {
  body: {
    aggs: {
      investor_names: { terms: { field: 'investor_names', order: { _count: 'desc' }, size: 10 } },
    },
    query: {
      bool: {
        minimum_should_match: 1,
        must_not: [{ term: { investor_names: '{}' } }],
        should: [
          {
            wildcard: {
              investor_names: { boost: 1, rewrite: 'constant_score', value: 'series_*' },
            },
          },
          { match: { investment_type: 'seed' } },
        ],
      },
    },
  },
  index: 'funding',
  size: 0,
};
