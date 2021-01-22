/**
 * postcss 提供预处理 css 功能，需要依赖插件配置， 也可以添加自定义的插件
 * postcss-loader 只是一个连通 webpack 和各插件之间的管道
 * 需要提供浏览器 browserlist 配置， 基于配置进行浏览器前缀补足
 * !!! 禁止使用 precss 这个插件， 使用后会导致 webpack 的 alias 在 background:url() 获取图片时找不到正确路径
 */
module.exports = {
  plugins: {
    tailwindcss: {},
    // 前缀补全,自动添加浏览器厂商前缀
    autoprefixer: {},
    // 优化 css--合并多余 css
    cssnano: {},
  },
};
