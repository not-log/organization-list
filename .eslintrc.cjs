/* eslint-env node */
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["react-refresh", "prettier", "@typescript-eslint", "simple-import-sort"],
  ignorePatterns: ["dist"],
  parser: "@typescript-eslint/parser",
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "react/react-in-jsx-scope": 0,
    "react/prop-types": 0,
    "no-console": "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [["^react"], ["^@?\\w"], ["^\\."], ["^@?(.scss|.css)"]],
      },
    ],
    "simple-import-sort/exports": "error",
    "prettier/prettier": [
      "error",
      {},
      {
        usePrettierrc: true,
      },
    ],
  },
};
