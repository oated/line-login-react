import React from 'react'
import liff from '@line/liff'
import profilepic from '/profile-pic.png';
import tunqlogo from '/TunQ-logo.png'
import { useState, useEffect } from 'react'

function Header() {

    const [pictureUrl, setPictureUrl] = useState(profilepic);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [displayName, setDisplayName] = useState("");

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };

      const logout = () => {
        liff.logout();
        window.location.reload();
    }
    useEffect(() => {
        initLine();
    }, []);
    
  return (
    <div>
        <header className="header">
    <div className="nav">
        <div className="logo-pro">
            <img src={tunqlogo} alt="TunQ Logo"/>
        </div>
        <div className="cus-pro">
            <img src={pictureUrl} onClick={toggleMenu} width="40px" height="40px" style={{ borderRadius: "100%" }} alt="Merchant Image" />
        </div>
    </div>
    {isMenuOpen && (
<div className="menu-pro">
<ul className='menu-list'>
    <li>
        <p>{displayName}</p>
    </li>
    <li>
        <p>เช็คสถานะคิว</p>
    </li>
    <li>
        <p>เช็คคะแนน</p>
    </li>
</ul>
<button className='logout-btn' onClick={logout}>ออกจากระบบ</button>
</div>
)}
</header>
</div>
  )
}

export default Header