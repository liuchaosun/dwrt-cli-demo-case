/**
 * 开启文件编译
 */
// 1
const pageConf = require('./module-config');
// 2
const WebpackProdConfFunc = require('../../build-config/webpack.prod.config');
// 3
const BuildPageFunc = require('../../build-config/build-page');

BuildPageFunc(WebpackProdConfFunc(pageConf));
