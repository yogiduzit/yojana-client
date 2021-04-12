import React, { useState, useEffect } from 'react'
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
import getTimesheetFromProps from '../../utils/timesheet/getTimesheetFromProps'
import Loading from '../../components/Loading/Loading.jsx'
import NotFound from '../../components/NotFound/NotFound'
import {
  convertEndWeekToDate,
  convertEndWeekToString
} from '../../utils/timesheet/convertEndWeek'
import {
  loadProjectIds,
  loadWorkPackageIdsForProject
} from '../../utils/timesheet/loadProjectWP'
import { updateRow, updateTimesheet } from '../../api/Timesheet'
import Routes from '../../constants/routes'

const useStyles = makeStyles({
  // for the table
  table: {
    minWidth: 650
  }
})

function TimesheetEdit ({ location, user }) {
  const history = useHistory()
  const classes = useStyles()
  const [loaded, setLoaded] = useState(false)
  const [timesheet, setTimesheet] = useState(null)
  const [projectIds, setProjectIds] = useState([])
  // This is total hours of each day of rows (7 items)
  const [totalHours, setTotalHours] = useState([...INITIAL_HOURS])
  const [totalOfTotalHours, setTotalOfTotalHours] = useState(0)
  const [overtime, setOvertime] = useState(formatHours(0))
  // TODO: Need to figure out how to calculate flextime
  const [flextime, setFlextime] = useState(formatHours(0))
  const [hoursInputErrorMsg, setHoursInputErrorMsg] = useState('')
  // display none or block for p tag
  const [showInputErrorMsg, setShowInputErrorMsg] = useState('none')

  console.log('In Timesheet Edit', user)

  useEffect(() => {
    getTimesheetFromProps(location.state, {
      setTotalHours,
      setTotalOfTotalHours,
      setTimesheet,
      setLoaded
    })
    loadProjectIds({ setProjectIds })
  }, [location.state])

  const handleDateSelect = date => {
    setTimesheet({
      ...timesheet,
      endWeek: date,
      weekNum: moment(date).format('W')
    })
  }

  const handleDropdownChange = (e, rowToUpdate) => {
    if (e.target.name === 'projectId') {
      rowToUpdate.projectId = e.target.value
      loadWorkPackageIdsForProject(e.target.value, rowToUpdate, {
        timesheet,
        setTimesheet
      })
    } else if (e.target.name === 'workPackage') {
      rowToUpdate.workPackageId = e.target.value
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
    const updatedRows = timesheet.rows.filter(row => row.index !== rowToDelete.index)
    updatedRows.forEach((row, idx) => row.index = idx) // update index

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

  const handleSubmit = async () => {
    const updateTimesheetResponse = await updateTimesheet(timesheet.id, {
      id: timesheet.id,
      endWeek: typeof timesheet.endWeek === 'string' ? timesheet.endWeek : convertEndWeekToString(timesheet.endWeek),
      signature: timesheet.signature,
      feedback: timesheet.feedback,
      overtime: timesheet.overtime,
      flextime: timesheet.flextime,
      approvedAt: timesheet.approvedAt
    })

    if (
      !(
        updateTimesheetResponse.errors &&
        updateTimesheetResponse.errors.length > 0
      )
    ) {
      const updateRowsResponses = await Promise.all(
        timesheet.rows.map(
          async row =>
            await updateRow(updateTimesheetResponse.data.id, {
              index: row.index,
              notes: row.notes,
              projectId: row.projectId,
              workPackageId: row.workPackageId,
              hours: row.hours
            })
        )
      )

      if (
        updateRowsResponses.some(
          res => res.data.errors && res.data.errors.length > 0
        )
      ) {
        console.error('Error creating rows in the timesheet')
      } else {
        history.push(Routes.TIMESHEET)
      }
    }
  }

  return !loaded ? (
    <Loading />
  ) : !timesheet ? (
    <NotFound />
  ) : (
    <div className='main-body'>
      <h1 className='mb-5'>Edit Timesheet</h1>
      {/* header that has 3 columns*/}
      <table id='timesheetCreateHeader' className='mb-3'>
        <thead>
          <tr>
            <th>Employee Number: {user?.id}</th>
            <th style={{ textAlign: 'center' }}>
              Week Number: {timesheet.weekNum}
            </th>
            <th style={{ textAlign: 'right' }}>
              Week Ending:
              <DatePicker
                selected={
                  typeof timesheet.endWeek === 'string'
                    ? convertEndWeekToDate(timesheet.endWeek)
                    : timesheet.endWeek
                }
                onSelect={handleDateSelect}
                className='ml-3'
              />
            </th>
          </tr>
          <tr>
            <th>Name: {`${user?.fullName}`}</th>
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
                    value={row.workPackageId}
                    name='workPackage'
                    onChange={e => handleDropdownChange(e, row)}
                    displayEmpty
                    required
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value=''>
                      <em>Work Package</em>
                    </MenuItem>
                    {row.workPackageIdOptions?.length > 0 &&
                      row.workPackageIdOptions.map(item => (
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
                              setTotalOfTotalHours,
                              setOvertime,
                              setFlextime
                            })
                          }
                          type='number'
                          value={formatHours(row.hours[idx - 1])}
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
              <TableCell align='right'>{overtime}</TableCell>
              <TableCell colSpan={8} />
            </TableRow>
            <TableRow>
              <TableCell>Flextime</TableCell>
              <TableCell />
              <TableCell align='right'>{flextime}</TableCell>
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
          Confirm
        </Button>
      </span>
    </div>
  )
}

export default WithSidebar(WithHeader(TimesheetEdit))
