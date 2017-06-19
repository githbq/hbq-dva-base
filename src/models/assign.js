import { message } from 'antd'
import { routerRedux } from 'dva/router'
import { create, remove, update, query, get } from './assignService'
import { getCurPowers } from '@/utils'

export default {
    namespace: 'assign',
    state: {
        list: [],
        pagination: {
            current: 1,
            pageSize: 10,
            total: null
        }
    },
    effects: {
        * query({ payload }, { select, call, put }) {
            const pathQuery = yield select(({ routing }) => routing.locationBeforeTransitions.query)
            const data = yield call(query, pathQuery)
            if (data && data.success) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data.data,
                        pagination: data.page
                    }
                })
            }
        },
        * delete({ payload }, { call, put }) {
            const data = yield call(remove, { id: payload.id })
            if (data && data.success) {
                yield put({ type: 'query' })
            }
        },
        * create({ payload }, { select, call, put }) {
            const data = yield call(create, payload.curItem)
            if (data && data.success) {
                yield put({ type: 'modal/hideModal' })
                const pathQuery = yield select(({ routing }) => routing.locationBeforeTransitions.query)
                const { page } = pathQuery
                yield put(routerRedux.push({
                    pathname: location.pathname,
                    query: !!page ? {...pathQuery, page: 1 } : pathQuery
                }))
            }
        },
        * update({ payload }, { call, put }) {
            const data = yield call(update, payload.curItem)
            if (data && data.success) {
                yield put({ type: 'modal/hideModal' })
                yield put({ type: 'query' })
            }
        },
        * updateStatus({ payload }, { call, put }) {
            const { curItem } = payload
            const data = yield call(update, {...curItem, status: !curItem.status })
            if (data && data.success) {
                yield put({ type: 'query' })
            }
        }
    },

    reducers: {
        querySuccess(state, action) {
            return {...state, ...action.payload }
        },
        showModal({ payload }) {
            alert(111)
        }
    }
}