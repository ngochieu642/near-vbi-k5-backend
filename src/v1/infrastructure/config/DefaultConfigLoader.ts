export class DefaultConfigLoader {
  static getMongoConnectionString(): string {
    return 'mongodb://localhost/test';
  }
}
