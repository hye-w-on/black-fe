module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    //--
    // "react/prop-types": "off", //prop-types 설치 안했을 때, prop-types는 주로 JavaScript 기반의 React에서 필요
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-empty-function': 'off', // 빈 함수를 허용
  },
};
