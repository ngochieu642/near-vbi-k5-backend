import { EnvironmentConfigLoader } from './EnvironmentConfigLoader';
import { DefaultConfigLoader } from './DefaultConfigLoader';
import { Logger } from '@nestjs/common';

/**
 * Default < Env < Config Service
 */
export class SystemConfig {
  private static logger = new Logger(SystemConfig.name);

  static getMongoConnectionString(): string {
    const result = EnvironmentConfigLoader.getMongoConnectionString() || DefaultConfigLoader.getMongoConnectionString();
    SystemConfig.logger.debug('Connection string: ' + result);
    return result;
  }
}
