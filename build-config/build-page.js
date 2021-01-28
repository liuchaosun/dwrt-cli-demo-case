const Webpack = require('webpack');

/**
 * 编译文件解析
 * 启动编译
 * 打印结果输出到控制台
 * @param {*} config
 */
module.exports = function (config) {
  const compiler = Webpack(config);

  compiler.run((err, stats) => {
    if (err) throw err;
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
        depth: false,
      }) + '\n\n'
    );
  });
};
