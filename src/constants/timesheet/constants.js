// Enum for order by
export const orderByEnum = Object.freeze({
  WEEK_END_DATE: 0,
  SUBMITTED_DATE: 1,
  TOTAL_HOURS: 2,
  STATUS: 3
})

// Enum for timesheet status
export const statusEnum = Object.freeze({
  APPROVED: 'approved',
  SUBMITTED: 'submitted',
  PENDING: 'pending',
  DENIED: 'denied'
})

export const daysEnum = Object.freeze({
  TOT: 'Total',
  SAT: 'Sat',
  SUN: 'Sun',
  MON: 'Mon',
  TUE: 'Tue',
  WED: 'Wed',
  THU: 'Thu',
  FRI: 'Fri'
})

export const INITIAL_HOURS = Object.freeze([0, 0, 0, 0, 0, 0, 0])
export const SAT_IDX = 0
export const SUN_IDX = 1
export const MON_IDX = 2
export const TUE_IDX = 3
export const WED_IDX = 4
export const THU_IDX = 5
export const FRI_IDX = 6
export const DAYS_IN_WEEK = 7
export const MAX_HOURS_PER_WEEK = 40
