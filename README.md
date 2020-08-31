# dwrt-cli-demo-case

本项目是基于脚手架构建工具 dwrt-cli 创建而来，这是一个最终生成的项目案例。

## 注意事项

1. 谨慎使用 redux-logger

由于 redux-logger 官方提供的编译后的包仍然存在 ie 浏览器不兼容的语法，需要额外引入 polyfill 支持。
