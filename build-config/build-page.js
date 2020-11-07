const Webpack = require('webpack');

module.exports = function (config) {
  // 编译文件解析
  const compiler = Webpack(config);

  // 启动编译
  compiler.run((err, stats) => {
    if (err) throw err;
    // 打印结果输出到控制台
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
