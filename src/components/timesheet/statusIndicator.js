import { statusEnum } from '../../constants/timesheet/constants'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

const statusIndicator = (status, className) => {
  switch (status) {
    case statusEnum.APPROVED:
      return (
        <FiberManualRecordIcon
          style={{ color: '#95DB73' }}
          className={className ? className : null}
        />
      )
    case statusEnum.IN_PROGRESS:
      return (
        <FiberManualRecordIcon
          style={{ color: '#F6E54B' }}
          className={className ? className : null}
        />
      )
    case statusEnum.PENDING:
      return (
        <FiberManualRecordIcon
          style={{ color: '#AAAAAA' }}
          className={className ? className : null}
        />
      )
    case statusEnum.REJECTED:
      return (
        <FiberManualRecordIcon
          style={{ color: '#DD5B24' }}
          className={className ? className : null}
        />
      )
    default:
      return null
  }
}

export default statusIndicator
