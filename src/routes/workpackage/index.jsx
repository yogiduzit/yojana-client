import React, {useState, useEffect} from 'react';
import WithSidebar from "../../hoc/WithSidebar";
import WithHeader from "../../hoc/WithHeader";
import { Container, Row, Col } from 'reactstrap';
import BCITLogo from '../../assets/images/bcit-logo.svg';
import EditPencil from '../../assets/images/edit-pencil-icon.svg';
import GreenCheck from '../../assets/images/green-check-submission.svg';
import RedClose from '../../assets/images/red-close-submission.svg';
import AddButtonIcon from '../../assets/images/addWpButton.svg';
import { IconButton, TextField } from '@material-ui/core'
import WorkpackageCard from "../../components/workpackage/workpackageCard.component";
import LowestLevelWorkpackageCard from "../../components/workpackage/lowestLevelWorkpackageCard.component";
import AddWorkpackage from "../../components/workpackage/addWorkpackage.component";


const Workpackage = (props) => {

    const [isTotalBudgetEditModeOn, setIsTotalBudgetEditModeOn] = useState(false);
    const [isAllocatedBudgetEditModeOn, setIsAllocatedBudgetIsEditModeOn] = useState(false);
    const [totalBudget, setTotalBudget] = useState(0);
    const [allocatedBudget, setAllocatedBudget] = useState(0);
    const [unallocatedBudget, setUnallocatedBudget] = useState(0);
    const [tempTotalBudget, setTempTotalBudget] = useState(0);
    const [tempAllocatedBudget, setTempAllocatedBudget] = useState(0);
    const [initialEstimate, setInitialEstimate] = useState(0);



    useEffect( () => {
        calculateUnallocatedBudget()
    }, [totalBudget, allocatedBudget]);

    const calculateUnallocatedBudget = () => {
        let res = totalBudget - allocatedBudget;
        setUnallocatedBudget(res);
    }

    const projectObj = {
        id: 2,
        projectName: "Admin Panel",
        milestone: "Inception",
        currentWpID: 2,

    }
    return (
        <>
            <Container>
                <h1 className=' px-4 font-weight-bold'>Project {projectObj.projectName}</h1>
                <div className='text-right'>
                    <AddWorkpackage workpackage={projectObj} />
                </div>
                <div className='bg-white dashboard-card-border-radius px-4 py-3 mt-5'>
                    <Row>
                        <Col>
                            <span>
                                <img src={BCITLogo} alt='BCIT Logo'  />
                            </span>
                            <h3 className='primary-blue-text-color mb-5 d-inline ml-3'>{projectObj.projectName}</h3>
                            <div className='mt-5'>
                                <Row>
                                    <Col className='text-left'>
                                        <span className='font-weight-bold'>
                                            Initial Estimate
                                        </span>
                                    </Col>
                                    <Col>
                                        <span className='text-color-primary-yonder font-weight-bolder'>
                                            ${initialEstimate}
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
                                                    type='number'
                                                    label='Total Budget'
                                                    onChange={(e) => {
                                                        setTempTotalBudget(parseInt(e.target.value))
                                                    }
                                                    }
                                                />
                                                <IconButton
                                                    className='bg-light-green m-1 ml-5 p-2'
                                                    size='small'
                                                    onClick={() => {
                                                        setIsTotalBudgetEditModeOn(false);
                                                        setTotalBudget(tempTotalBudget)
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

                                    {
                                        isAllocatedBudgetEditModeOn ?
                                            <>
                                                <TextField
                                                    className='m-0'
                                                    size='small'
                                                    type='number'
                                                    label='Allocated Budget'
                                                    onChange={(e) => {
                                                        setTempAllocatedBudget(parseInt(e.target.value))
                                                    }
                                                    }
                                                />
                                                <IconButton
                                                    className='bg-light-green m-1 ml-5 p-2'
                                                    size='small'
                                                    onClick={(e) => {
                                                        setIsAllocatedBudgetIsEditModeOn(false);
                                                        setAllocatedBudget(tempAllocatedBudget)
                                                    }}
                                                >
                                                    <img src={GreenCheck} alt='Edit Pencil' />
                                                </IconButton>
                                                <IconButton
                                                    className='bg-light-red m-1 ml-5 p-2'
                                                    size='small'
                                                    onClick={() => {
                                                        setIsAllocatedBudgetIsEditModeOn(false);
                                                    }}>
                                                    <img src={RedClose} alt='Edit Pencil' />
                                                </IconButton>
                                            </>
                                            :
                                            <>
                                            <span className='text-color-primary-yonder font-weight-bold'>
                                                ${`${allocatedBudget}`}
                                            </span>
                                                <IconButton
                                                    className='background-light-blue m-1 ml-5 p-2'
                                                    size='small'
                                                    onClick={(e) => {
                                                        setIsAllocatedBudgetIsEditModeOn(true);

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
                                        Unallocated Budget
                                    </span>

                                </Col>
                                <Col className='text-left'>

                                    <span className='text-color-primary-yonder font-weight-bold'>
                                        ${unallocatedBudget}
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
                                        $1500
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
                                Current WP
                            </span>
                            <span className='ml-5 text-color-primary-yonder font-weight-bold'>
                                3
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
                        <Col >
                            <span className='font-weight-bold mt-4 ml-5'>
                                Priority
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
                    <WorkpackageCard />
                    <WorkpackageCard />
                    <WorkpackageCard />
                    <WorkpackageCard />
                    <LowestLevelWorkpackageCard />
                </div>

            </Container>
        </>
    )
}

export default WithSidebar(WithHeader(Workpackage));