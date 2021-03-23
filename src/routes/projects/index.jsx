import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Container, Row } from "reactstrap";

import WithSidebar from "../../hoc/WithSidebar";
import WithHeader from "../../hoc/WithHeader";

import ProjectCard from "../../components/projects/projectCard.component";

import { fetchAllProjects } from '../../api/Project';
import Routes from '../../constants/routes';

const Projects = () => {
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
          <h1 className=' px-4 font-weight-bold'>Projects</h1>
        <div className='text-right m-1'>
          <Button className='ml-auto  w-30 mt-5 loginbutton'
            variant="contained">
            <Link className="text-white" to={Routes.ADDPROJECT}>Add projects</Link>
          </Button>
        </div>



        <Row>
          {
            projects.map((p, index) => {
              return (
                <ProjectCard key={index} project={p} />
              )
            })
          }
          <ProjectCard />
        </Row>
    </Container>
  )
}

export default WithSidebar(WithHeader(Projects))