import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import AssignList from './List'
import AssignSearch from './Search'
import AssignModal from './ModalForm'
import { checkPower } from '@/utils'
import { ADD, UPDATE, DELETE } from '@/constants/options'

function Assign({ location, curPowers, dispatch, assign, modal, loading }) {

  const addPower = checkPower(ADD, curPowers)
  const updatePower = checkPower(UPDATE, curPowers)
  const deletePower = checkPower(DELETE, curPowers)

  const { field, keyword } = location.query

  const searchProps = {
    field,
    keyword,
    addPower,
    onSearch(fieldsValue) {
      const { pathname } = location
      !!fieldsValue.keyword.length
        ? dispatch(routerRedux.push({
          pathname: pathname,
          query: {
            ...fieldsValue
          }
        }))
        : dispatch(routerRedux.push({ pathname: pathname }))
    },
    onAdd() {
      dispatch({
        type: 'assign/showModal',
        payload: {
          type: 'create'
        }
      })
    }
  }

  const listProps = {
    assign,
    loading,
    updatePower,
    deletePower,
    location,
    onDeleteItem(id) {
      dispatch({ type: 'assign/delete', payload: { id } })
    },
    onEditItem(item) {
      dispatch({
        type: 'assign/showModal',
        payload: {
          type: 'update',
          curItem: item
        }
      })
    },
    onStatusItem(item) {
      dispatch({
        type: 'assign/updateStatus',
        payload: {
          curItem: item
        }
      })
    }
  }

  const modalProps = {
    modal,
    loading,
    onOk(data) {
      dispatch({
        type: !!data.id
          ? 'assign/update'
          : 'assign/create',
        payload: {
          curItem: data
        }
      })
    },
    onCancel() {
      dispatch({ type: 'modal/hideModal' })
    }
  }

  return (
    <div className='content-inner'>
      <AssignSearch {...searchProps} />
      <AssignList {...listProps} />
      <AssignModal {...modalProps} />
    </div>
  )
}

function mapStateToProps({ assign, modal, loading }) {
  return { assign, modal, loading: loading.models.assign }
}

export default connect(mapStateToProps)(Assign)
