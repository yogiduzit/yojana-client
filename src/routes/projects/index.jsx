import React from 'react'
import WithSidebar from "../../hoc/WithSidebar";
import WithHeader from "../../hoc/WithHeader";

const Projects = () => {
    return (
        <div>
            This is Projects
        </div>
    )
}

export default WithSidebar(WithHeader(Projects))