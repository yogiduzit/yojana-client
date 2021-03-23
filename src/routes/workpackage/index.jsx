import React, {useState, useEffect} from 'react';
import WithSidebar from "../../hoc/WithSidebar";
import WithHeader from "../../hoc/WithHeader";
import { Container } from 'reactstrap'


const Workpackage = (props) => {

    return (
        <>
            <Container>
                <h1>
                    Hello World
                </h1>
            </Container>
        </>
    )
}

export default WithSidebar(WithHeader(Workpackage));