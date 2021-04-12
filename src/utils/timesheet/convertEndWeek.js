export function convertEndWeekToString (date) {
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()

  let monthStr = month.toString()
  let dayStr = day.toString()
  if (month < 10) {
    monthStr = '0' + month
  }
  if (day < 10) {
    dayStr = '0' + day
  }
  return `${year}-${monthStr}-${dayStr}`
}

export function convertEndWeekToDate (dateStr) {
  const DELIMITER = '-'
  const year = dateStr.substring(0, dateStr.indexOf(DELIMITER))
  const month = dateStr.substring(dateStr.indexOf(DELIMITER) + 1, dateStr.lastIndexOf(DELIMITER))
  const day = dateStr.substring(dateStr.lastIndexOf(DELIMITER) + 1)
  return new Date(year, month - 1, day)
}