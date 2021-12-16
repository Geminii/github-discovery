module.exports = {
  env: {
    amd: true,
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:tailwindcss/recommended'
  ],
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          {
            allowExpressions: true
          }
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'error'
      }
    },
    {
      files: ['*.vue'],
      rules: {
        indent: 'off'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 2021 // Allows for the parsing of modern ECMAScript features
  },
  root: true,
  rules: {
    '@typescript-eslint/array-type': [
      'error',
      {
        array: true
      }
    ],
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/default-param-last': ['error'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/keyword-spacing': 'error',
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true
      }
    ],
    '@typescript-eslint/no-inferrable-types': [
      'error',
      {
        ignoreParameters: true,
        ignoreProperties: true
      }
    ],
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/prefer-enum-initializers': ['error'],
    '@typescript-eslint/quotes': ['error', 'single'],
    '@typescript-eslint/semi': 'error',
    '@typescript-eslint/type-annotation-spacing': ['error'],
    '@typescript-eslint/typedef': [
      'error',
      {
        arrowParameter: false
      }
    ],
    'arrow-parens': 'error',
    'block-spacing': 'error',
    'comma-dangle': 'off',
    'eol-last': 'error',
    eqeqeq: 'error',
    indent: [
      'error',
      2,
      {
        SwitchCase: 1
      }
    ],
    'no-console': 'error',
    'no-trailing-spaces': 'error',
    'no-useless-concat': 'error',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        next: 'return',
        prev: '*'
      }
    ],
    'quote-props': ['error', 'as-needed'],

    // Tailwindcss
    'tailwindcss/no-custom-classname': 'off',

    'vue/attributes-order': [
      'error',
      {
        alphabetical: false,
        order: [
          'SLOT',
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          'UNIQUE',
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT'
        ]
      }
    ],
    'vue/block-spacing': 'error',
    'vue/block-tag-newline': 'error',
    'vue/comma-dangle': ['error', 'always-multiline'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/custom-event-name-casing': ['error', 'kebab-case'],
    'vue/eqeqeq': 'error',
    'vue/html-button-has-type': 'error',
    'vue/keyword-spacing': 'error',
    'vue/max-len': [
      'error',
      {
        code: 120,
        ignoreTemplateLiterals: true,
        tabWidth: 2,
        template: 300
      }
    ],
    'vue/no-boolean-default': ['error', 'default-false'],
    'vue/no-empty-component-block': 'error',
    'vue/no-potential-component-option-typo': [
      'error',
      {
        presets: ['vue'] // Add vue-router if we use it
      }
    ],
    'vue/no-reserved-component-names': [
      'error',
      {
        disallowVue3BuiltInComponents: true
      }
    ],
    'vue/no-static-inline-styles': [
      'error',
      {
        allowBinding: true
      }
    ],
    'vue/no-unused-properties': ['error'],
    'vue/no-unused-refs': ['error'],
    'vue/no-useless-concat': 'error',
    'vue/no-useless-mustaches': 'error',
    'vue/no-useless-v-bind': ['error'],
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/padding-line-between-blocks': ['error'],
    'vue/script-indent': [
      'error',
      2,
      {
        baseIndent: 1,
        switchCase: 1
      }
    ],
    'vue/sort-keys': ['error'],
    'vue/v-on-event-hyphenation': 'error',
    'vue/v-on-function-call': 'error'
  }
};
