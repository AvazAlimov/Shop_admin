module.exports = {
    root: true,
    parserOptions: {
        sourceType: "module"
    },
    env: {
        browser: true
    },
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    extends: ["standard", "plugin:vue/essential"],
    // required to lint *.vue files
    plugins: ["vue"],
    // add your custom rules here
    rules: {
        // allow async-await
        "generator-star-spacing": "off",
        // allow debugger during development
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        indent: ["error", 4]
    }
};
