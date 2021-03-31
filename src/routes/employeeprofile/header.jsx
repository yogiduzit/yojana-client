import React from 'react';
import { BsBell } from "react-icons/bs";

import empPic from '../../assets/images/img_avatar.png'


/**
 * @param isHaveNotice
 * @param headImg
 * @param email
 * @returns {JSX.Element}
 * @constructor
 */
function Header({ isHaveNotice, headImg, email }) {
    return (
        <div className="header-container">
            <div className="search">
                <img src={empPic} alt='search' />
                <input type="text" placeholder='Search...' />
            </div>

            <div className="info">
                <div className='bell'>
                    {/*<img src={BsFillBellFill} alt="bell"/>*/}
                    <BsBell />
                    {isHaveNotice ? <div></div> : null}
                </div>
                <div className='head'>
                    <img src={headImg} alt="user-head" />
                </div>
                <div className='name'>
                    <span>{email}</span>
                </div>
            </div>
        </div>
    )
};

export default Header;