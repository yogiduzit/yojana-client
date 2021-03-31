import { IconButton, TextField } from '@material-ui/core'
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router';

import WithSidebar from "../../hoc/WithSidebar";
import WithHeader from "../../hoc/WithHeader";
import WorkpackageCard from "../../components/workpackage/workpackageCard.component";

import BCITLogo from '../../assets/images/bcit-logo.svg';
import EditPencil from '../../assets/images/edit-pencil-icon.svg';
import GreenCheck from '../../assets/images/green-check-submission.svg';
import RedClose from '../../assets/images/red-close-submission.svg';

import { fetchChildWorkPackages, fetchWorkPackage } from '../../api/WorkPackage';
import { initialWorkPackageState } from './initialState';
import { handleBudgetChanged, handleEstimateChanged } from './utils/handlers';

const SubWorkpackage = () => {
    const params = useParams();
    const [workPackage, setWorkPackage] = useState(initialWorkPackageState);
    const [isTotalBudgetEditModeOn, setIsTotalBudgetEditModeOn] = useState(false);
    const [isInitialEstimateEditModeOn, setIsInitialEstimateEditModeOn] = useState(false);

    const [totalBudget, setTotalBudget] = useState(workPackage.budget);
    const [initialEstimate, setInitialEstimate] = useState(workPackage.initialEstimate);
    const [tempTotalBudget, setTempTotalBudget] = useState(totalBudget);
    const [tempInitialEstimate, setTempInitialEstimate] = useState(initialEstimate);

    const [wps, setWps] = useState([]);

    useEffect(() => {
        async function loadProject() {
            const res = await fetchWorkPackage(params.id, params.wpId);
            if (res.errors && res.errors.length > 0) {
                console.error("Cannot load workpackage");
            } else {
                setWorkPackage(res.data.workPackage);
                setInitialEstimate(res.data.workPackage.initialEstimate);
                setTotalBudget(res.data.workPackage.budget);
            }
        };
        async function loadWorkPackages() {
            const res = await fetchChildWorkPackages(params.id, params.wpId);
            if (res.errors && res.errors.length > 0) {
                console.error("Cannot load work packages for workpackage");
            } else {
                setWps(res.data.workPackages);
            }
        };
        loadWorkPackages();
        loadProject();
    }, [params.id, params.wpId])

    return (
        <>
            <Container>
                <h1 className=' px-4 font-weight-bold'>{workPackage.workPackagePk.projectID} - {workPackage.workPackagePk.id}</h1>
                <div className='bg-white dashboard-card-border-radius px-4 py-3'>
                    <Row>
                        <Col>
                            <span>
                                <img src={BCITLogo} alt='BCIT Logo' />
                            </span>
                            <h3 className='primary-blue-text-color mb-5 d-inline ml-3'>{workPackage.workPackageName}</h3>
                            <div className='mt-5'>
                                <Row >
                                    <Col className='text-left'>
                                        <span className='font-weight-bold mt-4'>
                                            Initial Estimate
                                    </span>

                                    </Col>
                                    <Col className='text-left'>
                                        {
                                            isInitialEstimateEditModeOn ?
                                                <>
                                                    <TextField
                                                        className='m-0'
                                                        size='small'
                                                        type='text'
                                                        name='initialEstimate'
                                                        label='Initial Estimate'
                                                        onChange={
                                                            (e) => {
                                                                setTempInitialEstimate(parseInt(e.target.value))
                                                            }
                                                        }
                                                    />
                                                    <IconButton
                                                        className='bg-light-green m-1 ml-5 p-2'
                                                        size='small'
                                                        onClick={() => {
                                                            setIsInitialEstimateEditModeOn(false);
                                                            handleEstimateChanged(params.id, tempInitialEstimate, setInitialEstimate, params.wpId)
                                                        }}
                                                    >
                                                        <img src={GreenCheck} alt='Edit Pencil' />
                                                    </IconButton>
                                                    <IconButton
                                                        className='bg-light-red m-1 ml-5 p-2'
                                                        size='small'
                                                        onClick={() => {
                                                            setIsInitialEstimateEditModeOn(false);
                                                        }}>
                                                        <img src={RedClose} alt='Edit Pencil' />
                                                    </IconButton>
                                                </>
                                                :
                                                <>
                                                    <span className='text-color-primary-yonder font-weight-bold'>
                                                        ${`${initialEstimate}`}
                                                    </span>
                                                    <IconButton
                                                        className='background-light-blue m-1 ml-5 p-2'
                                                        size='small'
                                                        onClick={() => {
                                                            setIsInitialEstimateEditModeOn(true);
                                                        }}
                                                    >
                                                        <img src={EditPencil} alt='Edit Pencil' />
                                                    </IconButton>
                                                </>
                                        }
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    <Col className='text-left'>
                                        <span className='font-weight-bold mt-4'>
                                            Allocated Initial Estimate
                                    </span>

                                    </Col>
                                    <Col className='text-left'>

                                        <span className='text-color-primary-yonder font-weight-bold'>
                                            ${workPackage.allocatedInitialEstimate}
                                        </span>
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    <Col className='text-left'>
                                        <span className='font-weight-bold mt-4'>
                                            Unallocated Initial Estimate
                                    </span>

                                    </Col>
                                    <Col className='text-left'>

                                        <span className='text-color-primary-yonder font-weight-bold'>
                                            ${initialEstimate - workPackage.allocatedInitialEstimate}
                                        </span>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col>
                            <Row >
                                <Col className='text-left'>
                                    <span className='font-weight-bold mt-4'>
                                        Total Budget
                                    </span>

                                </Col>
                                <Col className='text-left'>
                                    {
                                        isTotalBudgetEditModeOn ?
                                            <>
                                                <TextField
                                                    className='m-0'
                                                    size='small'
                                                    type='text'
                                                    name='totalBudget'
                                                    label='Total Budget'
                                                    onChange={
                                                        (e) => {
                                                            setTempTotalBudget(parseInt(e.target.value))
                                                        }
                                                    }
                                                />
                                                <IconButton
                                                    className='bg-light-green m-1 ml-5 p-2'
                                                    size='small'
                                                    onClick={() => {
                                                        setIsTotalBudgetEditModeOn(false);
                                                        handleBudgetChanged(params.id, tempTotalBudget, setTotalBudget, params.wpId);
                                                    }}
                                                >
                                                    <img src={GreenCheck} alt='Edit Pencil' />
                                                </IconButton>
                                                <IconButton
                                                    className='bg-light-red m-1 ml-5 p-2'
                                                    size='small'
                                                    onClick={() => {
                                                        setIsTotalBudgetEditModeOn(false);
                                                    }}>
                                                    <img src={RedClose} alt='Edit Pencil' />
                                                </IconButton>
                                            </>
                                            :
                                            <>
                                                <span className='text-color-primary-yonder font-weight-bold'>
                                                    ${`${totalBudget}`}
                                                </span>
                                                <IconButton
                                                    className='background-light-blue m-1 ml-5 p-2'
                                                    size='small'
                                                    onClick={() => {
                                                        setIsTotalBudgetEditModeOn(true);
                                                    }}
                                                >
                                                    <img src={EditPencil} alt='Edit Pencil' />
                                                </IconButton>
                                            </>
                                    }
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col className='text-left'>
                                    <span className='font-weight-bold mt-4'>
                                        Allocated Budget
                                    </span>

                                </Col>
                                <Col className='text-left'>

                                    <span className='text-color-primary-yonder font-weight-bold'>
                                        ${workPackage.allocatedBudget}
                                    </span>

                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col className='text-left'>
                                    <span className='font-weight-bold mt-4'>
                                        Unallocated Budget
                                    </span>

                                </Col>
                                <Col className='text-left'>

                                    <span className='text-color-primary-yonder font-weight-bold'>
                                        ${totalBudget - workPackage.allocatedBudget}
                                    </span>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col className='text-left'>
                                    <span className='font-weight-bold mt-4'>
                                        Charge
                                    </span>

                                </Col>
                                <Col className='text-left'>

                                    <span className='text-color-primary-yonder font-weight-bold'>
                                        {workPackage.charged}
                                    </span>

                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className='mt-4 px-2'>
                        <Col>
                            <span className='font-weight-bold mt-4'>
                                Milestone
                            </span>
                            <span className='ml-5 text-color-primary-yonder font-weight-bold'>
                                Inception
                            </span>
                        </Col>
                        <Col>
                            <span className='font-weight-bold mt-4'>
                                Time Spent
                            </span>
                            <span className='ml-5 text-color-primary-yonder font-weight-bold'>
                                24 Hrs
                            </span>
                        </Col>
                        <Col>
                            <span className='font-weight-bold mt-4'>
                                Start Date
                            </span>
                            <span className='ml-5 text-color-primary-yonder font-weight-bold'>
                                08/01/21
                            </span>
                        </Col>
                    </Row>
                    <Row className='mt-5 pl-4 pr-2'>
                        <Col className='text-center'>
                            <span className='font-weight-bold mt-4'>
                                WP
                            </span>
                        </Col>
                        <Col className='text-center'>
                            <span className='font-weight-bold mt-4'>
                                Initial Estimate
                            </span>
                        </Col>
                        <Col className='text-center'>
                            <span className='font-weight-bold mt-4'>
                                Allocated Initial Estimate
                            </span>
                        </Col>
                        <Col className='text-center'>
                            <span className='font-weight-bold mt-4'>
                                Budget
                            </span>
                        </Col>
                        <Col className='text-center'>
                            <span className='font-weight-bold mt-4'>
                                Allocated Budget
                            </span>
                        </Col>
                        {/* <Col >
							<span className='font-weight-bold mt-4 ml-5'>
								Priority
                            </span>
						</Col> */}
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
                        wps.map((wp, index) => {
                            return (
                                <WorkpackageCard wpData={wp} key={index} />
                            );
                        })
                    }
                </div>

            </Container>
        </>
    )
}

export default WithSidebar(WithHeader(SubWorkpackage));