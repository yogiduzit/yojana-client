import React, { useState } from 'react';
import WithSidebar from "../../hoc/WithSidebar";
import WithHeader from "../../hoc/WithHeader";
import classnames from 'classnames'
import staticData from './reportStaticData.json'
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import download from '../../assets/images/download.svg'
import { ACCESS_TOKEN } from "../../constants/environementVariables"
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Container } from 'reactstrap';

const Report = (props) => {
    const [activeTab,setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }
    const downloadFile  = (id) => {

        axios.get(`http://localhost:8080/yojana-backend/api/report/${id}`,{
          headers:{
            'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`
          }
        }).then(res => {
            res.blob().then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'employees.json';
                a.click();
        })
      })
    };

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
            <TableContainer component={Paper}>
        <Table  aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell >From</TableCell> 
                <TableCell >To</TableCell>
                <TableCell >Issued Date</TableCell>
                <TableCell ></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {staticData.projectName.map((e) => (
                <TableRow key={e.id}>
                <TableCell >{e.id}</TableCell>    
                <TableCell >{e.name}</TableCell>
                <TableCell >{e.from}</TableCell>
                <TableCell >{e.to}</TableCell>
                <TableCell >{e.issue}</TableCell>
                <TableCell ><span onClick={() => downloadFile(e.id)}>
                    <img src={download} />
                    </span></TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </TabPane>
        <TabPane tabId="2">
            <TableContainer component={Paper}>
            <Table  aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Project Name</TableCell>
                    <TableCell >From</TableCell> 
                    <TableCell >To</TableCell>
                    <TableCell >Issued Date</TableCell>
                    <TableCell ></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {staticData.projectNameMonthly.map((e) => (
                    <TableRow key={e.id}>
                    <TableCell >{e.id}</TableCell>    
                    <TableCell >{e.name}</TableCell>
                    <TableCell >{e.from}</TableCell>
                    <TableCell >{e.to}</TableCell>
                    <TableCell >{e.issue}</TableCell>
                    <TableCell ><img src={download} /></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </TabPane>
      </TabContent>
        </div>
        </Container>
    )
}

export default WithSidebar(WithHeader(Report))