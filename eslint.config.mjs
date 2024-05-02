import pluginJs from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: pluginReactConfig.languageOptions,
    plugins: {
      react: reactPlugin,
    },
    rules: {
      ...pluginReactConfig.rules,
      'react/no-string-refs': 0,
      'react/display-name': 0,
      'react/no-direct-mutation-state': 0,
      'react/prop-types': 0,
      'react/jsx-no-undef': 0,
      'react/jsx-uses-react': 0,
      'react/jsx-uses-vars': 0,
      'react/no-danger-with-children': 0,
      'react/require-render-return': 0,
      'react/react-in-jsx-scope': 0,
    },
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
