import { FlatCompat } from '@eslint/eslintrc'
 
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})
 
const eslintConfig = [
  ...compat.config({
    extends: ['next'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unnecessary-type-constraint': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',

      'react-hooks/exhaustive-deps': 'off',
      'react/no-unescaped-entities': 'off',
      'react/jsx-key': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      'prettier/prettier': ['warn', { endOfLine: 'auto' }],
    },
  }),
]
 
export default eslintConfig