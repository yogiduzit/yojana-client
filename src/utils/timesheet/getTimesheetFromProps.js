import moment from 'moment'
import {
  DAYS_IN_WEEK,
  INITIAL_HOURS
} from '../../constants/timesheet/constants'
import { getRows } from '../../api/Timesheet';
import { loadWorkPackageIdsForProject } from './loadProjectWP';

async function getTimesheetFromProps (timesheetFromProps, state) {
  const { setTotalHours, setTotalOfTotalHours, setTimesheet, setLoaded } = state

  if (timesheetFromProps) {
    // spread timesheet object that has been retrieved from props
    let timesheetToSave = { ...timesheetFromProps }

    const res = await getRows(timesheetToSave.id);
    if (res.errors && res.errors.length > 0) {
      console.error("Error while fetching rows");
      return;
    }
    timesheetToSave.rows = res.data.timesheetRows;

    // add total hours by row
    timesheetToSave.rows?.forEach(row => {
      let totalHours = 0
      totalHours = row.hours.reduce((acc, hour) => acc + hour, 0)
      row.totalHours = totalHours
    })

    // add total hours of total hours and by each day
    let totalHoursToSave = [...INITIAL_HOURS]
    let totalOfTotalHoursToSave = 0
    timesheetToSave.rows?.forEach(row => {
      totalOfTotalHoursToSave += row.totalHours
      for (let i = 0; i < DAYS_IN_WEEK; i++) {
        totalHoursToSave[i] += row.hours[i]
      }
    })
    setTotalHours(totalHoursToSave)
    setTotalOfTotalHours(totalOfTotalHoursToSave)

    // add week number field in timesheet object
    timesheetToSave.weekNum = moment(timesheetToSave.weekEndDate).format('W')

    // This is for Timesheet Edit page
    // Contain existing workPackageId for each row into the select options
    await Promise.all(
      timesheetToSave.rows?.map(async row => {
        await loadWorkPackageIdsForProject(row.projectId, row)
      })
    )

    setTimesheet(timesheetToSave)
  }
  setLoaded(true)
}

export default getTimesheetFromProps
