import { parse } from 'qs'
import { routerRedux } from 'dva/router'
import { getCurPowers } from '../utils'
import { query } from './dashboardService'
export default {
    namespace: 'dashboard',
    state: {},
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                const pathname = location.pathname
                if (pathname === '/' || pathname === '/dashboard') {

                }
            })
        }
    },
    effects: {
        * query({
            payload
        }, { call, put }) {
            const data = yield call(query, parse(payload))
            yield put({ type: 'queryWeather', payload: {...data } })
        },

    },
    reducers: {
        queryWeather(state, action) {
            return {
                ...state,
                ...action.payload
            }
        }
    }
}