
<<<<<<< HEAD
// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import Routes from '../../constants/routes'
// import {
//   ProSidebar,
//   Menu,
//   MenuItem,
//   SidebarHeader,
//   SidebarContent
// } from 'react-pro-sidebar'
// import {
//   FaBars,
//   FaThLarge,
//   FaFolder,
//   FaMoneyCheck,
//   FaChartBar,
//   FaUserFriends
// } from 'react-icons/fa'
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
=======
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Routes from '../../constants/routes'
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent
} from 'react-pro-sidebar'
>>>>>>> d3c8f94976537e6bcbfc69b6b523b07773b04c8e
import { FaBars, FaThLarge, FaFolder, FaMoneyCheck, FaChartBar,  FaUserFriends } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { logout } from '../../api/Authentication';

const Sidebar = props => {
  // const { pathname } = props.location


  const [collapsed, setCollapsed] = useState(false)
    const history = useHistory();

  useEffect(() => {
    console.log(pathname)
  }, [pathname])

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed)
  }

    const handleLogout = () => {
      logout();
      history.push(Routes.LOGIN);
    }

    return (
        <ProSidebar
            image={false}
            collapsed={collapsed}
            breakPoint="md"
            className="sidebar-custom-style position-fixed"
        >
        <SidebarHeader>
          <div
            style={{
              padding: '30px',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              cursor: 'pointer'
            }}>
              <FaBars onClick={handleCollapsedChange} />
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
                        Employees
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
  )
};
export default Sidebar;