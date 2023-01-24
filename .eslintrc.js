/* eslint-env es6 */
const OFF = 0;
const WARN = 1;
const ERROR = 2;

/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["@remix-run/eslint-config", "@remix-run/eslint-config/node"],
  rules: {
    "prefer-let/prefer-let": OFF,
    "prefer-const": WARN,

    "import/order": [
      ERROR,
      {
        groups: ["builtin", "external", "internal", "parent", "sibling"],
        "newlines-between": "always",
      },
    ],
  },
};
