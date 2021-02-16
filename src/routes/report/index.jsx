import React from 'react'
import WithSidebar from "../../hoc/WithSidebar";
import WithHeader from "../../hoc/WithHeader";

const Report = () => {
    return (
        <div>
            This is Report
        </div>
    )
}

export default WithSidebar(WithHeader(Report))