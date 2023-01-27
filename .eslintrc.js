module.exports = {
  root: true,
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  rules: {
    'arrow-body-style': ['error'],
  },
  settings: {
    'import/ignore': ['react-native'],
  },
};
