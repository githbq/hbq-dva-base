import React, { PropTypes } from 'react'
import { connect } from 'dva'
import style from './index.less'
function Dashboard({ dashboard, dispatch }) {
  return (
    <div>welcom <input /><div className={style.image1}></div></div>
  )
}
Dashboard.propTypes = {
}
export default connect(({ dashboard }) => ({ dashboard }))(Dashboard)
