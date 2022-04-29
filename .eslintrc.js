module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'jest',
  ],
  extends: [
    'eslint:recommended',
    'eslint-config-airbnb-base',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
  ],
  rules: {
    "quotes": [
      "error",
      "single",
      {
        "allowTemplateLiterals": true
      }
    ],
    'object-curly-newline': 'off',
    'semi': 'off',
    'max-len': 'off',
    'function-paren-newline': 'off',
    'no-return-await': 'off',
    'indent': 'off',
    'linebreak-style': ['error', 'unix'],
    'no-confusing-arrow': [
      'error',
      { 'allowParens': true, 'onlyOneSimpleParam': true }
    ],
    'operator-linebreak': 'off',
    'implicit-arrow-linebreak': 'off',
    'import/extensions': [
      'error',
      'ignorePackages', {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    'padded-blocks': 'off',
    'arrow-parens': 'off',
    'class-methods-use-this': 'off',
    'func-names': 'off',
    'no-plusplus': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
