import React, {useState, useEffect} from 'react';
import WithSidebar from "../../hoc/WithSidebar";
import WithHeader from "../../hoc/WithHeader";
import { Container, Row, Col } from 'reactstrap';
import BCITLogo from '../../assets/images/bcit-logo.svg';
import EditPencil from '../../assets/images/edit-pencil-icon.svg';
import GreenCheck from '../../assets/images/green-check-submission.svg';
import RedClose from '../../assets/images/red-close-submission.svg';
import { IconButton as MaterialButton, TextField } from '@material-ui/core'


const Workpackage = (props) => {

    const [isTotalBudgetEditModeOn, setIsTotalBudgetEditModeOn] = useState(false);
    const [isAllocatedBudgetEditModeOn, setIsAllocatedBudgetIsEditModeOn] = useState(false);


    // useEffect( () => {
    //     console.log(props)
    // }, []);

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
                <div className='bg-white dashboard-card-border-radius px-4 py-3'>
                    <Row>
                        <Col>
                            <span>
                                <img src={BCITLogo} alt='BCIT Logo'  />
                            </span>
                            <h3 className='primary-blue-text-color mb-5 d-inline ml-3'>{projectObj.projectName}</h3>
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
                                                    label='Total Budget'
                                                    defaultValue='1500'
                                                />
                                                <MaterialButton
                                                    className='background-light-blue m-1 ml-5 p-2'
                                                    size='small'
                                                    onClick={() => {
                                                        setIsTotalBudgetEditModeOn(false);
                                                    }}
                                                >
                                                    <img src={GreenCheck} alt='Edit Pencil' />
                                                </MaterialButton>
                                                <MaterialButton
                                                    className='background-light-blue m-1 ml-5 p-2'
                                                    size='small'
                                                    onClick={() => {
                                                        setIsTotalBudgetEditModeOn(false);
                                                    }}>
                                                    <img src={RedClose} alt='Edit Pencil' />
                                                </MaterialButton>
                                            </>
                                        :
                                        <>
                                            <span className='text-color-primary-yonder font-weight-bold'>
                                                $1500
                                            </span>
                                            <MaterialButton
                                                className='background-light-blue m-1 ml-5 p-2'
                                                size='small'
                                                onClick={() => {
                                                    setIsTotalBudgetEditModeOn(true);
                                                }}
                                            >
                                                <img src={EditPencil} alt='Edit Pencil' />
                                            </MaterialButton>
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
                                        $1500
                                    </span>
                                    <MaterialButton className='background-light-blue m-1 ml-5 p-2' size='small'>
                                        <img src={EditPencil} alt='Edit Pencil' />
                                    </MaterialButton>

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
                                        $1500
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
                </div>
            </Container>
        </>
    )
}

export default WithSidebar(WithHeader(Workpackage));