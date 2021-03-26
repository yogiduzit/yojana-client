import React from "react";
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button as MaterialButton } from '@material-ui/core';
import Routes from "../../constants/routes";


const ProjectCard = (props) => {



  return (
    <Col sm={12} md={6} className=''>
      <div className='p-4 m-4 bg-white dashboard-card-border-radius'>
        <h3 className='primary-blue-text-color mb-5'>{props.project.projectName}</h3>
        <Row>
          <Col xs={12} sm={4} className='py-2'>
            <span className='primary-blue-text-color'>
              Milestone
                            </span>
          </Col>
          <Col xs={12} sm={8} className='py-2'>
            <span className='primary-blue-text-color'>
              {props.project.milestone}
            </span>
          </Col>
          <Col xs={12} sm={4} className='py-2'>
            <span className='primary-blue-text-color'>
              Current WP
                            </span>
          </Col>
          <Col xs={12} sm={8} className='py-2'>
            <span className='primary-blue-text-color'>
              {props.project.currentWpID}
            </span>
          </Col>
          <Col xs={12} sm={4} className='py-2'>
            <span className='primary-blue-text-color'>
              Team Members
                            </span>
          </Col>
          <Col xs={12} sm={8} className='py-2 text-right'>
            <Link>
              <span className='primary-blue-text-color text-decoration-underline'>
                See all
                                </span>
            </Link>
          </Col>
        </Row>
        <div className='text-right'>
          {/* <Link classname="bg-white text-decoration-none "
                to={
                  {
                    pathname: `/project/${props.project.id}`,
                    data: props.project
                  }
                }
                   >
            <MaterialButton className='bg-primary-blue primary-white-text-color px-3 mt-3  rounded-pill'>
                  More Info
            </MaterialButton>
          </Link> */}
          <Link className='bg-white text-decoration-none' to='www.google.com'>
            <MaterialButton className='bg-primary-blue primary-white-text-color px-3 mt-3  rounded-pill'>
                    More Info
              </MaterialButton>
          </Link>

        </div>
      </div>
    </Col>
  )
};

export default ProjectCard;