import Cookie from 'js-cookie'
export default {
    set(key, value, expire) {
        Cookie.set(key, value, { path: '/', expires: 1 })
    },
    remove(key) {
        Cookie.remove(key, { path: '/' })
    },
    get(key) { Cookie.get(key) },
    getJSON(key) {
        return Cookie.getJSON(key) || {}
    }
}