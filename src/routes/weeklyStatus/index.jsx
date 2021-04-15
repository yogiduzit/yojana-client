import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Container, Row, Col } from "reactstrap";

import WithSidebar from "../../hoc/WithSidebar";
import WithHeader from "../../hoc/WithHeader";

import RespEngWorkPackageCard from "../../components/workpackage/respEngWorkPackageCard.component";

import { fetchRespEngWorkPackages } from '../../api/WorkPackage';

const WeeklyStatusList = () => {
    const [workPackages, setWorkPackages] = useState([]);

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const { data, errors } = await fetchRespEngWorkPackages();
        if (errors && errors.length > 0) {
            return;
        } else {
            setWorkPackages(data.workPackages);
        }
    };

    return (
        <Container className='bg-white dashboard-card-border-radius px-4 py-3'>
            <h1 className=' px-4 font-weight-bold'>Responsible Engineers' work packages</h1>
            <Row className='mt-5 pl-4 pr-2'>
                <Col className='text-center'>
                    <span className='font-weight-bold mt-4'>
                        Project
                            </span>
                </Col>
                <Col className='text-center'>
                    <span className='font-weight-bold mt-4'>
                        Work Package
                            </span>
                </Col>
                <Col>
                    <span className='font-weight-bold mt-4 ml-2 '>
                        Issue Date
                            </span>
                </Col>
                <Col>
                    <span className='font-weight-bold mt-4'>
                        Due Date
                            </span>
                </Col>
            </Row>
            {
                workPackages.map((wp, index) =>
                    <RespEngWorkPackageCard wpData={wp} key={index} />
                )
            }
        </Container>
    )
}

export default WithSidebar(WithHeader(WeeklyStatusList))