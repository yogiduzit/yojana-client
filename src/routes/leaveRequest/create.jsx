import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import WithHeader from '../../hoc/WithHeader'
import WithSidebar from '../../hoc/WithSidebar'
import DatePicker from 'react-datepicker'

import { leaveTypes } from '../../constants/leaveRequest/constants'

import '../../assets/css/body-component.css'
import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core'
import { fetchEmployeeById } from '../../api/Employee'
import { createLeaveRequest } from '../../api/LeaveRequest'

const useStyles = makeStyles(theme => ({
  formControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

function LeaveRequestCreate () {
  const classes = useStyles()
  const history = useHistory()

  // TODO: employeeId can be passed from props
  const [empId, setEmpId] = useState(null)
  const [empName, setEmpName] = useState('')
  const [request, setRequest] = useState({})
  const [errorMessages, setErrorMessages] = useState([])

  const errorMessagesValue = Object.freeze({
    EMPLOYEE: 'You need to choose employee.',
    START_DATE: 'You need to choose start date.',
    END_DATE: 'You need to choose end date.',
    START_END_DATE: 'End date should be later than or equal to start date.',
    TYPE: 'You need to choose type.',
    DESCRIPTION: 'You need to add description.'
  })

  const handleEmpIdChange = e => {
    let value = parseInt(e.target.value)
    setEmpId(value)
    setEmpName('')
  }

  const handleEmpIdEnter = e => {
    const ENTER_KEY = 'Enter'
    if (e.key === ENTER_KEY) {
      fetchEmployeeById(empId)
        .then(res => {
          console.log(res)
          setEmpName(res.data.data.employee.fullName)
          setRequest({
            ...request,
            empId: empId
          })
        })
        .catch(e => {
          console.error(e)
          setEmpName('')
        })
    }
  }

  const handleDateSelect = (date, forWhat) => {
    if (date) {
      if (forWhat === 'startDate') {
        setRequest({
          ...request,
          startDate: date.getTime()
        })
      } else if (forWhat === 'endDate') {
        setRequest({
          ...request,
          endDate: date.getTime()
        })
      }
    }
  }

  const handleTypeChange = e => {
    setRequest({
      ...request,
      type: e.target.value
    })
  }

  const handleDescriptionChange = e => {
    setRequest({
      ...request,
      description: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    validateAndErrorMessage()

    if (errorMessages.length === 0) {
      createLeaveRequest(request)
        .then(res => {
          console.error(res)
          history.push('/leave-request-list')
        })
        .catch(e => console.error(e))
    }
  }

  const validateAndErrorMessage = () => {
    let errorMessagesArray = []
    if (!request.empId || !empName) {
      errorMessagesArray.push(errorMessagesValue.EMPLOYEE)
    } else {
      errorMessagesArray = errorMessagesArray.filter(
        item => item !== errorMessagesValue.EMPLOYEE
      )
    }
    if (!request.startDate) {
      errorMessagesArray.push(errorMessagesValue.START_DATE)
    } else {
      errorMessagesArray = errorMessagesArray.filter(
        item => item !== errorMessagesValue.START_DATE
      )
    }
    if (!request.endDate) {
      errorMessagesArray.push(errorMessagesValue.END_DATE)
    } else {
      errorMessagesArray = errorMessagesArray.filter(
        item => item !== errorMessagesValue.END_DATE
      )
    }
    if (request.endDate < request.startDate) {
      errorMessagesArray.push(errorMessagesValue.START_END_DATE)
    } else {
      errorMessagesArray = errorMessagesArray.filter(
        item => item !== errorMessagesValue.START_END_DATE
      )
    }
    if (!request.type) {
      errorMessagesArray.push(errorMessagesValue.TYPE)
    } else {
      errorMessagesArray = errorMessagesArray.filter(
        item => item !== errorMessagesValue.TYPE
      )
    }
    if (!request.description) {
      errorMessagesArray.push(errorMessagesValue.DESCRIPTION)
    } else {
      errorMessagesArray = errorMessagesArray.filter(
        item => item !== errorMessagesValue.DESCRIPTION
      )
    }

    setErrorMessages(errorMessagesArray)
  }

  return (
    <div className='main-body'>
      <h1 className='mb-5'>Leave Request</h1>
      <table style={{ width: '75%' }}>
        <tbody>
          <tr>
            <td>
              <TextField
                id='employee-id-readonly'
                label='Employee ID'
                onChange={handleEmpIdChange}
                onKeyDown={handleEmpIdEnter}
                helperText='Type employee ID and press ENTER'
              />
            </td>
            <td style={{ textAlign: 'right' }}>
              Start date:
              <DatePicker
                selected={request.startDate}
                onSelect={e => handleDateSelect(e, 'startDate')}
                className='ml-3'
              />
            </td>
            <td style={{ textAlign: 'right' }}>
              End date:{' '}
              <DatePicker
                selected={request.endDate}
                onSelect={e => handleDateSelect(e, 'endDate')}
                className='ml-3'
              />
            </td>
          </tr>
          <tr>
            <td>
              <p className='mt-3'>Employee Name: {empName}</p>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <FormControl className={classes.formControl}>
                <InputLabel id='type-select-label'>Type</InputLabel>
                <Select
                  labelId='type-select-label'
                  id='type-select'
                  value={request.type}
                  onChange={handleTypeChange}
                >
                  {Object.values(leaveTypes).map((item, key) => (
                    <MenuItem key={key} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colspan='3'>
              <TextField
                id='outlined-multiline-static'
                multiline
                placeholder='Description'
                fullWidth
                required
                rows={9}
                variant='outlined'
                onChange={handleDescriptionChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <p></p>
      {errorMessages.map(item => (
        <p style={{ margin: '0', color: 'red' }}>{item}</p>
      ))}
      <Button
        variant='contained'
        color='primary'
        onClick={handleSubmit}
        className='mt-4'
      >
        Submit
      </Button>
    </div>
  )
}

export default WithSidebar(WithHeader(LeaveRequestCreate))
