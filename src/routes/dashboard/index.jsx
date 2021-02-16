import React from 'react';
import WithSidebar from "../../hoc/WithSidebar";
import WithHeader from "../../hoc/WithHeader";

const Dashboard = (props) => {
    return (
        <div style={{
            height: "1500px",
            width: "100%",
            border: "2px solid black"
        }}>
            Hello
        </div>
    )
}

export default WithSidebar(WithHeader(Dashboard));