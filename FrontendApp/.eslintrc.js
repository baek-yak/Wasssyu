module.exports = {
  root: true,
  extends: ['@react-native', 'eslint:recommended', 'prettier'],
  rules: {
    'no-var': 'error',
    'no-multiple-empty-lines': 'error',
    'no-console': ['error', {allow: ['warn', 'error', 'info']}],
    eqeqeq: 'error',
    'dot-notation': 'error',
    'no-unused-vars': 'error',
  },
};