/**
 * 启动函数 createServer
 * 开发环境配置生成函数 WebpackDevConfFunc
 * 传递的参数 pageConf
 */
// 1
const pageConf = require('./module-config');
// 2
const WebpackDevConfFunc = require('../../build-config/webpack.dev.config');
// 3
const CreateServer = require('../../build-config/create-server');

CreateServer(8080, WebpackDevConfFunc(pageConf));
