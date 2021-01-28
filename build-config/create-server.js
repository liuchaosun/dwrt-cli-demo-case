/**
 * 开发环境 创建本地服务器方法
 */
// 进程架构
const Express = require('express');
// webpack
const Webpack = require('webpack');
// webpack 服务器中间件
const WebpackDevMiddleware = require('webpack-dev-middleware');
// webpack 热重载
const WebpackHotMiddleware = require('webpack-hot-middleware');
// http 路由中间件
const { createProxyMiddleware } = require('http-proxy-middleware');

const { proxyTables } = require('./system-config');

/**
 * 开发环境生成器
 * @param {*} port
 * @param {*} webpackConfig
 */
module.exports = function (port, webpackConfig) {
  const app = Express();

  // 路由注入
  proxyTables.length > 0 &&
    proxyTables.forEach((item) => {
      let context = item.options;
      if (typeof context === 'string') {
        context = {
          target: context,
          changeOrigin: true,
        };
      }
      app.use(item.url, createProxyMiddleware(context));
    });

  // webpack 编译配置后，加入服务器中间件
  const webpackCompiler = Webpack(webpackConfig);
  app.use(
    WebpackDevMiddleware(webpackCompiler, {
      quiet: true,
      // 控制台打印信息
      stat: {
        colors: true,
        chunks: false,
      },
      hot: true, // 热更新第一步：开启热重载模式
      // 决定 html 文件中的静态资源链接前是否有前缀
      publicPath: webpackConfig.output.publicPath,
    })
  );

  // 热更新第二步： 使用与服务器中间件相同的编译配置启动热重载中间件
  app.use(
    WebpackHotMiddleware(webpackCompiler, {
      log: false,
    })
  );

  // 开发环境优化请求处理
  app.get('/favicon.ico', (req, res) => res.end());
  app.get('/', (req, res) => {
    res.redirect(webpackConfig.output.publicPath + 'index.html');
  });

  // 在目标端口开启服务监听
  app.listen(port, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Your app is running at:  http://localhost:' + port);
  });
};
