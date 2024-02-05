// eslint-disable-next-line import/extensions
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  testMatch: ['**/*.js', '**/*.jsx'],
  testPathIgnorePatterns: [
    '<rootDir>/jest.config.js',
    '<rootDir>/coverage',
    '<rootDir>/src/config/',
    '<rootDir>/src/app/robots.js',
    '<rootDir>/src/app/sitemap.js',
  ],
};

export default createJestConfig(config);
