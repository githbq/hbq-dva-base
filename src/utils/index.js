import menu from './menu'
import Cookie from './cookie'
import request from './request'
import { color } from './theme'
import config from '@/config'
import lazyload from './lazyload'

//缓存 localStorage.getItem('allPathPowers') 数据
let allPathPowers

// 连字符转驼峰
String.prototype.hyphenToHump = function() {
    return this.replace(/-(\w)/g, function() {
        return arguments[1].toUpperCase()
    })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function() {
    return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function(format) {
    var o = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'H+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        'S': this.getMilliseconds()
    }
    if (/(y+)/.test(format)) { format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length)) }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ?
                o[k] :
                ('00' + o[k]).substr(('' + o[k]).length))
        }
    }
    return format
}

function equalSet(a, b) {
    const as = new Set(a)
    const bs = new Set(b)
    if (as.size !== bs.size) return false
    for (var a of as)
        if (!bs.has(a)) return false
    return true
}

const isLogin = () => {
    if (config.needLogin) {
        return Cookie.get('user_session') && Cookie.get('user_session') > new Date().getTime()
    } else {
        return true
    }
}

const userName = Cookie.get('user_name')

const setLoginIn = (userName, accessToken, power, allPathPowers) => {
    const now = new Date()
    now.setDate(now.getDate() + 1)
    Cookie.set('user_session', now.getTime())
    Cookie.set('user_name', userName)
    Cookie.set('access_token', accessToken)
    Cookie.set('user_power', power)
    localStorage.setItem('allPathPowers', JSON.stringify(allPathPowers))
    allPathPowers = allPathPowers
}

const setLoginOut = () => {
    Cookie.remove('user_session')
    Cookie.remove('user_name')
    Cookie.remove('access_token')
    Cookie.remove('user_power')
    localStorage.removeItem('allPathPowers')
    allPathPowers = null
}

const checkPower = (optionId, curPowers = []) => {
    if (config.needLogin) {
        return curPowers.some(cur => cur === optionId)
    } else {
        return true;
    }
}

const getCurPowers = (curPath) => {
    if (!config.needLogin) {
        return true
    }
    if (!allPathPowers) {
        allPathPowers = JSON.parse(localStorage.getItem('allPathPowers'))
    }
    const curPathPower = allPathPowers && allPathPowers[curPath]
        //cur =2 检测查看页面内容权限
    if (!curPathPower || !curPathPower.find(cur => cur === 2)) {
        return false
    }
    return curPathPower //返回curPathPower，是为方便页面跳转验证权限后，dispatch当然权限
}

export default {
    lazyload,
    request,
    Cookie,
    menu,
    equalSet,
    isLogin,
    userName,
    setLoginIn,
    setLoginOut,
    checkPower,
    getCurPowers,

}