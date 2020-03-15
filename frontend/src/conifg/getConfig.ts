import { Config } from '../types';

export const getConfig = (): Config => {
  return {
    api: {
      url: 'http://localhost:8080',
    },
    mapbox: {
      apiToken:
        'pk.eyJ1IjoiYWxleHBhdG93IiwiYSI6ImNpZnExMHhhNTZwOHRzNmtxdTVkMnk0azcifQ.lwyfSEFN3WF2rNiRqsLL9A',
    },
  };
};
