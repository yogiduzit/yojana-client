import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import WithSidebar from '../../hoc/WithSidebar'
import WithHeader from '../../hoc/WithHeader'
import '../../assets/css/timesheet.css'
import { createTimesheet } from '../../api/Timesheet'
import Routes from '../../constants/routes'
import { withRouter } from 'react-router';

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import {
  Button,
  makeStyles,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  // for the table
  table: {
    minWidth: 650
  }
})

const daysEnum = Object.freeze({
  SAT: 'Sat',
  SUN: 'Sun',
  MON: 'Mon',
  TUE: 'Tue',
  WED: 'Wed',
  THU: 'Thu',
  FRI: 'Fri'
})

// TODO: DELETE DUMMY
// dummy user which needs to be deleted later
const user = {
  empNum: 331,
  firstName: 'Joe',
  lastName: 'Bloggs'
}

// TODO: DELETE DUMMY
// dummy timesheet which needs to be deleted later
const dummyTimesheet = {
  weekEndDate: new Date(),
  weekNum: moment(new Date()).format('W'),
  signature: null,
  feedback: null,
  overtime: null,
  flextime: null,
  approvedAt: null,
  rows: [
    {
      projectId: '010',
      workPackage: 'SICK',
      totalHours: 0,
      hours: [0, 0, 0, 0, 0, 0, 0]
    }
  ]
}

// TODO: DELETE DUMMY
// dummy projectIds which needs to be deleted later
const dummyProjectIds = ['010', '1205', '3710']

// TODO: DELETE DUMMY
// dummy workPackages which needs to be deleted later
const dummyWorkPackages = ['SICK', 'COOL', 'AWES']

