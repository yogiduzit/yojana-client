import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
import { FiLogOut } from 'react-icons/fi';
import { logout } from '../../api/Authentication';

const Sidebar = (props) => {
    useEffect(() => {
        console.log(pathname)
    },[])

    const { pathname } = props.location;
    const history = useHistory();

    const [collapsed, setCollapsed] = useState(false);

    const handleCollapsedChange = () => {
        setCollapsed(!collapsed);
    };

    const handleLogout = () => {
      logout();
      history.push(Routes.LOGIN);
    }

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
                        cursor: 'pointer'
                    }}
                >
                    <FaBars onClick={handleCollapsedChange}/>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem
                        icon={<FaThLarge />}
                        active={pathname.localeCompare(Routes.DASHBOARD) === 0}
                    >
                        Dashboard
                        <Link to={Routes.DASHBOARD} />
                    </MenuItem>
                    <MenuItem
                        icon={<FaFolder />}
                        active={pathname.localeCompare(Routes.PROJECTS) === 0}
                    >
                        Projects
                        <Link to={Routes.PROJECTS} />
                    </MenuItem>
                    <MenuItem
                        icon={<FaMoneyCheck />}
                        active={pathname.localeCompare(Routes.TIMESHEET) === 0}
                    >
                        Timesheet
                        <Link to={Routes.TIMESHEET} />
                    </MenuItem>
                    <MenuItem
                        icon={<FaChartBar />}
                        active={pathname.localeCompare(Routes.REPORT) === 0}
                    >
                        Report
                        <Link to={Routes.REPORT} />
                    </MenuItem>
                    <MenuItem
                        icon={<FaUserFriends />}
                        active={pathname.localeCompare(Routes.EMPLOYEE) === 0}
                    >
                        Team
                        <Link to={Routes.EMPLOYEE} />
                    </MenuItem>
                    <MenuItem
                        icon={<FiLogOut />}
                        onClick={handleLogout}
                    >
                        Logout
                    </MenuItem>
                </Menu>
            </SidebarContent>
        </ProSidebar>
    );
};

export default Sidebar;