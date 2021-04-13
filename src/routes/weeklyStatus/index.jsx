import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Container, Row } from "reactstrap";

import WithSidebar from "../../hoc/WithSidebar";
import WithHeader from "../../hoc/WithHeader";

import ProjectCard from "../../components/projects/projectCard.component";

import { fetchAllProjects } from '../../api/Project';

const WeeklyStatusList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const { data } = await fetchAllProjects();
    setProjects(data.projects);
  };
  
  return (
      <Container>
          <h1 className=' px-4 font-weight-bold'>Responsible Engineers' work packages</h1>
        <Row>
          {
            projects.map((p, index) => {
              return (
                <ProjectCard key={index} project={p} />
              )
            })
          }
        </Row>
    </Container>
  )
}

export default WithSidebar(WithHeader(WeeklyStatusList))