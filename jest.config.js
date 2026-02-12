module.exports = {
    testEnvironment: "node",
    transform: {
        "\\.[jt]sx?$": "babel-jest"
    },
    moduleFileExtensions: ["js", "jsx"],
    moduleDirectories: ['node_modules', '<rootDir>'],
    transformIgnorePatterns: ['node_modules/(?!@nanoid)'],
    moduleNameMapper: {
        '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js'
    }
};