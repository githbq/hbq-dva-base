const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 向less loader传的值, 用于覆盖less源文件中的变量
// 有个小问题就是这个变量只会初始化一次, 不会随globalConfig的变化而变化
// 所以在webpack-dev-server中调试时, 热加载有点问题, 不能实时更新
const { TEMPLATE_PATH, PUBLIC_PATH, ROOT_PATH, APP_PATH, BUILD_PATH, NODE_ENV, __DEV__ } = require('./constants');
const lessLoaderVars = {

};
const postCSSConfig = JSON.stringify(require('./utils').postCSSConfig);
// 将babel-loader的配置独立出来, 因为webpack的限制: http://stackoverflow.com/questions/33117136/how-to-add-a-query-to-a-webpack-loader-with-multiple-loaders
const babelLoaderConfig = {
    presets: ['latest', 'stage-0', 'react'], // 开启ES6、部分ES7、react特性, preset相当于预置的插件集合
    plugins: [
        ['import', { libraryName: 'antd', style: true }],
        'add-module-exports',
        'transform-runtime'
    ]
};
let rules = [ // 定义各种loader  
    {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)$/,
        use: [{
            loader: 'url-loader',
            options: { limit: 8192, name: 'assets/generates/[hash].[ext]' }
        }]
    },
    {
        test: /\.(js|jsx)$/,
        use: ['source-map-loader'],
        exclude: /(node_modules)/,
        enforce: 'pre'
    },
    ...require('./rulesOfCss')({
        __DEV__,
        lessLoaderVars,
        postCSSConfig
    })
];

if (__DEV__) {
    babelLoaderConfig.plugins.push('dva-hmr')
    rules.push({
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [
            // { loader: 'react-hot-loader' },
            {
                loader: 'babel-loader',
                options: Object.assign(babelLoaderConfig, { cacheDirectory: true })
            }

        ]
    });
} else {
    //生产环境
    babelLoaderConfig.plugins.push('dev-expression')
    rules.push({
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [{
                loader: 'babel-loader',
                options: babelLoaderConfig,
            },
            {
                loader: 'strip-loader',
                options: { strip: ['logger.info', 'logger.debug', 'console.log', 'console.debug'] }
            }
        ]
    });
}
module.exports = rules;