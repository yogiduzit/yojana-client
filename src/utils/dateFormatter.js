import moment from 'moment';
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

export function formatMMDDYYYY (date) {
  return moment(date).format('MM/DD/YYYY')
}

export function getTimeAgo(ms) {
  const date = new Date(ms);
  return timeAgo.format(date);
}