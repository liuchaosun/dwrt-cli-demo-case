/**
 * eslint 配置
 */
module.exports = {
  // 执行环境
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  // 指定解析器为 ts 解析器
  parser: '@typescript-eslint/parser',
  // 解析器配置
  parserOptions: {
    ecmaVersion: 6,
    // 源码类型，默认 script ，模块化的需要配置为 module
    sourceType: 'module',
    // 想使用的额外的语言特性
    ecmaFeatures: {
      jsx: true, // 启用 JSX
      modules: true,
      experimentalObjectRestSpread: true,
    },
  },
  // 插件， 接入插件后可开启规则，也可以在 rule 中定义覆盖插件内的规则
  plugins: ['react', '@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  // 插件设置
  settings: {
    react: {
      version: 'detect',
    },
  },
  // 全局变量
  globals: {
    SITE_INFO: 'readonly',
    API_VERSION: 'readonly',
    PUBLIC_PATH: 'readonly',
    __DEVELOPMENT__: 'readonly',
  },
  // 自定义eslint规则 0-off 1-warn 2-error
  rules: {
    // 必须使用 ===
    eqeqeq: [2, 'always'],
    // 不允许和空值做比较
    'no-eq-null': 2,
    //  debugger 警告
    'no-debugger': 1,
    'no-console': 1,
    // 对象，换行后字段末尾自动加逗号
    'comma-dangle': [2, 'only-multiline'],
    'prettier/prettier': 2,
  },
};
