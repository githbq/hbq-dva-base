const { apiUrl } = require('./globalConfig');
const color = require('cli-color');
const { __DEV__ } = require('./constants');
const apiPrefix = '__api__'
const staticPrefix = '__static__'
if (apiUrl && __DEV__) {
    console.log(color.yellow(`\n######################proxy to apiUrl:${apiUrl}######################\n`));
    module.exports = {
        '/socket.io/': {
            changeOrigin: true,
            // 目标机器 IP
            target: apiUrl,
        },
        // URL 匹配规则
        [`/${apiPrefix}/`]: {
            changeOrigin: true,
            // 目标机器 IP
            target: apiUrl,
            // URL 重写
            pathRewrite: {
                [`^/${apiPrefix}`]: ''
            }
            // 是否使用 Https
            // secure: false
        },
        [`/${staticPrefix}/`]: {
            changeOrigin: true,
            // 目标机器 IP
            target: apiUrl,
            // URL 重写
            pathRewrite: {
                [`^/${staticPrefix}`]: ''
            },
            // 是否使用 Https
            // secure: false
        }
    };
} else {
    module.exports = {};
}