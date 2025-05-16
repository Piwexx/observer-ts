import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended, // Reglas recomendadas para JS
  ...tseslint.configs.recommended, // Reglas recomendadas para TypeScript
  {
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      prettier,
      'simple-import-sort': simpleImportSort, // Cargar el plugin correctamente
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'no-console': 'error',
      'prettier/prettier': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^@?\\w'],
            ['^@/'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.s?css$'],
            ['^'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
  },
];
