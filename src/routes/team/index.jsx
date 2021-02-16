import React from 'react'
import WithSidebar from "../../hoc/WithSidebar";
import WithHeader from "../../hoc/WithHeader";

const Team = () => {
    return (
        <div>
            This is Team
        </div>
    )
}

export default WithSidebar(WithHeader(Team))