import React, { Component } from 'react'
import { connect } from 'dva'
import { Tabs } from 'antd'
import styles from './index.less'
class Demo extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className={styles.demo}>demo</div>
    );
  }
}

export default connect()(Demo)
