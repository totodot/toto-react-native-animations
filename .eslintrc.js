module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['airbnb', 'plugin:@typescript-eslint/recommended', 'prettier', 'prettier/react'],
  plugins: ['@typescript-eslint', 'prettier'],
  settings: {
    'import/resolver': {
      'babel-module': {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.ios.js', '.android.js'],
      },
    },
  },
  rules: {
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '@/**',
            group: 'parent',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    'import/imports-first': ['error'],
    'import/prefer-default-export': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'prettier/prettier': 'error',
    'no-param-reassign': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-unused-vars': ['error'],
  },
  overrides: [
    {
      files: ['**/*.{tsx,ts}'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
  globals: {
    __DEV__: true,
    window: true,
  },
};
