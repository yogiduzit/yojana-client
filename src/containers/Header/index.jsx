import React from 'react'
import userProfileImage from '../../assets/images/user-profile-mock.svg'
import { Link } from 'react-router-dom'
import '../../assets/css/style.css'

const Header = props => {
  // const userEmailAddress = 'jane.doe@gmail.com';
  const { user } = props
  return (
    <>
      <div className='p-5 ml-auto text-right'>
        <Link>
          <img src={userProfileImage} alt='user-profile-img' className='mr-3' />
          <span className='text-color-primary-yonder text-decoration-none'>
            {user?.fullName}
          </span>
        </Link>
      </div>
    </>
  )
}

export default Header
