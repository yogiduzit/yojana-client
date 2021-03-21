import React, { useState, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import WithSidebar from '../../hoc/WithSidebar'
import WithHeader from '../../hoc/WithHeader'
import '../../assets/css/timesheet.css'
import {
  daysEnum,
  DAYS_IN_WEEK,
  INITIAL_HOURS
} from '../../constants/timesheet/constants'
import { formatHours } from '../../utils/timesheet/totalHoursCalcFunctions'
import { formatMMDDYYYY } from '../../utils/dateFormatter'
import statusIndicator from '../../components/timesheet/statusIndicator'

import moment from 'moment'
import {
  Button,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
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

function TimesheetDetail ({ location }) {
  const history = useHistory()
  const classes = useStyles()
  const [loaded, setLoaded] = useState(false)
  const [timesheet, setTimesheet] = useState(null)
  // This is total hours of each day of rows (7 items)
  const [totalHours, setTotalHours] = useState([])
  const [totalOfTotalHours, setTotalOfTotalHours] = useState(0)

  useEffect(() => {
    if (location.state) {
      // spread timesheet object that has been retrieved from props
      let timesheetToSave = { ...location.state }

      // add total hours by row
      timesheetToSave.rows.forEach(row => {
        let totalHours = 0
        totalHours = row.hours.reduce((acc, hour) => acc + hour, 0)
        row.totalHours = totalHours
      })

      // add total hours of total hours and by each day
      let totalHoursToSave = [...INITIAL_HOURS]
      let totalOfTotalHoursToSave = 0
      timesheetToSave.rows.forEach(row => {
        totalOfTotalHoursToSave += row.totalHours
        for (let i = 0; i < DAYS_IN_WEEK; i++) {
          totalHoursToSave[i] += row.hours[i]
        }
      })
      setTotalHours(totalHoursToSave)
      setTotalOfTotalHours(totalOfTotalHoursToSave)

      // add week number field in timesheet object
      timesheetToSave.weekNum = moment(timesheetToSave.weekEndDate).format('W')

      setTimesheet(timesheetToSave)
      setLoaded(true)
    }
  }, [location.state])

  return !loaded ? (
    <div>Loading...</div>
  ) : (
    <div className='body'>
      {/* header that has 3 columns*/}
      <table id='timesheetCreateHeader' className='mb-3'>
        <thead>
          <tr>
            <th>Employee Number: {user.empNum}</th>
            <th style={{ textAlign: 'center' }}>
              Week Number: {timesheet.weekNum && timesheet.weekNum}
            </th>
            <th style={{ textAlign: 'right' }}>
              Week Ending: {formatMMDDYYYY(timesheet.weekEndDate)}
            </th>
          </tr>
          <tr>
            <th>Name: {`${user.firstName} ${user.lastName}`}</th>
            <th></th>
            <th style={{ textAlign: 'right' }}>
              Status: {statusIndicator(timesheet.status, 'ml-3')}{' '}
              {timesheet.status}
            </th>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {timesheet.rows.map(row => (
              <TableRow
                key={`${row.projectId}_${row.workPackage}`}
                className='timesheetCreateRow'
              >
                <TableCell component='th' scope='row'>
                  {row.projectId}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {row.workPackage}
                </TableCell>
                <TableCell align='right'>
                  {formatHours(row.totalHours)}
                </TableCell>
                {row.hours.map((item, idx) => (
                  <TableCell align='right' key={idx}>
                    {formatHours(item)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
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
            </TableRow>
            <TableRow>
              <TableCell>Overtime</TableCell>
              <TableCell />
              <TableCell align='right'>?</TableCell>
              <TableCell colSpan={7} />
            </TableRow>
            <TableRow>
              <TableCell>Flextime</TableCell>
              <TableCell />
              <TableCell align='right'>?</TableCell>
              <TableCell colSpan={7} />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <span style={{ float: 'right' }} className='mt-5'>
        <Button
          variant='contained'
          color='primary'
          onClick={() => history.push('/timesheet')}
        >
          Back
        </Button>
      </span>
    </div>
  )
}

export default WithSidebar(WithHeader(TimesheetDetail))
