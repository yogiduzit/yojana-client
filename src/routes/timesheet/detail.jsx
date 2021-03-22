import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import WithSidebar from '../../hoc/WithSidebar'
import WithHeader from '../../hoc/WithHeader'
import '../../assets/css/timesheet.css'
import { daysEnum } from '../../constants/timesheet/constants'
import { formatHours } from '../../utils/timesheet/totalHoursCalcFunctions'
import { formatMMDDYYYY } from '../../utils/dateFormatter'
import statusIndicator from '../../components/timesheet/statusIndicator'

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
import getTimesheetFromProps from '../../utils/timesheet/getTimesheetFromProps'
import Loading from '../../components/Loading/Loading.jsx'
import NotFound from '../../components/NotFound/NotFound'

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
    getTimesheetFromProps(location.state, {
      setTotalHours,
      setTotalOfTotalHours,
      setTimesheet,
      setLoaded
    })
  }, [location.state])

  return !loaded ? (
    <Loading />
  ) : !timesheet ? (
    <NotFound />
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
