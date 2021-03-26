import React, { useState } from 'react'
import WithHeader from '../../hoc/WithHeader'
import WithSidebar from '../../hoc/WithSidebar'

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
import { formatMMDDYYYY } from '../../utils/dateFormatter'

const dummyEmployee = {
  id: 100
}

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

  // TODO: employeeId can be passed from props
  const [employee, setEmployee] = useState(dummyEmployee)
  const [description, setDescription] = useState('')
  const [request, setRequest] = useState({})

  const handleDropdownChange = e => {
    setRequest({
      ...request,
      type: e.target.value
    })
  }

  const handleDescriptionChange = e => {
    setDescription(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    setRequest({
      ...request,
      description: description,
      employeeId: employee.id
    })

    console.log('submitted!')
  }

  return (
    <div className='main-body'>
      <h1 className='mb-5'>Leave Request</h1>
      <table style={{ width: '60%' }}>
        <tbody>
          <tr>
            <td>
              <TextField
                id='employee-id-readonly'
                label='Employee ID'
                defaultValue={employee.id}
                InputProps={{
                  readOnly: true
                }}
              />
            </td>
            <td style={{ textAlign: 'right' }}>
              Date: {formatMMDDYYYY(new Date())}
            </td>
          </tr>
          <tr>
            <td>
              <FormControl className={classes.formControl}>
                <InputLabel id='type-select-label'>Type</InputLabel>
                <Select
                  labelId='type-select-label'
                  id='type-select'
                  value={request.type}
                  onChange={handleDropdownChange}
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
          </tr>
          <tr>
            <td colspan='2'>
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
