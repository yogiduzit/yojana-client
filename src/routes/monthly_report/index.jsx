import React, { useState, useEffect } from 'react'
import WithSidebar from "../../hoc/WithSidebar";
import WithHeader from "../../hoc/WithHeader";
import { Container, Row, Col } from 'reactstrap';
import MonthlyReportCard from "../../components/report_monthly/monthlyReportCard.component";
import { TextField } from "@material-ui/core";
import SearchIcon from '../../assets/images/search_icon.svg'
import {Search} from "@material-ui/icons";


const MonthlyReport = (props) => {

    const [keyword, setKeyword] = useState('');
    const [workpackageDefaultList, setWorkpackageDefaultList] = useState([]);
    const [workpackageList, setWorkpackageList] = useState([]);


    // When the component is being rendered
    useEffect(() => {
        setWorkpackageDefaultList(projectObj.workpackages);
        setWorkpackageList(projectObj.workpackages);
    },[]);



    const filterData = (input) => {
        const filtered = workpackageDefaultList .filter(wpItem => {
            return wpItem.id.toLowerCase().includes(input.toLowerCase())
        })
        setWorkpackageList(filtered);
    }

    const searchHandler = (keyword) => {
        setKeyword(keyword);
        filterData(keyword);
    }

    const projectObj = {
        name: 'BCIT Panel Improvement',
        total_budget:'$1500',
        workpackages: [
            {
                id: 'WP1',
                detail: 
                    {
                        purpose:'more refined UI',
                        description:'Customization UI'
                    },

                project_budget: '$200',
                init_st: '$200',
                engineer_planned:'$195',
                current_chages:'$95',
                est:'$195'

            },
            {
                id: 'WP2',
                detail: 
                    {
                        purpose:'more refined UX',
                        description:'Customization UX'
                    },

                project_budget: '$210',
                init_st: '$210',
                engineer_planned:'$190',
                current_chages:'$95',
                est:'$185'

            },
            {
                id: 'WP3',
                detail: 
                    {
                        purpose:'more refined UX',
                        description:'Customization xyz'
                    },

                project_budget: '$200',
                init_st: '$210',
                engineer_planned:'$190',
                current_chages:'$90',
                est:'$185'

            },
            {
                id: 'WP4',
                detail: 
                    {
                        purpose:'more refined UX',
                        description:'Customization xyz'
                    },

                project_budget: '$200',
                init_st: '$210',
                engineer_planned:'$190',
                current_chages:'$90',
                est:'$185'

            },
            {
                id: 'WP5',
                detail: 
                    {
                        purpose:'more refined xyz',
                        description:'Customization xyz'
                    },

                project_budget: '$299',
                init_st: '$210',
                engineer_planned:'$199',
                current_chages:'$99',
                est:'$185'

            },
        ]
    }

    return (
        <div>
            <Container>
                <h2 className='font-weight-bold '>{projectObj.name} - Monthly Report</h2>
                <div className='bg-white dashboard-card-border-radius px-4 py-3 mt-5'>
                    <div className='w-75 mx-auto'>
                    
                        <TextField
                            variant={"outlined"}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                     <img src={SearchIcon} alt='Search Icon' />
                                )
                            }}
                            className='mx-auto'
                            label='Search'
                            placeholder='Enter Workpackage ID'
                            onChange={(e) => searchHandler(e.target.value)}
                        />
                    </div>
                    <div className="mt-3">
                        <span className="mx-3 font-weight-bold ">Total Budget </span>
                        <span className='font-weight-bold text-purple-color'>{projectObj.total_budget}</span>
                    </div>
                <Row className="mt-3 ml-3">   
                <Col >
                    <span className='font-weight-bold ml-5'>
                      WP
                    </span>
                </Col >
                <Col>
                    <span className='font-weight-bold'>
                      Project Budget
                    </span>
                </Col>
                <Col>
                    <span className='font-weight-bold'>
                      Init Est
                    </span>
                </Col>
                <Col>
                    <span className='font-weight-bold '>
                      Engineer planned
                    </span>
                </Col>
                <Col>
                    <span className='font-weight-bold'>
                      Current Charges
                    </span>
                </Col>
                <Col>
                    <span className='font-weight-bold'>
                      Est at 
                      Completion
                    </span>
                </Col>
                </Row>
                    

                    {
                        workpackageList.map((e) => (
                            <div className='mt-3'>
                                <MonthlyReportCard key={e.id} wpData={e} />
                            </div>
                        ))
                    }
                </div>

            </Container>
        </div>
    )

}

export default WithSidebar(WithHeader(MonthlyReport));
