// Enum for order by
export const orderByEnum = Object.freeze({
  ID: 0,
  EMPLOYEE_FULLNAME: 1,
  TYPE: 2,
  START_DATE: 3,
  END_DATE: 4
})

export const leaveTypes = Object.freeze({
  VACATION: 'Vacation',
  MEDICAL: 'Medical'
})

export const dummyList = Object.freeze([
  createData(
    1,
    100,
    'Alan',
    'Shearer',
    leaveTypes.VACATION,
    'Varius sit amet mattis vulputate enim nulla aliquet porttitor lacus. Dui nunc mattis enim ut tellus elementum sagittis vitae. Urna neque viverra justo nec ultrices dui sapien eget mi. Integer malesuada nunc vel risus commodo viverra maecenas accumsan lacus. In dictum non consectetur a erat nam at lectus urna. Blandit cursus risus at ultrices. Quam pellentesque nec nam aliquam. Euismod elementum nisi quis eleifend quam. Ultrices vitae auctor eu augue ut lectus arcu. Libero nunc consequat interdum varius sit amet.',
    new Date()
  ),
  createData(
    2,
    101,
    'Ben',
    'Chilwell',
    leaveTypes.MEDICAL,
    'I am sick.',
    new Date()
  ),
  createData(
    3,
    102,
    'Cesc',
    'Fabregas',
    leaveTypes.MEDICAL,
    'I have eye exam.',
    new Date()
  ),
  createData(
    4,
    103,
    'Diego',
    'Forlan',
    leaveTypes.VACATION,
    'Off to Havana.',
    new Date()
  ),
  createData(
    5,
    104,
    'Edinson',
    'Cavani',
    leaveTypes.MEDICAL,
    'I feel dizzy.',
    new Date()
  ),
  createData(
    6,
    105,
    'Gareth',
    'Bale',
    leaveTypes.VACATION,
    'Off for golfing.',
    new Date()
  ),
  createData(
    7,
    105,
    'Fernando',
    'Torres',
    leaveTypes.VACATION,
    'Off to Spain.',
    new Date()
  )
])

function createData (
  referenceNum,
  empId,
  firstName,
  lastName,
  leaveType,
  description,
  submittedDate
) {
  return {
    referenceNum,
    empId,
    firstName,
    lastName,
    leaveType,
    description,
    submittedDate
  }
}
