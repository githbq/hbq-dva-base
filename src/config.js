/**
 * 定义整个项目的全局配置
 */

// 约定优于配置
// 我可以提供尽量多的配置, 但尽量不要太个性化, 接口的路径/名称/格式之类的
// 遵循统一的规范, 好维护, 交给其他人也比较简单
let config = {
    prefix: '',
    logoText: '太空平台', // 项目的名字
    logoSrc: 'assets/logo.png',
    favicon: 'assets/favicon.ico', // 设置网页的favicon, 可以是外链, 也可以是本地
    footer: '<a target="_blank" href="http://58.com">58</a>版权所有 © 2017-2099', // footer中显示的字, 可以嵌入html标签 
    debug: false, // 是否开启debug模式 
    logLevel: 'info', // 日志级别, 目前支持debug/info/warn/error 4种级别 
    needLogin: false, //需要登录  
};
module.exports = config;