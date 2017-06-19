/**
 * 用例   <Route path="syslog" getComponent={lazyload(System.import('@/pages/SysLog'))} />
 */
export default (importor) => {
    return (location, cb) => {
        importor.then((module) => {
                //如果是默认模块，则是 module.default
                cb(null, module);
            })
            .catch((err) => {
                console.error(`动态路由加载失败：${err}`)
            });
    }
};