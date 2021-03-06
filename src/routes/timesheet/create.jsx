import React from 'react'
import WithSidebar from '../../hoc/WithSidebar'
import WithHeader from '../../hoc/WithHeader'

function TimesheetCreate() {
  return (
    <div>
      Create New Timesheet
    </div>
  )
}

export default WithSidebar(WithHeader(TimesheetCreate))