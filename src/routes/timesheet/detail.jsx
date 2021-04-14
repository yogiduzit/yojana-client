import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import WithSidebar from '../../hoc/WithSidebar'
import WithHeader from '../../hoc/WithHeader'
import '../../assets/css/body-component.css'
import '../../assets/css/timesheet.css'
import { daysEnum, statusEnum } from '../../constants/timesheet/constants'
import { formatHours } from '../../utils/timesheet/totalHoursCalcFunctions'
import { formatMMDDYYYY } from '../../utils/dateFormatter'
import statusIndicator from '../../components/timesheet/statusIndicator'
import { Container } from 'reactstrap'

import {
  Button,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import getTimesheetFromProps from '../../utils/timesheet/getTimesheetFromProps'
import Loading from '../../components/Loading/Loading.jsx'
import NotFound from '../../components/NotFound/NotFound'
import { fetchEmployeeById } from '../../api/Employee'
import { deleteTimesheet, updateTimesheet } from '../../api/Timesheet'
import Routes from '../../constants/routes'
import { toPascalCase } from '../../utils/string'
import { convertEndWeekToString } from '../../utils/timesheet/convertEndWeek'

const useStyles = makeStyles({
  // for the table
  table: {
    minWidth: 650
  }
})

function TimesheetDetail ({ location, user }) {
  const history = useHistory()
  const classes = useStyles()
  const [loaded, setLoaded] = useState(false)
  const [employee, setEmployee] = useState(null)
  const [timesheet, setTimesheet] = useState(null)
  // This is total hours of each day of rows (7 items)
  const [totalHours, setTotalHours] = useState([])
  const [totalOfTotalHours, setTotalOfTotalHours] = useState(0)

  useEffect(() => {
    if (location.state) {
      fetchEmployeeById(location.state.ownerId)
        .then(res => {
          setEmployee(res.data.data.employee)
          getTimesheetFromProps(location.state, {
            setTotalHours,
            setTotalOfTotalHours,
            setTimesheet,
            setLoaded
          })
        })
        .catch(e => console.error(e))
    }
  }, [location.state])

  // Helper function for updating timesheet status
  const updateTimesheetStatus = async statusToUpdate => {
    const updateTimesheetResponse = await updateTimesheet(timesheet.id, {
      id: timesheet.id,
      endWeek:
        typeof timesheet.endWeek === 'string'
          ? timesheet.endWeek
          : convertEndWeekToString(timesheet.endWeek),
      signature: timesheet.signature,
      feedback: timesheet.feedback,
      status: statusToUpdate,
      overtime: timesheet.overtime,
      flextime: timesheet.flextime,
      approvedAt: timesheet.approvedAt,
      ownerId: user.id,
      audit: {
        ...timesheet.audit,
        updatedAt: new Date().getTime()
      }
    })
    if (
      !(
        updateTimesheetResponse.errors &&
        updateTimesheetResponse.errors.length > 0
      )
    ) {
      history.push(Routes.TIMESHEET)
    } else {
      console.error(
        'Failed to update timesheet status',
        updateTimesheetResponse.errors
      )
    }
  }

  const handleTimesheetSubmit = e => {
    e.preventDefault()
    updateTimesheetStatus(statusEnum.SUBMITTED)
  }

  const handleTimesheetApprove = e => {
    e.preventDefault()
    updateTimesheetStatus(statusEnum.APPROVED)
  }

  const handleTimesheetReject = e => {
    e.preventDefault()
    updateTimesheetStatus(statusEnum.DENIED)
  }

  // For admin only, to delete the timesheet.
  const handleTimesheetDelete = e => {
    e.preventDefault()
    const deleteConfirmMessage = 'Are you sure to delete this timesheet?'
    if (window.confirm(deleteConfirmMessage)) {
      deleteTimesheet(timesheet.id)
        .then(res => console.log(res))
        .catch(e => console.error(e))
      history.push(Routes.TIMESHEET)
    }
  }

  const handleFeedbackChange = e => {
    setTimesheet({
      ...timesheet,
      feedback: e.target.value
    })
  }

  const feedbackForTimesheetApprover = (
    <div className='mt-5'>
      <h3 className='mb-3'>Feedback</h3>
      <TextField
        id='outlined-multiline-static'
        multiline
        placeholder='Feedback'
        fullWidth
        required
        rows={3}
        variant='outlined'
        onChange={handleFeedbackChange}
      />
    </div>
  )

  return !loaded ? (
    <Loading />
  ) : !timesheet ? (
    <NotFound />
  ) : (
    <Container>
      <div className='body'>
        {/* header that has 3 columns*/}
        <table id='timesheetCreateHeader' className='mb-3'>
          <thead>
            <tr>
              <th>Employee Number: {employee?.id}</th>
              <th style={{ textAlign: 'center' }}>
                Week Number: {timesheet.weekNum && timesheet.weekNum}
              </th>
              <th style={{ textAlign: 'right' }}>
                Week Ending: {formatMMDDYYYY(timesheet.weekEndDate)}
              </th>
            </tr>
            <tr>
              <th>Name: {employee?.fullName}</th>
              <th></th>
              <th style={{ textAlign: 'right' }}>
                Status: {statusIndicator(timesheet.status, 'ml-3')}{' '}
                {toPascalCase(timesheet.status)}
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
                    {row.workPackageId}
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
        {/* Visible for only timesheet approver */}
        {user?.isTimesheetApprover && feedbackForTimesheetApprover}
        <span style={{ float: 'right' }} className='mt-5'>
          <Button
            variant='contained'
            color='primary'
            onClick={() => history.push('/timesheets')}
          >
            Back
          </Button>
          {/* Visible for normal users except admin and timesheet approver */}
          {!(user?.admin && user?.isTimesheetApprover) &&
            timesheet.status !== statusEnum.SUBMITTED && (
              <Button
                variant='contained'
                color='primary'
                onClick={handleTimesheetSubmit}
                className='ml-3'
              >
                Submit
              </Button>
            )}
          {/* Visible for only timesheet approver */}
          {user?.isTimesheetApprover &&
            timesheet.status === statusEnum.SUBMITTED && (
              <>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleTimesheetApprove}
                  className='ml-3'
                >
                  Approve
                </Button>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={handleTimesheetReject}
                  className='ml-3'
                >
                  Reject
                </Button>
              </>
            )}
          {/* Visible for only admin */}
          {user?.admin && (
            <Button
              variant='contained'
              color='secondary'
              onClick={handleTimesheetDelete}
              className='ml-3'
            >
              Delete
            </Button>
          )}
        </span>
      </div>
    </Container>
  )
}

export default WithSidebar(WithHeader(TimesheetDetail))
