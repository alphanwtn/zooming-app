// eslint-disable-next-line import/extensions
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/out/**',
    '!**/coverage/**',
    '!**/robots.js',
    '!**/sitemap.js',
    '!**/config/**',
    '!**/jest.config.js',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  testMatch: ['**/*.test.js', '**/*.test.jsx'],
  testPathIgnorePatterns: [
    '<rootDir>/jest.config.js',
    '<rootDir>/coverage',
    '<rootDir>/src/config',
    '<rootDir>/src/app/robots.js',
    '<rootDir>/src/app/sitemap.js',
  ],
  coverageThreshold: {
    global: {
      statements: 65,
      branches: 65,
      functions: 65,
      lines: 65,
    },
  },
};

export default createJestConfig(config);