function TimesheetCreate() {
  const history = useHistory()
  const classes = useStyles()
  const [timesheet, setTimesheet] = useState(dummyTimesheet)
  const [projectIds, setProjectIds] = useState(dummyProjectIds)
  const [workPackages, setWorkPackages] = useState(dummyWorkPackages)
  // This is total hours of each day of rows (7 items)
  const [totalHours, setTotalHours] = useState([0, 0, 0, 0, 0, 0, 0])
  const [totalOfTotalHours, setTotalOfTotalHours] = useState(0)
  const [hoursInputErrorMsg, setHoursInputErrorMsg] = useState('')
  // display none or block for p tag
  const [showInputErrorMsg, setShowInputErrorMsg] = useState('none')

  const handleDateSelect = date => {
    setTimesheet({
      ...timesheet,
      weekEndDate: date,
      weekNum: moment(date).format('W')
    })
  }

  const handleDropdownChange = (e, rowToUpdate) => {
    if (e.target.name === 'projectId') {
      rowToUpdate.projectId = e.target.value
    } else if (e.target.name === 'workPackage') {
      rowToUpdate.workPackage = e.target.value
    }

    setTimesheet({
      ...timesheet,
      rows: [...timesheet.rows].map(row => {
        if (
          row.projectId === rowToUpdate.projectId &&
          row.workPackage === rowToUpdate.workPackage
        ) {
          return rowToUpdate
        } else return row
      })
    })
  }

  const formatHours = input => parseFloat(input).toFixed(1)

  // Gets triggered each time the user enters hours in an input field
  const handleHoursChange = (e, rowToUpdate) => {
    const value = formatHours(e.target.value)

    // validate input hour - to see if it exceeds 24 hrs
    if (value * 10 > 240) {
      setHoursInputErrorMsg(
        `${rowToUpdate.projectId}, ${rowToUpdate.workPackage}, ${e.target.name} - hours should not exceed 24`
      )
      setShowInputErrorMsg('block')
      // validate input hour - to see if it is not 0.5 based
    } else if ((value * 10) % 5 !== 0) {
      setHoursInputErrorMsg(
        `${rowToUpdate.projectId}, ${rowToUpdate.workPackage}, ${e.target.name} - hours are 0.5 hours based`
      )
      setShowInputErrorMsg('block')
    } else {
      // hide error message p tag
      setShowInputErrorMsg('none')
    }

    switch (e.target.name) {
      case daysEnum.SAT:
        rowToUpdate.hours[0] = value
        // update total hours for Saturday
        setTotalHours([
          timesheet.rows.reduce((acc, obj) => acc + obj.hours[0], 0),
          ...totalHours.slice(1)
        ])
        break
      case daysEnum.SUN:
        rowToUpdate.hours[1] = value
        // update total hours for Sunday
        setTotalHours([
          ...totalHours.slice(0, 1),
          timesheet.rows.reduce((acc, obj) => acc + obj.hours[1], 0),
          ...totalHours.slice(2)
        ])
        break
      case daysEnum.MON:
        rowToUpdate.hours[2] = value
        // update total hours for Monday
        setTotalHours([
          ...totalHours.slice(0, 2),
          timesheet.rows.reduce((acc, obj) => acc + obj.hours[2], 0),
          ...totalHours.slice(3)
        ])
        break
      case daysEnum.TUE:
        rowToUpdate.hours[3] = value
        // update total hours for Tuesday
        setTotalHours([
          ...totalHours.slice(0, 3),
          timesheet.rows.reduce((acc, obj) => acc + obj.hours[3], 0),
          ...totalHours.slice(4)
        ])
        break
      case daysEnum.WED:
        rowToUpdate.hours[4] = value
        // update total hours for Wednesday
        setTotalHours([
          ...totalHours.slice(0, 4),
          timesheet.rows.reduce((acc, obj) => acc + obj.hours[4], 0),
          ...totalHours.slice(5)
        ])
        break
      case daysEnum.THU:
        rowToUpdate.hours[5] = value
        // update total hours for Thursday
        setTotalHours([
          ...totalHours.slice(0, 5),
          timesheet.rows.reduce((acc, obj) => acc + obj.hours[5], 0),
          ...totalHours.slice(6)
        ])
        break
      case daysEnum.FRI:
        rowToUpdate.hours[6] = value
        // update total hours for Friday
        setTotalHours([
          ...totalHours.slice(0, 6),
          timesheet.rows.reduce((acc, obj) => acc + obj.hours[6], 0)
        ])
        break
      default:
        break
    }

    // update total hours
    rowToUpdate.totalHours = rowToUpdate.hours.reduce(
      (acc, item) => acc + item,
      0
    )

    // set total of total hours from each row
    setTotalOfTotalHours(
      timesheet.rows.reduce((acc, obj) => acc + obj.totalHours, 0)
    )

    // set the final state of timesheet
    setTimesheet({
      ...timesheet,
      rows: [...timesheet.rows].map(row => {
        if (
          row.projectId === rowToUpdate.projectId &&
          row.workPackage === rowToUpdate.workPackage
        ) {
          return rowToUpdate
        } else return row
      })
    })
  }

  const handleAddRow = () => {
    setTimesheet({
      ...timesheet,
      rows: [
        ...timesheet.rows,
        {
          projectId: '',
          workPackage: '',
          totalHours: 0,
          hours: [0, 0, 0, 0, 0, 0, 0]
        }
      ]
    })
  }

  const handleDeleteRow = rowToDelete => {
    setTimesheet({
      ...timesheet,
      rows: [...timesheet.rows].filter(
        row =>
          row.projectId !== rowToDelete.projectId &&
          row.workPackage !== rowToDelete.workPackage
      )
    })
  }

  const handleSubmit = () => {
    var timesheetDate = timesheet.weekEndDate;
    var month = timesheetDate.getMonth() + 1;
    var day = timesheetDate.getDate();
    var year = timesheetDate.getFullYear();
    var monthStr = "" + month;
    var dayStr = "" + day;
    if (month < 10) {
      monthStr = "0" + month;
    }
    if (day < 10) {
      dayStr = "0" + day;
    }
    var date =  year + "-" + monthStr + "-" + dayStr;
    var tempTimesheet = {
      ownerId: 0,
      endWeek: date,
      signature: null,
      feedback: null,
      status: "pending",
      overtime: null,
      flextime: null,
      approvedAt: null
    };
    console.log(tempTimesheet);
    console.log('2021-03-22' === date);
    createTimesheet(tempTimesheet);
  }

  return (
    <div className='body'>
      {/* header that has 3 columns*/}
      <table id='timesheetCreateHeader' className='mb-3'>
        <thead>
          <tr>
            <th>Employee Number: {user.empNum}</th>
            <th style={{ textAlign: 'center' }}>
              Week Number: {timesheet.weekNum}
            </th>
            <th style={{ textAlign: 'right' }}>
              Week Ending:
              <DatePicker
                selected={timesheet.weekEndDate}
                onSelect={handleDateSelect}
                className='ml-3'
              />
            </th>
          </tr>
          <tr>
            <th>Name: {`${user.firstName} ${user.lastName}`}</th>
          </tr>
        </thead>
      </table>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Project</TableCell>
              <TableCell>WP</TableCell>
              <TableCell align='right'>Total</TableCell>
              <TableCell align='right'>Sat</TableCell>
              <TableCell align='right'>Sun</TableCell>
              <TableCell align='right'>Mon</TableCell>
              <TableCell align='right'>Tue</TableCell>
              <TableCell align='right'>Wed</TableCell>
              <TableCell align='right'>Thu</TableCell>
              <TableCell align='right'>Fri</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timesheet.rows.map(row => (
              <TableRow
                key={`${row.projectId}_${row.workPackage}`}
                className='timesheetCreateRow'
              >
                <TableCell component='th' scope='row'>
                  <Select
                    value={row.projectId}
                    name='projectId'
                    onChange={e => handleDropdownChange(e, row)}
                    displayEmpty
                    required
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value=''>
                      <em>Project ID</em>
                    </MenuItem>
                    {projectIds.length > 0 &&
                      projectIds.map(item => (
                        <MenuItem value={item} key={item}>
                          {item}
                        </MenuItem>
                      ))}
                  </Select>
                </TableCell>
                <TableCell component='th' scope='row'>
                  <Select
                    value={row.workPackage}
                    name='workPackage'
                    onChange={e => handleDropdownChange(e, row)}
                    displayEmpty
                    required
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value=''>
                      <em>Work Package</em>
                    </MenuItem>
                    {workPackages.length > 0 &&
                      workPackages.map(item => (
                        <MenuItem value={item} key={item}>
                          {item}
                        </MenuItem>
                      ))}
                  </Select>
                </TableCell>
                <TableCell align='right'>
                  {formatHours(row.totalHours)}
                </TableCell>
                {/* {row.hours.map(day => (
                  <TableCell align='right'>
                    <input
                    onChange={e => handleHoursChange(e, row)}
                    type='number'
                    name={daysEnum.SAT}
                    value={row.hours[0]}
                    min='0'
                    max='24'
                    step='0.5'
                  />
                  </TableCell>
                ))} */}
                <TableCell align='right'>
                  <input
                    onChange={e => handleHoursChange(e, row)}
                    type='number'
                    name={daysEnum.SAT}
                    value={row.hours[0]}
                    min='0'
                    max='24'
                    step='0.5'
                  />
                </TableCell>
                <TableCell align='right'>
                  <input
                    onChange={e => handleHoursChange(e, row)}
                    type='number'
                    name={daysEnum.SUN}
                    value={row.hours[1]}
                    min='0'
                    max='24'
                    step='0.5'
                  />
                </TableCell>
                <TableCell align='right'>
                  <input
                    onChange={e => handleHoursChange(e, row)}
                    type='number'
                    name={daysEnum.MON}
                    value={row.hours[2]}
                    min='0'
                    max='24'
                    step='0.5'
                  />
                </TableCell>
                <TableCell align='right'>
                  <input
                    onChange={e => handleHoursChange(e, row)}
                    type='number'
                    name={daysEnum.TUE}
                    value={row.hours[3]}
                    min='0'
                    max='24'
                    step='0.5'
                  />
                </TableCell>
                <TableCell align='right'>
                  <input
                    onChange={e => handleHoursChange(e, row)}
                    type='number'
                    name={daysEnum.WED}
                    value={row.hours[4]}
                    min='0'
                    max='24'
                    step='0.5'
                  />
                </TableCell>
                <TableCell align='right'>
                  <input
                    onChange={e => handleHoursChange(e, row)}
                    type='number'
                    name={daysEnum.THU}
                    value={row.hours[5]}
                    min='0'
                    max='24'
                    step='0.5'
                  />
                </TableCell>
                <TableCell align='right'>
                  <input
                    onChange={e => handleHoursChange(e, row)}
                    type='number'
                    name={daysEnum.FRI}
                    value={row.hours[6]}
                    min='0'
                    max='24'
                    step='0.5'
                  />
                </TableCell>
                <TableCell align='right'>
                  <button
                    type='button'
                    onClick={() => handleDeleteRow(row)}
                    className='timesheetCreateActionsIcon'
                  >
                    <DeleteIcon style={{ color: '#DD5B24' }} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} />
              <TableCell colSpan={7}>
                <p
                  className='timesheetCreateInputValidationMessage'
                  style={{ display: showInputErrorMsg }}
                >
                  {hoursInputErrorMsg}
                </p>
              </TableCell>
              <TableCell align='right'>
                <button
                  type='button'
                  onClick={handleAddRow}
                  className='timesheetCreateActionsIcon'
                >
                  Add Row
                </button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell></TableCell>
              <TableCell align='right'>
                {formatHours(totalOfTotalHours)}
              </TableCell>
              <TableCell align='right'>{formatHours(totalHours[0])}</TableCell>
              <TableCell align='right'>{formatHours(totalHours[1])}</TableCell>
              <TableCell align='right'>{formatHours(totalHours[2])}</TableCell>
              <TableCell align='right'>{formatHours(totalHours[3])}</TableCell>
              <TableCell align='right'>{formatHours(totalHours[4])}</TableCell>
              <TableCell align='right'>{formatHours(totalHours[5])}</TableCell>
              <TableCell align='right'>{formatHours(totalHours[6])}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Overtime</TableCell>
              <TableCell></TableCell>
              <TableCell align='right'>?</TableCell>
              <TableCell colSpan={8} />
            </TableRow>
            <TableRow>
              <TableCell>Flextime</TableCell>
              <TableCell></TableCell>
              <TableCell align='right'>?</TableCell>
              <TableCell colSpan={8} />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <span style={{ float: 'right' }} className='mt-5'>
        <Button
          variant='contained'
          color='primary'
          className='mr-4'
          onClick={() => history.goBack()}
        >
          Cancel
        </Button>
        <Button variant='contained' color='primary' onClick={handleSubmit}>
          Submit
        </Button>
      </span>
    </div>
  )
}

export default WithSidebar(WithHeader(TimesheetCreate))
