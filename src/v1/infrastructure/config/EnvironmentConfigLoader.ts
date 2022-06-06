export class EnvironmentConfigLoader {
  static getMongoConnectionString(): string {
    return process.env.MONDB_CONNECTION_STRING;
  }
}
