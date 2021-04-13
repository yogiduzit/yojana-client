import { fetchAllProjects } from '../../api/Project'
import { fetchAllWorkPackages } from '../../api/WorkPackage'

export async function loadProjectIds (state) {
  const { setProjectIds } = state
  const res = await fetchAllProjects()
  const projectIdsToSave = []
  res.data.projects.forEach(({ id }) => projectIdsToSave.push(id))
  setProjectIds(projectIdsToSave)
}

export async function loadWorkPackageIdsForProject (id, rowToUpdate, state) {
  const { timesheet, setTimesheet } = state ? state : {}
  const res = await fetchAllWorkPackages(id)
  const workPackageIdsToSave = []
  res.data.workPackages.forEach(({ workPackagePk }) =>
    workPackageIdsToSave.push(workPackagePk.id)
  )
  // add or update options of workPackage in the row
  rowToUpdate.workPackageIdOptions = workPackageIdsToSave

  if (state !== undefined) {
    setTimesheet({
      ...timesheet,
      rows: [
        ...timesheet.rows.map(row => {
          if (row.index !== rowToUpdate.index) return row
          else return rowToUpdate
        })
      ]
    })
  } else {
    return rowToUpdate
  }
}
