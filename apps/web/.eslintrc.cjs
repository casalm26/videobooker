module.exports = {
  extends: ['next/core-web-vitals', '../../.eslintrc.cjs'],
  settings: {
    next: {
      rootDir: ['apps/web'],
    },
  },
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
  },
};
