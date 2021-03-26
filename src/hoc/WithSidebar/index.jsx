import React from 'react'
import '../../assets/css/with-sidebar.scss'

import Sidebar from '../../containers/Sidebar'

const WithSidebar = WrappingComponent => {
  return props => (
    <div className='layout'>
      <Sidebar {...props} />
      <WrappingComponent {...props} className='main-content' />
    </div>
  )
}

export default WithSidebar;
