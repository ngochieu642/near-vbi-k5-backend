const config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './test',
  testEnvironment: 'node',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testTimeout: 500000,
};

module.exports = config;
