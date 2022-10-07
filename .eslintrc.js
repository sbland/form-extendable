module.exports = {
  extends: ['@teambit/eslint-config-bit-react'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    "@typescript-eslint/indent": ['off'],
  },
};
