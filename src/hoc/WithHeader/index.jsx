import React from 'react'
import { connect } from 'react-redux'
import Header from '../../containers/Header'

const WithHeader = WrappingComponent => {
  function WrappedComponent (props) {
    const { collapsed } = props

    const sidebarExpandedStyle = {
      padding: '0 0 0 200px' // 200px is the width of expanded sidebar
    }

    const sidebarCollapsedStyle = {
      padding: '0 0 0 80px' // 80px is the width of collapsed sidebar
    }

    return (
      <div {...props} style={collapsed ? sidebarCollapsedStyle : sidebarExpandedStyle}>
        <Header {...props} />
        <WrappingComponent {...props} />
      </div>
    )
  }
  return connect(mapStateToProps)(WrappedComponent)
}

const mapStateToProps = state => {
  return {
    collapsed: state.sidebar.collapsed
  }
}

export default WithHeader
