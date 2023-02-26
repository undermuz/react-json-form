module.exports = {
    // preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    roots: ["<rootDir>/src"],
    transform: {
        "^.+\\.(t|j)sx?$": "ts-jest",
        // "^.+\\.jsx?$": "babel-jest",
    },
    transformIgnorePatterns: ["node_modules/(?!(array-move|@undermuz/use-form))"],
    moduleNameMapper: {
        "^@undermuz/use-form$":
            "<rootDir>/node_modules/@undermuz/use-form/dist/index.js",
    },
}
