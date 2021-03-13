import React from 'react'
import WithSidebar from "../../hoc/WithSidebar";
import WithHeader from "../../hoc/WithHeader";
import { Container, Row, Col } from 'reactstrap';
import fakeProjectsData from './projectsFakeData.json'
import projectFakeData from "./projectsFakeData.json";
import ProjectCard from "../../components/projects/projectCard.component";

const Projects = () => {
    return (
        <div>
            <Container>
                <h1 className='my-5 px-4 font-weight-bold'>Projects</h1>
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

export default WithSidebar(WithHeader(Projects))