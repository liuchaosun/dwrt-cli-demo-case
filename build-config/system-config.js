/**
 * 系统配置
 * 可以在 dwrt-cli-config.js 文件中进行相应的覆盖重写
 */

const fs = require('fs');
const path = require('path');

// 路径补足，加 ./ 强制路径变为相对路径
function addPath(name) {
  return path.resolve(ROOT_PATH, './' + name);
}

// 根目录
const ROOT_PATH = path.resolve(__dirname, '../');
// 自定义配置文件位置
const configFile = addPath('dwrt-cli-config.js');
let DwrtCliConf = null;
try {
  // 使用同步的方式检查配置文件是否可读，如果可读从中读取出配置
  fs.accessSync(configFile, fs.constants.F_OK | fs.constants.R_OK);
  DwrtCliConf = require(configFile);
} catch (err) {
  // 不可读则设置为默认
  DwrtCliConf = {};
}

let {
  // 项目主要代码目录
  APP_PATH_NAME = 'src',
  // 编译后的文件目录
  BUILD_PATH_NAME = 'build',
  // html 模板目录
  TEMPLATE_PATH_NAME = 'temlate',
  // 三方资源目录
  TRIPARITE_PATH_NAME = 'lib',
  analysisBuildAssets = false,
  bundleDllReact = false,
  bundleDllFolder = 'reactdll',
  bundleDllLibName = 'react_family_bucket',
} = DwrtCliConf;

const APP_PATH = addPath(APP_PATH_NAME);
const BUILD_PATH = addPath(BUILD_PATH_NAME);
const TEMPLATE_PATH = addPath(TEMPLATE_PATH_NAME);
const TRIPARITE_PATH = addPath(TRIPARITE_PATH_NAME);

// 开启 dll 模式就要关闭分析模式
if (bundleDllReact) {
  analysisBuildAssets = false;
}

// 读取项目 package.json 中的名称和版本
const { name: APP_NAME, version: APP_VERSION } = require(addPath('package.json'));

module.exports = {
  BUILD_PATH,
  BUILD_PATH_NAME,
  APP_PATH,
  APP_PATH_NAME,
  TEMPLATE_PATH,
  TEMPLATE_PATH_NAME,
  TRIPARITE_PATH,
  TRIPARITE_PATH_NAME,

  JS_PATH: 'static/js/',
  CSS_PATH: 'static/css/',
  IMG_PATH: 'static/img/',
  FONT_PATH: 'static/font/',

  SITE_INFO: {
    APP_NAME,
    APP_VERSION,
  },
  // 是否开启编译分析模式
  analysisBuildAssets,

  // 是否合并 react 所有资源
  bundleDllReact,
  bundleDllFolder,
  bundleDllLibName,
};
