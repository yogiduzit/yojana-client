import { statusEnum } from '../../constants/timesheet/constants'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import DoneIcon from '@material-ui/icons/Done'

const statusIndicator = (status, className) => {
  switch (status) {
    case statusEnum.PENDING:
      return (
        <FiberManualRecordIcon
          style={{ color: '#AAAAAA' }}
          className={className ? className : null}
        />
      )
    case statusEnum.SUBMITTED:
      return (
        <FiberManualRecordIcon
          style={{ color: '#95DB73' }}
          className={className ? className : null}
        />
      )
    case statusEnum.DENIED:
      return (
        <FiberManualRecordIcon
          style={{ color: '#DD5B24' }}
          className={className ? className : null}
        />
      )
    case statusEnum.APPROVED:
      return (
        <DoneIcon
          style={{ color: '#95DB73' }}
          className={className ? className : null}
        />
      )
    default:
      return null
  }
}

export default statusIndicator
