import React, { useState, useEffect } from 'react';
import AddButtonIcon from '../../assets/images/addWpButton.svg';
import { IconButton, Button as MaterialButton, TextField  } from '@material-ui/core'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'



const AddWorkpackage = (props) => {

    const [isAddingModalOpen, setIsAddingModalOpen] = useState(false);
    const [activeStepId, setActiveStepId] = React.useState(0);
    const [activePriority, setActivePriority] = useState(0);
    const [responsibleEngs, setResponsibleEngs] = useState([]);
    const [engineers, setEngineers] = useState([]);
    const [inputs, setInputs] = useState([]);
    const [outputs, setOutputs] = useState([]);

    const steps = [
        {
            id: 0,
            title: 'WP Information'
        },
        {
            id: 1,
            title: 'Employees'
        }
    ];

    const priorities = [
        {
            value: 0,
            label: 'Low',
        },
        {
            value: 1,
            label: 'Medium',
        },
        {
            value: 2,
            label: 'High',
        }
    ];

    const engineersSeparator = (engineers) => {
        setEngineers(engineers);
    }

    const outputsSeparator = (outputs) => {
        setOutputs(outputs);
    }

    const inputsSeparator = (inputs) => {
        setInputs(inputs);
    }

    const respEngSeparator = (tags) => {
        setResponsibleEngs(tags);
    }


    const handleNext = () => {
            setActiveStepId(activeStepId + 1);
    };

    const handleBack = () => {
        setActiveStepId(activeStepId - 1);
    }

    const toggleModal = () => {
        setIsAddingModalOpen(!isAddingModalOpen);
    }

    const submitForm = () => {
        setIsAddingModalOpen(!isAddingModalOpen);
    }

    const parentWpId = 'WP 3';

    return (
        <>
            <IconButton className='bg-light-green p-4 shadow-sm' onClick={toggleModal}>
                <img src={AddButtonIcon} />
            </IconButton>
            <Modal  isOpen={isAddingModalOpen} toggle={toggleModal} id='add-modal-wp' className='bg-primary-alice-blue overflow-hidden  border-radius-50 px-2 py-4' >
                <ModalHeader toggle={toggleModal} className='bg-primary-alice-blue border-none'>
                    <span className='font-weight-bold'>Create a Work Package</span>

                    <div className='p-2'>
                        <span className='font-weight-normal'>From {parentWpId}</span>
                    </div>
                </ModalHeader>
                <ModalBody className='bg-primary-alice-blue border-none'>
                    <form>
                        <Stepper activeStep={activeStepId} className='bg-transparent'>
                            {
                                steps.map((e, index) => {
                                    return  (
                                        <Step key={e.id}>
                                            <StepLabel>{e.title}</StepLabel>
                                        </Step>
                                    )
                                })
                            }
                        </Stepper>
                        {
                            activeStepId === 0 ?
                                <Row>
                                    <Col md={6}>
                                        <div className='border-right-solid text-center'>
                                            <TextField
                                                id="date"
                                                label="Issue Date"
                                                type="date"
                                                defaultValue="2017-05-24"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </div>

                                    </Col>
                                    <Col md={6}>
                                        <div className='text-center'>
                                            <TextField
                                                id="date"
                                                label="Due Date"
                                                type="date"
                                                defaultValue="2017-05-24"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </div>

                                    </Col>
                                    <Col md={12}>
                                        <div className='mt-5'>
                                            <Typography id="discrete-slider-restrict" className='font-weight-bold' gutterBottom>
                                                Priority
                                            </Typography>
                                            <Slider
                                                defaultValue={0}
                                                min={0}
                                                max={2}
                                                step={1}
                                                marks={priorities}
                                            />
                                        </div>
                                        <div>
                                            <p  className='font-weight-bold mt-3'>
                                                Responsible Engineer
                                            </p>
                                            <div className='px-5'>
                                                <TagsInput value={responsibleEngs} onChange={respEngSeparator} />
                                            </div>

                                        </div>
                                        <div className='mt-3'>
                                            <TextField
                                                id="outlined-multiline-static"
                                                label="Purpose"
                                                className='w-100 bg-white '
                                                multiline
                                                rows={4}
                                                variant="outlined"
                                            />
                                        </div>
                                        <div>
                                            <p  className='font-weight-bold mt-3'>
                                                Inputs
                                            </p>
                                            <div className='px-5'>
                                                <TagsInput value={inputs} onChange={inputsSeparator} />
                                            </div>
                                        </div>
                                        <div>
                                            <p  className='font-weight-bold mt-3'>
                                                Outputs
                                            </p>
                                            <div className='px-5'>
                                                <TagsInput value={outputs} onChange={outputsSeparator} />
                                            </div>
                                        </div>
                                        <div className='text-center my-3'>
                                            <MaterialButton variant='contained'
                                                            onClick={handleNext}
                                                            className='bg-white text-color-primary-yonder border-blue rounded'>
                                                Next >
                                            </MaterialButton>
                                        </div>
                                    </Col>

                                </Row>
                                :
                                <Row>
                                    <Col md={12}>
                                        <div>
                                            <MaterialButton
                                                onClick={handleBack}
                                                className='text-color-primary-yonder font-weight-bold'>
                                                {'< Back'}
                                            </MaterialButton>
                                        </div>
                                        <div>
                                            <p  className='font-weight-bold mt-3'>
                                                Employees
                                            </p>
                                            <div className='px-5'>
                                                <TagsInput value={engineers} onChange={engineersSeparator} />
                                            </div>
                                        </div>
                                        <div className='m-5 text-center'>
                                            <MaterialButton variant='contained'
                                                            onClick={submitForm}
                                                            className='bg-white text-color-primary-yonder border-blue rounded font-weight-bold mx-auto'>
                                                Create
                                            </MaterialButton>
                                        </div>
                                    </Col>

                                </Row>
                        }
                    </form>

                </ModalBody>
            </Modal>
        </>
    )
}

export default AddWorkpackage;