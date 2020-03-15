export interface Config {
  elasticsearch: {
    url: string;
  };
  express: {
    port: number;
  };
  googleMaps: {
    apiKey: string;
  };
  redis: {
    url: string;
  };
}
