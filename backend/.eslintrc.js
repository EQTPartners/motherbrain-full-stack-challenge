module.exports = {
  extends: ['plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: './',
    // TODO: we need this because of an issue with @typescript-eslint/parser: https://github.com/typescript-eslint/typescript-eslint/issues/864
    createDefaultProgram: true,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/explicit-member-accessibility': ['error'],
    'import/prefer-default-export': 'off',
    'prettier/prettier': ['error'],
  },
};
