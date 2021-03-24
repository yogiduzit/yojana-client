import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import WithSidebar from '../../hoc/WithSidebar'
import WithHeader from '../../hoc/WithHeader'
import '../../assets/css/body-component.css'
import '../../assets/css/timesheet.css'
import { daysEnum, INITIAL_HOURS } from '../../constants/timesheet/constants'
import {
  formatHours,
  calculateTotalHours,
  handleHoursChange
} from '../../utils/timesheet/totalHoursCalcFunctions'

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
  rows: [
    {
      projectId: '010',
      workPackage: 'SICK',
      totalHours: 0,
      hours: [...INITIAL_HOURS]
    }
  ]
}

// TODO: DELETE DUMMY
// dummy projectIds which needs to be deleted later
const dummyProjectIds = ['010', '1205', '3710']

// TODO: DELETE DUMMY
// dummy workPackages which needs to be deleted later
const dummyWorkPackages = ['SICK', 'COOL', 'AWES']

function TimesheetCreate () {
  const history = useHistory()
  const classes = useStyles()
  const [timesheet, setTimesheet] = useState(dummyTimesheet)
  const [projectIds, setProjectIds] = useState(dummyProjectIds)
  const [workPackages, setWorkPackages] = useState(dummyWorkPackages)
  // This is total hours of each day of rows (7 items)
  const [totalHours, setTotalHours] = useState([...INITIAL_HOURS])
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

  const handleAddRow = () => {
    setTimesheet({
      ...timesheet,
      rows: [
        ...timesheet.rows,
        {
          projectId: '',
          workPackage: '',
          totalHours: 0,
          hours: [...INITIAL_HOURS]
        }
      ]
    })
  }

  const handleDeleteRow = rowToDelete => {
    const updatedRows = [...timesheet.rows].filter(
      row =>
        row.projectId !== rowToDelete.projectId &&
        row.workPackage !== rowToDelete.workPackage
    )

    calculateTotalHours(
      undefined,
      undefined,
      {
        totalHours,
        setTotalHours,
        timesheet,
        setTotalOfTotalHours
      },
      updatedRows
    )

    setTimesheet({
      ...timesheet,
      rows: updatedRows
    })
  }

  const handleSubmit = () => {
    console.log('submit!')
  }

  return (
    <div className='main-body'>
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
              {Object.values(daysEnum).map((item, idx) => (
                <TableCell align='right' key={idx}>
                  {item}
                </TableCell>
              ))}
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
                {Object.keys(daysEnum).map((item, idx) => {
                  if (idx === 0) {
                    return (
                      <TableCell align='right' key={idx}>
                        {formatHours(row.totalHours)}
                      </TableCell>
                    )
                  } else {
                    return (
                      <TableCell align='right' key={idx}>
                        <input
                          onChange={e =>
                            handleHoursChange(e, --idx, row, {
                              setHoursInputErrorMsg,
                              setShowInputErrorMsg,
                              totalHours,
                              setTotalHours,
                              timesheet,
                              setTimesheet,
                              setTotalOfTotalHours
                            })
                          }
                          type='number'
                          value={row.hours[idx - 1]}
                          min='0'
                          max='24'
                          step='0.5'
                        />
                      </TableCell>
                    )
                  }
                })}
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
              {Object.keys(daysEnum).map((_, idx) => {
                if (idx === 0) {
                  return (
                    <TableCell align='right' key={idx}>
                      {formatHours(totalOfTotalHours)}
                    </TableCell>
                  )
                } else {
                  return (
                    <TableCell align='right' key={idx}>
                      {formatHours(totalHours[idx - 1])}
                    </TableCell>
                  )
                }
              })}
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Overtime</TableCell>
              <TableCell />
              <TableCell align='right'>?</TableCell>
              <TableCell colSpan={8} />
            </TableRow>
            <TableRow>
              <TableCell>Flextime</TableCell>
              <TableCell />
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
