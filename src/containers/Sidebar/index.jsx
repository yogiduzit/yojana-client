import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Routes from '../../constants/routes'
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent
} from 'react-pro-sidebar'
import {
  FaBars,
  FaThLarge,
  FaFolder,
  FaMoneyCheck,
  FaChartBar,
  FaUserFriends
} from 'react-icons/fa'

const Sidebar = props => {
  const { pathname } = props.location

  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    console.log(pathname)
  }, [pathname])

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed)
  }

  return (
    <ProSidebar
      image={false}
      collapsed={collapsed}
      breakPoint='md'
      className='sidebar-custom-style'
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
          <FaBars onClick={handleCollapsedChange} />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape='circle'>
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
            active={
              pathname.localeCompare(Routes.TIMESHEET) === 0 ||
              pathname.localeCompare(Routes.TIMESHEET_CREATE) === 0 ||
              pathname.includes(
                Routes.TIMESHEET_DETAIL.substring(
                  0,
                  Routes.TIMESHEET_DETAIL.lastIndexOf(Routes.SEPARATOR)
                )
              )
            }
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
            active={pathname.localeCompare(Routes.TEAM) === 0}
          >
            Team
            <Link to={Routes.TEAM} />
          </MenuItem>
        </Menu>
      </SidebarContent>
    </ProSidebar>
  )
}

export default Sidebar
