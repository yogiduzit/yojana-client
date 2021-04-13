import moment from 'moment';
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

export function formatMMDDYYYY(date) {
    return moment(date).format('MM/DD/YYYY')
}

export function getTimeAgo(ms) {
    const date = new Date(ms);
    return timeAgo.format(date);
}

export function getLastFridayOf(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = (day <= 5) ? (7 - 5 + day) : (day - 5);

    d.setDate(d.getDate() - diff);
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);

    return d.toISOString().split("T")[0];;
}