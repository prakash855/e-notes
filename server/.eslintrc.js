// filepath: /Users/prakashagrahari/Desktop/workspace/e-notes/server/.eslintrc.js
export const env = {
  node: true,
  es2021: true,
};

export const eslintExtends = ["eslint:recommended"];

export const parserOptions = {
  ecmaVersion: 12,
};

export const languageOptions = {
  globals: {
    process: "readonly",
  },
};
