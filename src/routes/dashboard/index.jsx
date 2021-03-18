import React from 'react';
import WithSidebar from "../../hoc/WithSidebar";
import WithHeader from "../../hoc/WithHeader";
import {Col, Container, Row} from "reactstrap";
import PreviousWeekCard from "../../components/dashboard/prevWeekCard.component";
import ProjectCard from "../../components/projects/projectCard.component";
import projectFakeData from '../projects/projectsFakeData.json'

const Dashboard = (props) => {
    return (
        <div>
            <Container>
                <h1 className='px-4 font-weight-bold'>Previous Week</h1>
                <Row>
                    <Col md={7}>
                        <PreviousWeekCard />
                    </Col>
                    <Col md={5}>

                    </Col>
                </Row>
                <h1 className='my-5 px-4 font-weight-bold'>Recent Projects</h1>
                <Row>
                    {
                        projectFakeData.projects.map((p, index) => {
                            return (
                                <ProjectCard key={index} project={p} />
                            )
                        })
                    }

                </Row>
            </Container>
        </div>
    )
}

export default WithSidebar(WithHeader(Dashboard));