// 开发环境需要被代理的路由列表
// 代理前：http://localhost:8080/user/login
// 代理后：http://www.exmple.com/user/login
const proxyTables = [
  {
    url: '/user/login',
    options: 'http://www.exmple.com',
  },
];

/**
 * 致敬 vue-cli 的 vue.config.js
 * 与之类似的你可以在此文件中进行一次自定义覆盖行为
 * 目前支持的配置较少 0.0
 */
module.exports = {
  // 是否进行编译资源分析检测
  analysisBuildAssets: false,
  // 是否将 React 相关资源整合打包
  bundleDllReact: false,
  proxyTables,
};
