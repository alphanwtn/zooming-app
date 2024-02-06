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
    '!**/layout.jsx',
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
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70,
    },
  },
};

export default createJestConfig(config);
