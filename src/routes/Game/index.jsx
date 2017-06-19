import React, { Component } from 'react'
import { connect } from 'dva'
import styles from './index.less'
export default connect()(
  class extends React.Component {
    render() {
      return (
        <div className={styles.game}>game222<input /></div>
      );
    }
  }
)
