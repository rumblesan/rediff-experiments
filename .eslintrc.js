module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["eslint:recommended" "prettier"],
  parserOptions: {
    ecmaVersion: 2017,
  },
  rules: {
    indent: [2, 2, { SwitchCase: 1, VariableDeclarator: 1 }],
    linebreak-style: ["error", "unix"],
    quotes: ["error", "single"],
    semi: ["error", "always"],
  }
};
