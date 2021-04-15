import React, { useEffect, useState } from 'react';
import WithSidebar from "../../hoc/WithSidebar";
import WithHeader from "../../hoc/WithHeader";
import classnames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import SearchBar from "material-ui-search-bar";
import { Link } from 'react-router-dom'
import { ACCESS_TOKEN } from "../../constants/environementVariables"
import { IconButton } from "@material-ui/core";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Container } from 'reactstrap';
import OpenNewPageIcon from '../../assets/images/new-page-icon.svg'
import { fetchAvailableReports } from '../../api/Report';

const Report = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const [rows, setRows] = useState([]);
    const [searched, setSearched] = useState("");
    const requestSearch = (searchedVal) => {
        const filteredRows = rows.filter((row) => {
            return row.name.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };
    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };
    const [rowsM, setRowsM] = useState([]);
    const [searchedM, setSearchedM] = useState("");
    const requestSearchM = (searchedValM) => {
        const filteredRowsM = rowsM.filter((row) => {
            return row.name.toLowerCase().includes(searchedValM.toLowerCase());
        });
        setRowsM(filteredRowsM);
    };
    const cancelSearchM = () => {
        setSearchedM("");
        requestSearchM(searchedM);
    };

    useEffect(() => {
        async function loadReports() {
            const { data, errors } = await fetchAvailableReports();
            if (errors && errors.length > 0) {
                console.error(errors);
            } else {
                setRows(data.reports);
                setRowsM(data.reports);
            }
        }
        loadReports();
    }, [])

    return (
        <Container className='p-5 w-200'>
            <div className='mx-auto  employeebox text-center py-5 px-5'>

                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggle('1'); }}>
                            Weekly Reports
                    </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            Monthly Report
                    </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Paper>
                            <SearchBar className="my-3"
                                value={searched}
                                onChange={(searchVal) => requestSearch(searchVal)}
                                onCancelSearch={() => cancelSearch()}
                            />
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Project Name</TableCell>
                                            <TableCell ></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((e) => (
                                            <TableRow key={e.id}>
                                                <TableCell >{e.id}</TableCell>
                                                <TableCell >{e.name}</TableCell>
                                                <TableCell>
                                                    <Link
                                                        to={{
                                                            pathname: `${activeTab === 1 ? 'weekly' : 'monthly'}-report/${e.id}`
                                                        }}
                                                    >
                                                        <IconButton className='background-light-blue'>
                                                            <img src={OpenNewPageIcon} />
                                                        </IconButton>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </TabPane>
                    <TabPane tabId="2">
                        <Paper>
                            <SearchBar className="my-3"
                                value={searchedM}
                                onChange={(searchValM) => requestSearchM(searchValM)}
                                onCancelSearch={() => cancelSearchM()}
                            />
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Project Name</TableCell>
                                            <TableCell ></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rowsM.map((e) => (
                                            <TableRow key={e.id}>
                                                <TableCell >{e.id}</TableCell>
                                                <TableCell >{e.name}</TableCell>
                                                <TableCell >

                                                    <IconButton className='background-light-blue'>
                                                        <img src={OpenNewPageIcon} />
                                                    </IconButton>

                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </TabPane>
                </TabContent>
            </div>
        </Container>
    )
}

export default WithSidebar(WithHeader(Report))