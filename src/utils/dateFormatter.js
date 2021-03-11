import moment from 'moment';

export function formatMMDDYYYY (date) {
  return moment(date).format('MM/DD/YYYY')
}