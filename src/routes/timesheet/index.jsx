import React from 'react'
import WithSidebar from "../../hoc/WithSidebar";
import WithHeader from "../../hoc/WithHeader";

const Timesheet = () => {
    return (
        <div>
            This is Timesheet
        </div>
    )
}

export default WithSidebar(WithHeader(Timesheet))