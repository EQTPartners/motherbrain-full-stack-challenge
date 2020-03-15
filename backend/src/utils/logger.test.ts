import { logger } from './logger';

describe('logger', () => {
  it('should provide a logger', () => {
    expect(logger.error).toBeDefined();
    expect(logger.info).toBeDefined();
  });
});
