import React from 'react';
import userProfileImage from '../../assets/images/user-profile-mock.svg';
import {Link} from "react-router-dom";
import '../../assets/css/style.css'

const Header = (props) => {
    const userEmailAddress = 'jane.doe@gmail.com';
    return (
        <>

            <div className='p-5 ml-auto text-right'>
                <Link>
                    <img src={userProfileImage} className='mr-3' />
                    <span className='text-color-primary-yonder text-decoration-none'>{userEmailAddress}</span>
                </Link>
            </div>
        </>
    )
}

export default Header;