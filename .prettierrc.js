module.exports = {
    printWidth: 100,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    trailingComma: "all",
    endOfLine: "auto",
    overrides: [
        {
            files: "*.css",
            options: {
                printWidth: Infinity,
            },
        },
    ],
};
