// 使用 path 模块将路径的表现形式统一
const path = require('path');
const webpack = require('webpack');
// 拷贝文件到编译目录下
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 动态生成 html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 抽取 css https://github.com/webpack-contrib/mini-css-extract-plugin#getting-started
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 优化构建日志插件,显示编译结果, 与 stats 配合使用，不打印额外的编译内容，只显示错误或者编译结果
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const {
  APP_PATH,
  BUILD_PATH,
  TEMPLATE_PATH,
  TRIPARITE_PATH,
  TRIPARITE_PATH_NAME,
  IMG_PATH,
  FONT_PATH,
  SITE_INFO,
} = require('./system-config');

module.exports = function ({ htmlArray, defineVariable, publicPathName }) {
  // 动态生成 html 的插件配置
  const autoHtml = htmlArray.map(
    (config) =>
      new HtmlWebpackPlugin({
        // @1: 基于此模板生成新 html
        template: path.resolve(TEMPLATE_PATH, config._templateFileName),
        // @2：生成的新 html 名字
        filename: config._fileName,
        // @3: 生成的新 html 的 title
        title: config._title,
        // @4：生成的新的 html 中在指定的标签内引入其他 script
        inject: 'body',
        // @5: 生成的新的 html 中需要引入的 js/css 模块
        chunks: (function () {
          let chunks = [];
          if (config._needMoreChunks) {
            chunks = ['manifest', 'vendors', 'common'];
          }
          return chunks.concat(config._chunks);
        })(),
        // @6: 压缩设置
        minify: {
          html5: true,
          minifyJS: true,
          minifyCSS: true,
          // 是否删除注释
          removeComments: false,
          // 收起成一行：是否折叠空行
          collapseWhitespace: true,
          // 收起成一行：是否保留换行
          preserveLineBreaks: false,
        },
        //如果使用 webpack4 将该配置项设置为'none'
        chunksSortMode: 'none',
        // 自定义参数
        BASE_URL: publicPathName,
      })
  );

  // CSS 相关 loader
  const baseStyleLoader = [
    process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
    'css-loader',
    {
      loader: 'postcss-loader',
      // options: {
      //   postcssOptions: {
      //     // * 可以修改配置文件的查找目录，收敛到当前目录下
      //     config: path.resolve(__dirname, './postcss.config.js'),
      //   },
      // },
    },
  ];

  return {
    // 编译模式， none | development | production
    mode: process.env.NODE_ENV,

    output: {
      // 文件编译后输出的位置
      path: BUILD_PATH,
      // 拼接到 script 标签里的请求前缀, 静态资源统一请求前缀
      publicPath: publicPathName,
    },

    // webpack 对文件和目录的处理
    resolve: {
      // 文件扩展名补充
      extensions: ['.ts', '.tsx', '.js', '.less', '.css'],
      // 自定义路径别名，降低引用复杂度
      alias: {
        '@': APP_PATH,
        '@pages': path.resolve(APP_PATH, './pages'),
        '@store': path.resolve(APP_PATH, './store'),
        '@utils': path.resolve(APP_PATH, './utils'),
        '@images': path.resolve(APP_PATH, './images'),
        '@styles': path.resolve(APP_PATH, './styles'),
        '@components': path.resolve(APP_PATH, './components'),
        // 如果构建时发现外部多个三方库使用了相同的内容并且都打包了，可以在这里指定使用同一个资源，减少打包
        'bn.js': path.resolve(process.cwd(), 'node_modules', 'bn.js'),
      },
    },

    // 优化输出日志, 只打印结果
    stats: 'errors-only',

    // 添加资源插件
    module: {
      rules: [
        {
          test: /\.css$/,
          use: baseStyleLoader,
        },
        {
          test: /\.less$/,
          use: baseStyleLoader.concat([
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  // 开启 less 的 js 替换功能
                  javascriptEnabled: true,
                },
              },
            },
            {
              // 全局 less 变量
              loader: 'style-resources-loader',
              options: {
                patterns: [APP_PATH + '/styles/global-variables.less'],
              },
            },
          ]),
        },
        {
          include: APP_PATH,
          test: /\.(t|j)sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'thread-loader',
              options: {
                workers: 3,
              },
            },
            'babel-loader?cacheDirectory=true',
          ],
        },
        {
          test: /\.(png|gif|svg|jpg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10240,
                // 超出上限后使用的备用加载器--默认file-loader
                fallback: 'file-loader',
                outputPath: IMG_PATH,
                name: '[name].[hash:8].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
          loader: 'file-loader',
          options: {
            outputPath: FONT_PATH,
            name: '[name].[hash:8].[ext]',
          },
        },
      ],
    },
    // 插件
    plugins: [
      // 优化打印日志
      new FriendlyErrorsWebpackPlugin(),
      // 拷贝文件 不编译
      new CopyWebpackPlugin({
        patterns: [
          {
            from: TRIPARITE_PATH,
            to: path.resolve(BUILD_PATH, TRIPARITE_PATH_NAME),
          },
        ],
      }),
      // 全局宏变量
      new webpack.DefinePlugin(
        Object.assign(
          {
            // 项目版本信息
            SITE_INFO: JSON.stringify(SITE_INFO),
            // 统一前缀
            PUBLIC_PATH: JSON.stringify(publicPathName),
            // 是否开发环境
            __DEVELOPMENT__: JSON.stringify(process.env.NODE_ENV === 'development'),
          },
          defineVariable
        )
      ),
    ].concat(autoHtml),
  };
};
