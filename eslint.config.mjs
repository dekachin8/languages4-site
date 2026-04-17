// eslint.config.mjs - Flat config for ESLint 9.x
// Covers: core ESLint recommended, TypeScript, Astro components, a11y hints
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';

export default tseslint.config(
  // Ignore build output and vendored code
  {
    ignores: [
      'dist/**',
      '.astro/**',
      'node_modules/**',
      'public/pagefind/**',
      '**/*.min.js',
    ],
  },

  // Core JS + TS recommended
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // Astro components
  ...astro.configs.recommended,

  // Global settings + project-wide rule adjustments
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    rules: {
      // TypeScript already flags these via `astro check`; avoid double-reporting.
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // `any` is used pragmatically for inline scripts / dynamic window props.
      // Flagged as warning rather than error so it shows up for review but doesn't block.
      '@typescript-eslint/no-explicit-any': 'warn',

      // Empty catches are occasionally intentional (swallow analytics errors);
      // require at least a comment if left empty.
      'no-empty': ['warn', { allowEmptyCatch: false }],

      // Adopt some jsx-a11y rules manually rather than pulling full `recommended`
      // (which is too aggressive for Astro's mixed JSX/HTML syntax).
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-role': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
    },
  },

  // Config files run in Node, use Node globals only
  {
    files: ['*.config.{js,mjs,ts}', 'scripts/**/*.{js,mjs,ts}'],
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      // Tailwind and other tooling configs traditionally use require()
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
);
