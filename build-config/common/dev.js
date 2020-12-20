/**
 * 启动函数 createServer
 * 开发环境配置生成函数 WebpackFunc
 * 传递的参数 pageConf
 */
// 1
const pageConf = require('./module-config');
// 2
const WebpackFunc = require('../webpack.dev.config');
// 3
const CreateServer = require('../create-server');

CreateServer(8080, WebpackFunc(pageConf));
