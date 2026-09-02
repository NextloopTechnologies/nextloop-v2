module.exports = {
  '*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix'],
  '**/*.ts?(x)': () => 'npm run build-types',
  '*.{json,md,css,scss,html,yml,yaml}': ['prettier --write'],
};
