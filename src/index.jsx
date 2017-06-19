// import "babel-polyfill" // 如果需要支持ie 9+，请解注此行即可
import dva from 'dva'
import { createLogger } from 'redux-logger';
import { useRouterHistory, hashHistory } from 'dva/router';
import { createHashHistory } from 'history';
import createLoading from 'dva-loading'
import { message } from 'antd'
import router from './router'
//message 全局配置
message.config({
  top: 50
})
//初始化
const app = dva({
  history: useRouterHistory(createHashHistory)({ queryKey: false }),//去掉_k随机数 || hashHistory
  onAction: [createLogger()],//redux中间件
  onError(error) {
    console.error("app onError -- ", error)
  }
})

//插件
app.use(createLoading())

//路由
app.router(router)
//Start
app.start('#root')
