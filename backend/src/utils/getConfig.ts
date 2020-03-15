import { Config } from '../types';

export const getConfig = (): Config => {
  if (
    process.env.ES_URL == null ||
    process.env.GOOGLE_MAPS_API_KEY == null ||
    process.env.REDIS_URL == null
  ) {
    throw new Error('missing required environment variables.');
  }

  return {
    elasticsearch: {
      url: process.env.ES_URL,
    },
    express: {
      port: 8080,
    },
    googleMaps: {
      apiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
    redis: {
      url: process.env.REDIS_URL,
    },
  };
};
