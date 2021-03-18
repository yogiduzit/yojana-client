import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import WithSidebar from '../../hoc/WithSidebar'
import WithHeader from '../../hoc/WithHeader'
import { formatMMDDYYYY } from '../../utils/dateFormatter'
import { Link, useHistory } from 'react-router-dom'
import '../../assets/css/timesheet.css'

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import EditIcon from '@material-ui/icons/Edit'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import AddIcon from '@material-ui/icons/Add'
import { Button, TableHead, TableSortLabel } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  // styles for order by dropdown
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  // styles for table
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  },
  table: {
    minWidth: 500
  },
  // styles for table header
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}))

// Enum for order by
const orderByEnum = Object.freeze({
  WEEK_END_DATE: 0,
  SUBMITTED_DATE: 1,
  TOTAL_HOURS: 2,
  STATUS: 3
})

// Enum for timesheet status
const statusEnum = Object.freeze({
  APPROVED: 'Approved',
  IN_PROGRESS: 'In Progress',
  REJECTED: 'Rejected'
})

const headCells = [
  {
    id: orderByEnum.WEEK_END_DATE,
    label: 'Week Ending'
  },
  {
    id: orderByEnum.SUBMITTED_DATE,
    label: 'Submitted Date'
  },
  {
    id: orderByEnum.TOTAL_HOURS,
    label: 'Total Hours'
  },
  {
    id: orderByEnum.STATUS,
    label: 'Status'
  }
]

function descendingComparator (a, b, orderBy) {
  let orderByProperty = ''
  switch (orderBy) {
    case orderByEnum.WEEK_END_DATE:
      orderByProperty = 'weekEndDate'
      break
    case orderByEnum.SUBMITTED_DATE:
      orderByProperty = 'submittedDate'
      break
    case orderByEnum.TOTAL_HOURS:
      orderByProperty = 'totalHours'
      break
    case orderByEnum.STATUS:
      orderByProperty = 'status'
      break
    default:
      break
  }

  if (b[orderByProperty] < a[orderByProperty]) {
    return -1
  }
  if (b[orderByProperty] > a[orderByProperty]) {
    return 1
  }
  return 0
}

function getComparator (order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort (array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

function EnhancedTableHead (props) {
  const { classes, order, orderBy, onRequestSort } = props
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <b>{headCell.label}</b>
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>
          <b>Actions</b>
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

// Action component for table pagination
function TablePaginationActions (props) {
  const classes = useStyles()
  const theme = useTheme()
  const { count, page, rowsPerPage, onChangePage } = props

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0)
  }

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1)
  }

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1)
  }

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  )
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
}

// function for creating dummy data
function createData (id, date, totalHours, status) {
  return {
    id: id,
    weekEndDate: date,
    submittedDate: new Date(),
    totalHours: totalHours,
    status: status
  }
}

// dummy data
const rows = [
  createData(1, new Date(1995, 11, 17), 40, 'Approved'),
  createData(2, new Date(2002, 4, 5), 30, 'Rejected'),
  createData(3, new Date(2021, 5, 3), 20, 'Approved'),
  createData(4, new Date(1999, 7, 8), 20, 'In Progress'),
  createData(5, new Date(2002, 4, 5), 40, 'Rejected'),
  createData(6, new Date(1995, 11, 17), 20, 'In Progress'),
  createData(7, new Date(2002, 4, 5), 30, 'Rejected'),
  createData(8, new Date(2021, 5, 3), 40, 'Approved'),
  createData(9, new Date(1999, 7, 8), 40, 'Rejected'),
  createData(10, new Date(1999, 7, 8), 20, 'Rejected'),
  createData(11, new Date(1995, 11, 17), 20, 'In Progress'),
  createData(12, new Date(1995, 11, 17), 40, 'In Progress'),
  createData(13, new Date(2021, 5, 3), 40, 'Approved'),
  createData(14, new Date(1995, 11, 17), 30, 'Approved'),
  createData(15, new Date(1999, 7, 8), 40, 'Approved'),
  createData(16, new Date(1999, 7, 8), 30, 'In Progress'),
  createData(17, new Date(2002, 4, 5), 20, 'In Progress'),
  createData(18, new Date(2002, 4, 5), 40, 'Approved')
]

// Timesheet container
const TimesheetIndex = () => {
  const classes = useStyles()
  const history = useHistory()
  const [timesheets, setTimesheets] = useState(rows)
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState(-1)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const statusIndicator = status => {
    switch (status) {
      case statusEnum.APPROVED:
        return (
          <FiberManualRecordIcon
            style={{ color: '#95DB73' }}
            className='mr-3'
          />
        )
      case statusEnum.IN_PROGRESS:
        return (
          <FiberManualRecordIcon
            style={{ color: '#F6E54B' }}
            className='mr-3'
          />
        )
      case statusEnum.REJECTED:
        return (
          <FiberManualRecordIcon
            style={{ color: '#DD5B24' }}
            className='mr-3'
          />
        )
      default:
        return null
    }
  }

  return (
    <div className='body'>
      <h1 style={{ float: 'left' }}>Timesheet</h1>
      <Button
        variant='outlined'
        color='primary'
        style={{ float: 'right' }}
        className='mb-5'
        onClick={() => history.push('/timesheet/create')}
      >
        <AddIcon className='mr-3' />
        Create New
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='custom pagination table'>
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {(rowsPerPage > 0
              ? stableSort(timesheets, getComparator(order, orderBy)).slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : timesheets
            ).map(row => (
              <TableRow key={row.id}>
                <TableCell component='th' scope='row'>
                  {formatMMDDYYYY(row.weekEndDate)}
                </TableCell>
                <TableCell>{formatMMDDYYYY(row.submittedDate)}</TableCell>
                <TableCell>{row.totalHours} hrs</TableCell>
                <TableCell>
                  {statusIndicator(row.status)}
                  {row.status}
                </TableCell>
                <TableCell>
                  {row.status === statusEnum.REJECTED ? (
                    <Link to='#' className='mr-5'>
                      <EditIcon style={{ color: '#4877AD' }} />
                    </Link>
                  ) : (
                    <EditIcon
                      style={{ visibility: 'hidden' }}
                      className='mr-5'
                    />
                  )}
                  <Link to='#'>
                    <OpenInNewIcon style={{ color: '#4877AD' }} />
                  </Link>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  )
}

export default WithSidebar(WithHeader(TimesheetIndex))
