import antfu from '@antfu/eslint-config'

const ignores = [
  '.nuxt',
  '**/.nuxt/**',
  '.output',
  '**/.output/**',
  'node_modules',
  '**/node_modules/**',
  'public',
  '**/public/**'
]

export default antfu({
  ignores,
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false // ← Добавьте это для отключения точек с запятой
  },
  vue: true,
  jsonc: false,
  yaml: false,
  rules: {
    'no-console': [
      'error',
      {
        allow: ['info', 'warn', 'trace', 'error', 'group', 'groupEnd']
      }
    ],
    'style/comma-dangle': 'off',
    curly: ['error', 'all'],
    'node/prefer-global/process': ['error', 'always'],

    // Добавьте эти правила для Vue
    'vue/html-self-closing': 'off', // ← Отключаем проверку самозакрывающихся тегов
    'style/semi': 'off', // ← Дополнительное отключение точек с запятой
    'style/quotes': ['error', 'single']
  }
})
