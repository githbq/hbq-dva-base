//power = { 1: "查看菜单", 2: "查看详情", 3: "新增", 4: "修改", 5: "删除", 6: "审核", 7: "上传" }
//options = { MENU: "查看菜单", DETAIL: "查看详情", ADD: "新增", UPDATE: "修改", DELETE: "删除", CHECK: "审核", UPLOAD: "上传" }
import _ from 'lodash'
const menu = [{
        id: _.uniqueId(),
        key: 'dashboard',
        icon: 'smile-o',
        name: '欢迎',
        power: [1]
    },
    {
        id: _.uniqueId(),
        key: 'assign',
        icon: 'smile-o',
        name: '报名',
        power: [1]
    },
    {
        id: _.uniqueId(),
        key: 'game',
        icon: 'smile-o',
        name: '赛程管理',
        power: [1]
    }
]
export default menu