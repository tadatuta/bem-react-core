module.exports = {
    testPathIgnorePatterns : ['node_modules'],
    moduleFileExtensions : ['ts', 'tsx', 'js'],
    setupFiles: [
        './jestSetup.js'
    ],
    transform : {
        '^.+\\.(ts|tsx)$' : 'ts-jest'
    },
    testMatch : [
        '**/test/*.+(ts|tsx)',
        '**/test/*.+(ts|tsx)'
    ]
};
