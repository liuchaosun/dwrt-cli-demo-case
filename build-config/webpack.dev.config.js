/**
 * webpack 开发环境配置
 */
process.env.NODE_ENV = 'development';

const webpack = require('webpack');

const { merge } = require('webpack-merge');
// 优化二次构建速度, 开启缓存
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

// webpack 基础配置
const BaseWebpackConfFunc = require('./webpack.base.config');

module.exports = function ({ publicPathName, defineVariable, htmlArray, entries }) {
  // 基础配置
  let baseConfig = BaseWebpackConfFunc({ htmlArray, defineVariable, publicPathName });

  // @HMR 开启热重载的关键: 标记哪个模块需要进行热重载
  // exp: myIndex: ['xxx/entries/index/index','webpack-hot-middleware/client?reload=true']
  Object.keys(entries).forEach((entryName) => {
    entries[entryName] = [entries[entryName], 'webpack-hot-middleware/client?reload=true'];
  });

  // 开发环境配置
  let devConfig = {
    // 指定入口
    entry: entries,
    output: {
      filename: '[name].js',
    },
    // 开发环境开启 source-map, eval 模式 rebuild 速度快
    devtool: 'cheap-module-eval-source-map',

    // 开发环境开启 eslint
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(j|t)sx?$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            emitError: false,
            emitWarning: true,
          },
        },
      ],
    },

    plugins: [
      // Occurence ensures consistent build hashes
      new webpack.optimize.OccurrenceOrderPlugin(),
      //  hot module replacement is somewhat self-explanatory
      new webpack.HotModuleReplacementPlugin(),

      // 使用编译缓存
      new HardSourceWebpackPlugin(),
    ],
  };

  return merge(baseConfig, devConfig);
};
