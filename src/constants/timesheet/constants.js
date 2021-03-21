// Enum for order by
export const orderByEnum = Object.freeze({
  WEEK_END_DATE: 0,
  SUBMITTED_DATE: 1,
  TOTAL_HOURS: 2,
  STATUS: 3
})

// Enum for timesheet status
export const statusEnum = Object.freeze({
  APPROVED: 'Approved',
  IN_PROGRESS: 'In Progress',
  REJECTED: 'Rejected'
})

export const daysEnum = Object.freeze({
  TOT: 'Total',
  SAT: 'Sat',
  SUN: 'Sun',
  MON: 'Mon',
  TUE: 'Tue',
  WED: 'Wed',
  THU: 'Thu',
  FRI: 'Fri'
})

export const INITIAL_HOURS = Object.freeze([0, 0, 0, 0, 0, 0, 0])
export const SAT_IDX = 0
export const SUN_IDX = 1
export const MON_IDX = 2
export const TUE_IDX = 3
export const WED_IDX = 4
export const THU_IDX = 5
export const FRI_IDX = 6
export const DAYS_IN_WEEK = 7

// function for creating dummy data
function createData (id, date, totalHours, status, timesheetRows) {
  return {
    id: id,
    weekEndDate: date,
    weekNum: undefined,
    submittedDate: new Date(),
    totalHours: totalHours, // TODO: Should we calculate totalhours or timesheet in client side or server side?
    status: status,
    rows: timesheetRows
  }
}

const dummyTimesheetRows = [
  {
    projectId: '010',
    workPackage: 'SICK',
    hours: [1, 2, 0, 3, 2, 0, 0]
  },
  {
    projectId: '1205',
    workPackage: 'BRAVO',
    hours: [5, 5, 2, 0, 0, 2, 3]
  }
]

// dummy data
export const dummyTimesheets = [
  createData(1, new Date(1995, 11, 17), 40, 'Approved', dummyTimesheetRows),
  createData(2, new Date(2002, 4, 5), 30, 'Rejected', dummyTimesheetRows),
  createData(3, new Date(2021, 5, 3), 20, 'Approved', dummyTimesheetRows),
  createData(4, new Date(1999, 7, 8), 20, 'In Progress', dummyTimesheetRows),
  createData(5, new Date(2002, 4, 5), 40, 'Rejected', dummyTimesheetRows),
  createData(6, new Date(1995, 11, 17), 20, 'In Progress', dummyTimesheetRows),
  createData(7, new Date(2002, 4, 5), 30, 'Rejected', dummyTimesheetRows),
  createData(8, new Date(2021, 5, 3), 40, 'Approved', dummyTimesheetRows),
  createData(9, new Date(1999, 7, 8), 40, 'Rejected', dummyTimesheetRows),
  createData(10, new Date(1999, 7, 8), 20, 'Rejected', dummyTimesheetRows),
  createData(11, new Date(1995, 11, 17), 20, 'In Progress', dummyTimesheetRows),
  createData(12, new Date(1995, 11, 17), 40, 'In Progress', dummyTimesheetRows),
  createData(13, new Date(2021, 5, 3), 40, 'Approved', dummyTimesheetRows),
  createData(14, new Date(1995, 11, 17), 30, 'Approved', dummyTimesheetRows),
  createData(15, new Date(1999, 7, 8), 40, 'Approved', dummyTimesheetRows),
  createData(16, new Date(1999, 7, 8), 30, 'In Progress', dummyTimesheetRows),
  createData(17, new Date(2002, 4, 5), 20, 'In Progress', dummyTimesheetRows),
  createData(18, new Date(2002, 4, 5), 40, 'Approved', dummyTimesheetRows)
]
