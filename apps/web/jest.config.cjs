const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@videobooker/shared/(.*)$': '<rootDir>/../../packages/shared/src/$1',
    '^@videobooker/ui/(.*)$': '<rootDir>/../../packages/ui/src/$1',
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
};

module.exports = createJestConfig(customJestConfig);
