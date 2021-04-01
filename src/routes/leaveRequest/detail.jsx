import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import WithHeader from '../../hoc/WithHeader'
import WithSidebar from '../../hoc/WithSidebar'
import Loading from '../../components/Loading/Loading'
import NotFound from '../../components/NotFound/NotFound'

import '../../assets/css/body-component.css'
import { Button, TextField } from '@material-ui/core'
import { formatMMDDYYYY } from '../../utils/dateFormatter'

function LeaveRequestDetail ({ match, location }) {
  const history = useHistory()

  const [loaded, setLoaded] = useState(false)
  const [request, setRequest] = useState(null)

  useEffect(() => {
    if (location.state) {
      setRequest({
        ...location.state
      })
      setLoaded(true)
    }
    setLoaded(true)
  }, [location.state])

  return !loaded ? (
    <Loading />
  ) : !request ? (
    <NotFound />
  ) : (
    <div className='main-body'>
      <h1 className='mb-5'>Leave Request Detail</h1>
      <table style={{ width: '60%' }}>
        <tbody>
          <tr>
            <td>
              <TextField
                id='employee-id-readonly'
                label='Employee ID'
                className='mb-3'
                defaultValue={request.empId}
                InputProps={{
                  readOnly: true
                }}
              />
            </td>
            <td style={{ textAlign: 'right' }}>
              <p>Date: {formatMMDDYYYY(new Date())}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                <b>
                  <i>Type:</i>
                </b>{' '}
                {request.leaveType}
              </p>
            </td>
            <td></td>
          </tr>
          <tr>
            <td colspan='2'>
              <b>
                <i>Description:</i>
              </b>
              <br />
              <p style={{ wordWrap: 'break-word' }}>{request.description}</p>
            </td>
          </tr>
          <tr>
            <td colspan='2'>
              <Button
                variant='contained'
                color='primary'
                onClick={() => history.goBack()}
                className='mt-4'
              >
                Back
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default WithSidebar(WithHeader(LeaveRequestDetail))
