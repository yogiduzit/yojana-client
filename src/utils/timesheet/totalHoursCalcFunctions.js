import {
  daysEnum,
  INITIAL_HOURS,
  SAT_IDX,
  SUN_IDX,
  MON_IDX,
  TUE_IDX,
  WED_IDX,
  THU_IDX,
  FRI_IDX,
  DAYS_IN_WEEK,
  MAX_HOURS_PER_WEEK
} from '../../constants/timesheet/constants'

export const calculateTotalHours = (
  dayToSet,
  daysEnum,
  state,
  updatedTimesheetRows
) => {
  const { totalHours, setTotalHours, timesheet, setTotalOfTotalHours } = state

  // For setting total hours by day
  if (dayToSet !== undefined) {
    switch (dayToSet) {
      case daysEnum.SAT:
        // update total hours for Saturday
        setTotalHours([
          timesheet.rows.reduce(
            (acc, obj) => acc + parseFloat(obj.hours[SAT_IDX]),
            0
          ),
          ...totalHours.slice(1)
        ])
        return
      case daysEnum.SUN:
        // update total hours for Sunday
        setTotalHours([
          ...totalHours.slice(0, SUN_IDX),
          timesheet.rows.reduce(
            (acc, obj) => acc + parseFloat(obj.hours[SUN_IDX]),
            0
          ),
          ...totalHours.slice(MON_IDX)
        ])
        return
      case daysEnum.MON:
        // update total hours for Monday
        setTotalHours([
          ...totalHours.slice(0, MON_IDX),
          timesheet.rows.reduce(
            (acc, obj) => acc + parseFloat(obj.hours[MON_IDX]),
            0
          ),
          ...totalHours.slice(TUE_IDX)
        ])
        return
      case daysEnum.TUE:
        // update total hours for Tuesday
        setTotalHours([
          ...totalHours.slice(0, TUE_IDX),
          timesheet.rows.reduce(
            (acc, obj) => acc + parseFloat(obj.hours[TUE_IDX]),
            0
          ),
          ...totalHours.slice(WED_IDX)
        ])
        return
      case daysEnum.WED:
        // update total hours for Wednesday
        setTotalHours([
          ...totalHours.slice(0, WED_IDX),
          timesheet.rows.reduce(
            (acc, obj) => acc + parseFloat(obj.hours[WED_IDX]),
            0
          ),
          ...totalHours.slice(THU_IDX)
        ])
        return
      case daysEnum.THU:
        // update total hours for Thursday
        setTotalHours([
          ...totalHours.slice(0, THU_IDX),
          timesheet.rows.reduce(
            (acc, obj) => acc + parseFloat(obj.hours[THU_IDX]),
            0
          ),
          ...totalHours.slice(FRI_IDX)
        ])
        return
      case daysEnum.FRI:
        // update total hours for Friday
        setTotalHours([
          ...totalHours.slice(0, FRI_IDX),
          timesheet.rows.reduce(
            (acc, obj) => acc + parseFloat(obj.hours[FRI_IDX]),
            0
          )
        ])
        return
      default:
        return
    }
  } else if (updatedTimesheetRows !== undefined) {
    // set total of total hours from each row
    setTotalOfTotalHours(
      updatedTimesheetRows.reduce(
        (acc, obj) => acc + parseFloat(obj.totalHours),
        0
      )
    )

    let newTotalHours = [...INITIAL_HOURS]
    for (let i = 0; i < DAYS_IN_WEEK; ++i) {
      newTotalHours[i] = updatedTimesheetRows.reduce(
        (acc, obj) => acc + parseFloat(obj.hours[i]),
        0
      )
    }
    setTotalHours(newTotalHours)
  }
}

export const formatHours = input => parseFloat(input).toFixed(1)

// Gets triggered each time the user enters hours in an input field
export const handleHoursChange = (e, index, rowToUpdate, state) => {
  const value = formatHours(e.target.value)

  const {
    setHoursInputErrorMsg,
    setShowInputErrorMsg,
    totalHours,
    setTotalHours,
    timesheet,
    setTimesheet,
    setTotalOfTotalHours,
    setOvertime,
    // setFlextime
  } = state

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

  switch (index) {
    case SAT_IDX:
      rowToUpdate.hours[SAT_IDX] = value
      // update total hours for Saturday
      calculateTotalHours(daysEnum.SAT, daysEnum, {
        totalHours,
        setTotalHours,
        timesheet
      })
      break
    case SUN_IDX:
      rowToUpdate.hours[SUN_IDX] = value
      // update total hours for Sunday
      calculateTotalHours(daysEnum.SUN, daysEnum, {
        totalHours,
        setTotalHours,
        timesheet
      })
      break
    case MON_IDX:
      rowToUpdate.hours[MON_IDX] = value
      // update total hours for Monday
      calculateTotalHours(daysEnum.MON, daysEnum, {
        totalHours,
        setTotalHours,
        timesheet
      })
      break
    case TUE_IDX:
      rowToUpdate.hours[TUE_IDX] = value
      // update total hours for Tuesday
      calculateTotalHours(daysEnum.TUE, daysEnum, {
        totalHours,
        setTotalHours,
        timesheet
      })
      break
    case WED_IDX:
      rowToUpdate.hours[WED_IDX] = value
      // update total hours for Wednesday
      calculateTotalHours(daysEnum.WED, daysEnum, {
        totalHours,
        setTotalHours,
        timesheet
      })
      break
    case THU_IDX:
      rowToUpdate.hours[THU_IDX] = value
      // update total hours for Thursday
      calculateTotalHours(daysEnum.THU, daysEnum, {
        totalHours,
        setTotalHours,
        timesheet
      })
      break
    case FRI_IDX:
      rowToUpdate.hours[FRI_IDX] = value
      // update total hours for Friday
      calculateTotalHours(daysEnum.FRI, daysEnum, {
        totalHours,
        setTotalHours,
        timesheet
      })
      break
    default:
      break
  }

  // update total hours
  rowToUpdate.totalHours = rowToUpdate.hours.reduce(
    (acc, item) => acc + parseFloat(item),
    0
  )

  // set the final state of timesheet
  setTimesheet({
    ...timesheet,
    rows: [...timesheet.rows].map(row => {
      if (row.index === rowToUpdate.index) {
        return rowToUpdate
      } else return row
    })
  })

  const grandTotalHours = timesheet.rows.reduce(
    (acc, obj) => acc + parseFloat(obj.totalHours),
    0
  )
  // set total of total hours from each row
  setTotalOfTotalHours(grandTotalHours)
  
  if (grandTotalHours > MAX_HOURS_PER_WEEK) {
    setOvertime(formatHours(grandTotalHours - MAX_HOURS_PER_WEEK))
  } else {
    setOvertime(formatHours(0))
  }
}
