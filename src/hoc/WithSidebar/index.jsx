import React from 'react'
import '../../assets/css/with-sidebar.scss'

import Sidebar from '../../containers/Sidebar'
import WithHeader from "../WithHeader";

const WithSidebar = ( WrappingComponent ) => {
    return (props) => (
        <>
            <div className="layout">
                <Sidebar {...props} />
            </div>
            <WrappingComponent {...props} className="main-content" />
        </>

    )
}

export default WithSidebar;