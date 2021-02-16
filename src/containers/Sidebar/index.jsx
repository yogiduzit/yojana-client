import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Routes from '../../constants/routes';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaBars, FaThLarge, FaFolder, FaMoneyCheck, FaChartBar,  FaUserFriends } from 'react-icons/fa';

const Sidebar = (props) => {
    useEffect(() => {
        console.log(pathname)
    },[])

    const { pathname } = props.location;

    const [collapsed, setCollapsed] = useState(false);

    const handleCollapsedChange = () => {
        setCollapsed(!collapsed);
    };

    return (
        <ProSidebar
            image={false}
            collapsed={collapsed}
            breakPoint="md"
            className="sidebar-custom-style"
        >
            <SidebarHeader>
                <div
                    style={{
                        padding: '30px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <FaBars onClick={handleCollapsedChange}/>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem
                        icon={<FaThLarge />}
                        active={!pathname.localeCompare(Routes.DASHBOARD)}
                    >
                        Dashboard
                        <Link to={Routes.DASHBOARD} />
                    </MenuItem>
                    <MenuItem
                        icon={<FaFolder />}
                        active={!pathname.localeCompare(Routes.PROJECTS)}
                    >
                        Projects
                        <Link to={Routes.PROJECTS} />
                    </MenuItem>
                    <MenuItem
                        icon={<FaMoneyCheck />}
                        active={!pathname.localeCompare(Routes.TIMESHEET)}
                    >
                        Timesheet
                        <Link to={Routes.TIMESHEET} />
                    </MenuItem>
                    <MenuItem
                        icon={<FaChartBar />}
                        active={!pathname.localeCompare(Routes.REPORT)}
                    >
                        Report
                        <Link to={Routes.REPORT} />
                    </MenuItem>
                    <MenuItem
                        icon={<FaUserFriends />}
                        active={!pathname.localeCompare(Routes.TEAM)}
                    >
                        Team
                        <Link to={Routes.TEAM} />
                    </MenuItem>
                </Menu>
            </SidebarContent>
        </ProSidebar>
    );
};

export default Sidebar;