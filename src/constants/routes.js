const Routes = {
    SEPARATOR: '/',
    HOME: '/',
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    PROJECTS: '/projects',
    ADDPROJECT: '/projects-create',
    VIEW_PROJECT: '/project/:id',
    VIEW_SUB_WORK_PACKAGE: '/project/:id/wp/:wpId',
    TIMESHEET: '/timesheets',
    TIMESHEET_CREATE: '/timesheet-create',
    TIMESHEET_DETAIL: '/timesheet/:id',
    TIMESHEET_EDIT: '/timesheet-edit/:id',
    REPORT: '/report',
    TEAM: '/team',
    LEAVE_REQUEST_CREATE: '/leave-request-create',
    LEAVE_REQUEST_LIST: '/leave-request-list',
    LEAVE_REQUEST_DETAIL: '/leave-request-detail/:id',
    EMPLOYEE: '/employees',
    ADDEMPLOYEE: '/employee/create',
    EMPLOYEEPROFILE: '/employeeprofile',
};

export default Routes;