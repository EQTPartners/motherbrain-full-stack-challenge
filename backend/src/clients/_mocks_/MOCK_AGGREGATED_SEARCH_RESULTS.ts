export const MOCK_AGGREGATED_SEARCH_RESULTS = {
  body: {
    took: 100,
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
      max_score: null,
      hits: [],
    },
    aggregations: {
      investor_names: {
        doc_count_error_upper_bound: 0,
        sum_other_doc_count: 70348,
        buckets: [
          {
            key: '{SOSV}',
            doc_count: 625,
          },
          {
            key: '{"Y Combinator"}',
            doc_count: 584,
          },
          {
            key: '{"New Enterprise Associates"}',
            doc_count: 390,
          },
          {
            key: '{Seedrs}',
            doc_count: 336,
          },
          {
            key: '{"Intel Capital"}',
            doc_count: 329,
          },
          {
            key: '{Accel}',
            doc_count: 323,
          },
          {
            key: '{"Sequoia Capital"}',
            doc_count: 307,
          },
          {
            key: '{"Venture Kick"}',
            doc_count: 229,
          },
          {
            key: '{"Bessemer Venture Partners"}',
            doc_count: 220,
          },
          {
            key: '{"500 Startups"}',
            doc_count: 205,
          },
        ],
      },
    },
  },
};
