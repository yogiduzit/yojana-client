import React from 'react'
import Header from '../../containers/Header'

const WithHeader = ( WrappingComponent ) => {
    return (props) => (
        <div {...props} style={{ padding: "0" }}>
            <Header {...props} />
            <WrappingComponent {...props} />
        </div>
    )
}

export default WithHeader