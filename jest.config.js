/** @type {import('jest').Config} */
const config = {
    collectCoverage: false,
    collectCoverageFrom: ['src/**/*.{js,jsx}', '!**/node_modules/**'],
    coverageDirectory: 'tests/coverage',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setup-tests.js'],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
        ".+\\.(css|scss|png|jpg|svg)$": "jest-transform-stub"
    },
    moduleFileExtensions: ['js', 'jsx'],
    moduleNameMapper: {
        '^.+\\.svg$': 'jest-svg-transformer',
        '^.+\\.css$': 'identity-obj-proxy',
    },
};

export default config;