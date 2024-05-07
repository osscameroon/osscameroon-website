import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import js from '@eslint/js';
import tsEslint from 'typescript-eslint';
import eslintJest from 'eslint-plugin-jest';
import eslintSortKeys from 'eslint-plugin-typescript-sort-keys';
import eslintSortKeysFix from 'eslint-plugin-sort-keys-fix';
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys';


const ignores = [
    'build',
    'dist',
    'coverage',
    'node_modules',
    'jest.config.ts',
    '**/*.d.ts',
    '.prettierrc.js',
    'eslint.config.mjs'
];

export default tsEslint.config(
    {
        ignores,
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tsParser,
            parserOptions: {
                project: 'tsconfig.json'
            },
            globals: {
                ...globals.node,
                ...globals.es2021,
                ...globals.commonjs,
                ...globals.jest,
            },
        }
    },
    {
        ...js.configs.recommended,
        ignores,
    },
    ...tsEslint.configs.recommended.map((c) => ({ ...c, ignores })),
    {
        ignores,
        name: 'eslint-override',
        rules: {
            'no-var': 'warn',
            semi: 'warn',
            indent: ['warn', 2, { SwitchCase: 1 }],
            'no-multi-spaces': 'warn',
            'space-in-parens': 'warn',
            'no-multiple-empty-lines': 'warn',
            'prefer-const': 'warn',
            'no-use-before-define': 'error',
            'max-len': [
                'warn',
                120,
                {
                    ignoreComments: true,
                    ignoreStrings: true,
                    ignoreTemplateLiterals: true,
                },
            ],
            'sort-imports': [
                'error',
                {
                    ignoreCase: false,
                    ignoreDeclarationSort: true,
                    ignoreMemberSort: false,
                    memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
                    allowSeparatedGroups: true,
                },
            ],
            'sort-keys': 'error',
            'prefer-destructuring': ['warn'],
            'prefer-template': 'warn',
            'object-shorthand': 'warn',
            'newline-after-var': ['warn', 'always'],
            curly: 'warn',
            'new-cap': 'off',
            'no-console': 'off',
            'no-else-return': 'error',
            'no-eval': 'error',
            'no-mixed-operators': 'off',
            'no-nested-ternary': 'error',
            'no-param-reassign': 'error',
            'no-underscore-dangle': 'off',
            'no-unused-vars': 'off',
            'ods-use-this': 'off',
            'no-async-promise-executor': 'error',
            'no-await-in-loop': 'error',
            'no-promise-executor-return': 'error',
            'require-atomic-updates': 'error',
            'max-nested-callbacks': ['error', 3],
            'no-return-await': 'error',
            'prefer-promise-reject-errors': 'error',
            'padding-line-between-statements': [
                'error',
                {
                    blankLine: 'always',
                    next: 'return',
                    prev: '*',
                },
                {
                    blankLine: 'always',
                    next: '*',
                    prev: 'directive',
                },
                {
                    blankLine: 'any',
                    next: 'directive',
                    prev: 'directive',
                },
                {
                    blankLine: 'always',
                    next: '*',
                    prev: ['case', 'default'],
                },
                {
                    blankLine: 'never',
                    next: 'case',
                    prev: ['case', 'default'],
                },
            ],
        },
    },
    {
        name: 'typescript-eslint-override',
        ignores,
        rules: {
            '@typescript-eslint/ban-types': 'off',
            '@typescript-eslint/camelcase': 'off',
            '@typescript-eslint/class-name-casing': 'off',
            '@typescript-eslint/ban-ts-comment': [
                'warn',
                {
                    'ts-ignore': 'allow-with-description',
                    minimumDescriptionLength: 10,
                },
            ],
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/member-ordering': 'error',
            '@typescript-eslint/prefer-nullish-coalescing': 'error',
            '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
            '@typescript-eslint/prefer-optional-chain': 'warn',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],
            '@typescript-eslint/ban-ts-ignore': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/prefer-ts-expect-error': 'error',
        },
    },
    {
        name: 'jest',
        ignores,
        plugins: {
            jest: eslintJest,
        },
        rules: {
            'jest/prefer-expect-resolves': 'error',
            'jest/prefer-hooks-in-order': 'error',
        },
    },
    {
        name: 'sort-destructure-keys',
        ignores,
        plugins: {
            'sort-destructure-keys': sortDestructureKeys,
        },
        rules: {
            'sort-destructure-keys/sort-destructure-keys': 'error',
        }
    },
    {
        name: 'sort-keys-fix',
        ignores,
        plugins: {
            'sort-keys-fix': eslintSortKeysFix,
        },
        rules: {
            'sort-keys-fix/sort-keys-fix': 'warn',
        },
    },
    {
        name: 'typescript-sort-keys',
        ignores,
        plugins: {
            'typescript-sort-keys': eslintSortKeys,
        },
        rules: eslintSortKeys.configs.recommended.rules,
    },
);
