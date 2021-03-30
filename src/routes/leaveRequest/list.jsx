import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import WithSidebar from '../../hoc/WithSidebar'
import WithHeader from '../../hoc/WithHeader'
import NotFound from '../../components/NotFound/NotFound'
import { formatMMDDYYYY } from '../../utils/dateFormatter'
import { Link, useHistory } from 'react-router-dom'
import { stableSort, getComparator } from '../../utils/tableSortFunctions'
import { orderByEnum, dummyList } from '../../constants/leaveRequest/constants'
import '../../assets/css/body-component.css'
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
import OpenInNewIcon from '@material-ui/icons/OpenInNew'

import { Button, TableHead, TableSortLabel } from '@material-ui/core'
import { fetchAllLeaveRequests } from '../../api/LeaveRequest'
import Loading from '../../components/Loading/Loading'

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

const headCells = [
  {
    id: orderByEnum.ID,
    label: 'Reference Number'
  },
  {
    id: orderByEnum.EMPLOYEE_FULLNAME,
    label: 'Employee Name'
  },
  {
    id: orderByEnum.TYPE,
    label: 'Type'
  },
  {
    id: orderByEnum.START_DATE,
    label: 'Start Date'
  },
  {
    id: orderByEnum.END_DATE,
    label: 'End Date'
  }
]

function descendingComparator (a, b, orderBy) {
  let orderByProperty = ''
  const EMP_FULLNAME_PROPERTY = 'fullName'

  switch (orderBy) {
    case orderByEnum.ID:
      orderByProperty = 'id'
      break
    case orderByEnum.EMPLOYEE_FULLNAME:
      orderByProperty = 'employee'
      break
    case orderByEnum.TYPE:
      orderByProperty = 'type'
      break
    case orderByEnum.START_DATE:
      orderByProperty = 'startDate'
      break
    case orderByEnum.END_DATE:
      orderByProperty = 'endDate'
      break
    default:
      break
  }

  if (orderByProperty === 'employee') { // Nested object for the employee
    if (
      b[orderByProperty][EMP_FULLNAME_PROPERTY] <
      a[orderByProperty][EMP_FULLNAME_PROPERTY]
    ) {
      return -1
    }
    if (
      b[orderByProperty][EMP_FULLNAME_PROPERTY] >
      a[orderByProperty][EMP_FULLNAME_PROPERTY]
    ) {
      return 1
    }
    return 0
  } else {
    if (b[orderByProperty] < a[orderByProperty]) {
      return -1
    }
    if (b[orderByProperty] > a[orderByProperty]) {
      return 1
    }
    return 0
  }
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

// Timesheet container
const LeaveRequestList = () => {
  const classes = useStyles()
  const history = useHistory()
  // TODO: Authorize user by its role to access this list page
  const [isAuthorized, setAuthorized] = useState(true)
  const [requests, setRequests] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState(-1)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  useEffect(() => {
    fetchAllLeaveRequests()
      .then(res => {
        console.log(res)
        setLoaded(true)
        setRequests(res.data.data.leaveRequest)
      })
      .catch(e => console.error(e))
  }, [])

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, requests.length - page * rowsPerPage)

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

  return !loaded ? (
    <Loading />
  ) : !isAuthorized ? (
    <NotFound />
  ) : (
    <div className='main-body'>
      <h1 className='mb-5'>Leave Request List</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='custom pagination table'>
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={requests.length}
          />
          <TableBody>
            {(rowsPerPage > 0
              ? stableSort(
                  requests,
                  getComparator(order, orderBy, descendingComparator)
                ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : requests
            ).map(row => (
              <TableRow key={row.id}>
                <TableCell component='th' scope='row'>
                  {row.id}
                </TableCell>
                <TableCell>
                  {row.employee ? row.employee.fullName : null}
                </TableCell>
                <TableCell>{row.type ? row.type : null}</TableCell>
                <TableCell>
                  {formatMMDDYYYY(row.startDate ? row.startDate : null)}
                </TableCell>
                <TableCell>
                  {formatMMDDYYYY(row.endDate ? row.endDate : null)}
                </TableCell>
                <TableCell>
                  <Link
                    to={{
                      pathname: `leave-request-detail/${row.id}`,
                      state: row
                    }}
                  >
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
                count={requests.length}
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
      <Button
        variant='contained'
        color='primary'
        onClick={() => history.goBack()}
        style={{ float: 'right' }}
        className='mt-4'
      >
        Back
      </Button>
    </div>
  )
}

export default WithSidebar(WithHeader(LeaveRequestList))
