import React from 'react'
import { Router, Route, IndexRoute } from 'dva/router'
import { isLogin, lazyload } from './utils'

export default function ({ history, app }) {

  /**
   * 
   * @param {*} nextState 
   * @param {*} replace 
   */
  function redirectToLogin(nextState, replace) {
    if (!isLogin()) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname, nextSearch: location.search }
      })
    }
  }

  function redirectToDashboard(nextState, replace) {
    if (isLogin()) {
      replace('/dashboard')
    }
  }
  function registerModel(app, model) {
    app.___cached__ = app.___cached__ || {};
    if (!app.___cached__[model.namespace]) {
      app.model(model);
      app.___cached__[model.namespace] = 1;
    }
  }
  //注册model
  registerModel(app, require('./models/app'))
  registerModel(app, require('./models/modal'))

  registerModel(app, require('./models/dashboard'))
  registerModel(app, require('./models/account/admin'))
  registerModel(app, require('./models/account/user'))
  registerModel(app, require('./models/account/role'))
  registerModel(app, require('./models/system/modifyPassword'))
  registerModel(app, require('./models/assign'))

  return (
    <Router history={history}>
      <Route path="/" component={require('./routes/App')} onEnter={redirectToLogin}>
        <IndexRoute component={require("./routes/Dashboard")} />
        <Route path="dashboard" component={require("./routes/Dashboard")} />
        <Route path="assign" getComponent={lazyload(System.import("./routes/Assign"))} />
        <Route path="game" getComponent={lazyload(System.import("./routes/Game"))} />
        {/*<Route path="account">
          <Route path="admin" getComponent={lazyload(System.import('./routes/account/Admin'))} />
          <Route path="user" getComponent={lazyload(System.import('./routes/account/User'))} />
          <Route path="role" getComponent={lazyload(System.import('./routes/account/Role'))} />
        </Route>
        <Route path="system">
          <Route path="modify-password" getComponent={lazyload(System.import('./routes/system/ModifyPassword'))} ></Route>
        </Route>
        <Route path="no-power" getComponent={lazyload(System.import('./routes/NoPower'))} />*/}
      </Route>
      {/*<Route path="login" getComponent={lazyload(System.import('./routes/Login'))} onEnter={redirectToDashboard} />
      <Route path="demo" getComponent={lazyload(System.import('./routes/Demo'))} />*/}
      <Route path="*" component={require("./routes/Error")} />
    </Router>
  )
}
