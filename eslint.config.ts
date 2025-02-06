import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVitest from '@vitest/eslint-plugin';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pluginCypress from 'eslint-plugin-cypress'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },
  {
    ...pluginCypress.configs.recommended,
    files: [
      'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
      'cypress/support/**/*.{js,ts,jsx,tsx}',
    ],
  },
  skipFormatting,
  {
    rules: {
      'prettier/prettier': 'warn',
      'comma-dangle': [1, 'only-multiline'],
      'space-before-function-paren': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off',
      eqeqeq: 'error',
      quotes: [2, 'single', { avoidEscape: true }],
      'vue/no-v-html': 'warn',
      'vue/html-self-closing': [
        'warn',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
      'vue/singleline-html-element-content-newline': 'off',
      'no-case-declarations': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      'vue/no-use-v-if-with-v-for': 'warn',
      'vue/html-indent': [
        'error',
        2,
        {
          attribute: 1,
          baseIndent: 1,
          closeBracket: 0,
          alignAttributesVertically: false, // Changed to false - consider carefully
          ignores: ['VAttribute'],
        },
      ],
      // Add more specific TypeScript rules as needed:
      // '@typescript-eslint/explicit-function-return-type': 'warn', // Example
      // '@typescript-eslint/no-explicit-any': 'warn', // Example
    },
  }
);
