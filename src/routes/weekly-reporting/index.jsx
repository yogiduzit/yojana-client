import React, { useState, useEffect } from 'react'
import WithSidebar from "../../hoc/WithSidebar";
import WithHeader from "../../hoc/WithHeader";
import { Container, Row, Col } from 'reactstrap';
import WeeklyReportCard from "../../components/reporting/weeklyReportCard.component";
import { TextField } from "@material-ui/core";
import SearchIcon from '../../assets/images/searchIcon.svg';
import { useParams } from 'react-router';
import { fetchProject } from '../../api/Project';
import { fetchWeeklyReport } from '../../api/Report';
import { workPackageSorter } from '../../utils/workPackageSorter';

const WeeklyReportPage = (props) => {
    const { projectId } = useParams();

    const [keyword, setKeyword] = useState('');
    const [workpackageDefaultList, setWorkpackageDefaultList] = useState([]);
    const [workpackageList, setWorkpackageList] = useState([]);
    const [project, setProject] = useState({});


    // When the component is being rendered
    useEffect(() => {
        async function loadProject() {
            const res = await fetchProject(projectId);
            if (res.errors && res.errors.length > 0) {
                console.error("Cannot load project");
            } else {
                setProject(res.data.project);
            }
        };
        async function loadReport() {
            const res = await fetchWeeklyReport(projectId);
            if (res.errors && res.errors.length > 0) {
                console.error("Cannot load project");
            } else {
                const workPackages = Object.values(res.data.report).sort(workPackageSorter);
                setWorkpackageDefaultList(workPackages);
                setWorkpackageList(workPackages);
            }
        }
        loadProject();
        loadReport();
    },[projectId]);

    const filterData = (input) => {
        const filtered = workpackageDefaultList.filter(wpItem => {
            return wpItem.id.toLowerCase().includes(input.toLowerCase())
        })
        setWorkpackageList(filtered);
    }

    const searchHandler = (keyword) => {
        setKeyword(keyword);
        filterData(keyword);
    }

    // const projectObj = {
    //     name: 'BCIT Panel Improvement',
    //     workpackages: [
    //         {
    //             id: 'WP1',
    //             employees: [
    //                 {
    //                     id: 1,
    //                     name: 'John Doe',
    //                     charged: 200.00,
    //                     payGradeLevel: 'P1'
    //                 },
    //                 {
    //                     id: 2,
    //                     name: 'Jane Doe',
    //                     charged: 200.00,
    //                     payGradeLevel: 'P2'
    //                 },
    //                 {
    //                     id: 3,
    //                     name: 'David Doe',
    //                     charged: 200.00,
    //                     payGradeLevel: 'P3'
    //                 }
    //             ],
    //             from: '12/12/2020',
    //             to: '19/12/2020'

    //         },
    //         {
    //             id: 'WP2',
    //             employees: [
    //                 {
    //                     id: 1,
    //                     name: 'John Doe',
    //                     charged: 200.00,
    //                     payGradeLevel: 'P1'
    //                 },
    //                 {
    //                     id: 2,
    //                     name: 'Jane Doe',
    //                     charged: 200.00,
    //                     payGradeLevel: 'P2'
    //                 },
    //                 {
    //                     id: 3,
    //                     name: 'David Doe',
    //                     charged: 200.00,
    //                     payGradeLevel: 'P3'
    //                 }
    //             ],
    //             from: '12/12/2020',
    //             to: '19/12/2020'

    //         },
    //         {
    //             id: 'WP3',
    //             employees: [
    //                 {
    //                     id: 1,
    //                     name: 'John Doe',
    //                     charged: 200.00,
    //                     payGradeLevel: 'P1'
    //                 },
    //                 {
    //                     id: 2,
    //                     name: 'Jane Doe',
    //                     charged: 200.00,
    //                     payGradeLevel: 'P2'
    //                 },
    //                 {
    //                     id: 3,
    //                     name: 'David Doe',
    //                     charged: 200.00,
    //                     payGradeLevel: 'P3'
    //                 }
    //             ],
    //             from: '12/12/2020',
    //             to: '19/12/2020'

    //         },
    //         {
    //             id: 'WP4',
    //             employees: [
    //                 {
    //                     id: 1,
    //                     name: 'John Doe',
    //                     charged: 200.00,
    //                     payGradeLevel: 'P1'
    //                 },
    //                 {
    //                     id: 2,
    //                     name: 'Jane Doe',
    //                     charged: 200.00,
    //                     payGradeLevel: 'P2'
    //                 },
    //                 {
    //                     id: 3,
    //                     name: 'David Doe',
    //                     charged: 200.00,
    //                     payGradeLevel: 'P3'
    //                 }
    //             ],
    //             from: '12/12/2020',
    //             to: '19/12/2020'

    //         },
    //         {
    //             id: 'WP5',
    //             employees: [
    //                 {
    //                     id: 1,
    //                     name: 'John Doe',
    //                     charged: 200.00,
    //                     payGradeLevel: 'P1'
    //                 },
    //                 {
    //                     id: 2,
    //                     name: 'Jane Doe',
    //                     charged: 200.00,
    //                     payGradeLevel: 'P2'
    //                 },
    //                 {
    //                     id: 3,
    //                     name: 'David Doe',
    //                     charged: 200.00,
    //                     payGradeLevel: 'P3'
    //                 }
    //             ],
    //             from: '12/12/2020',
    //             to: '19/12/2020'

    //         }
    //     ]
    // }

    return (
        <div>
            <Container>
                <h2 className='font-weight-bold '>{project.name} - Weekly Report</h2>
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
                    <Row className='mt-5 pl-4 pr-2'>
                        <Col className='text-center'>
                            <span className='font-weight-bold mt-4'>
                                WP
                            </span>
                        </Col>
                        <Col className='text-center'>
                            <span className='font-weight-bold mt-4'>
                                Charged (hours)
                            </span>
                        </Col>
                        <Col className='text-center'>
                            <span className='font-weight-bold mt-4'>
                                Charged (dollar)
                            </span>
                        </Col>
                    </Row>
                    {
                        workpackageList.map((e) => (
                            <div className='mt-3'>
                                <WeeklyReportCard key={e.id} wpData={e} />
                            </div>
                        ))
                    }
                </div>

            </Container>
        </div>
    )

}

export default WithSidebar(WithHeader(WeeklyReportPage));