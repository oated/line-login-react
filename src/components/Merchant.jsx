import React, { useState, useEffect } from 'react';
import axios from 'axios';
import liff from '@line/liff';
import profilepic from '/profile-pic.png';
import tunqlogo from '/TunQ-logo.png'
import ads from '/Coke-ads.jpeg'


function Merchant() {
    const queryParams = new URLSearchParams(window.location.search);
    const merchantId = queryParams.get("id");
    const merchantName = queryParams.get("name");
    const [idToken, setIdToken] = useState("");
    const [pictureUrl, setPictureUrl] = useState(profilepic);
    const [displayName, setDisplayName] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [userId, setUserId] = useState("");
    const [response, setResponse] = useState("");
    const destinationUrl = window.location.href;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
      
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    const logout = () => {
        liff.logout();
        window.location.reload();
    }

    const initLine = () => {
        liff.init({ liffId: '2001346006-R6d1wj3Q' }, () => {
            if (liff.isLoggedIn()) {
                runApp({ redirectUri: destinationUrl });
            } else {
                liff.login({ redirectUri: destinationUrl });
            }
        }, err => console.error(err));
    }

    const runApp = () => {
        const idToken = liff.getIDToken();
        setIdToken(idToken);
        liff.getProfile().then(profile => {
            console.log(profile);
            setDisplayName(profile.displayName);
            setPictureUrl(profile.pictureUrl);
            setStatusMessage(profile.statusMessage);
            setUserId(profile.userId);
        }).catch(err => console.error(err));
    }

    const sendRequestToAPI = () => {
        const data = JSON.stringify({
            "market_id": merchantId,
            "line_token": userId
          });

        axios.post('http://188.166.177.184:3001/bot/add_token_user', data, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                setResponse(JSON.stringify(response.data));
                console.log(data);
            })
            .catch(error => {
                console.log(data);
                console.error(error);
            });
    }

    useEffect(() => {
        initLine();
    }, []);

    return (
        <div className="merchant">
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
                <div className='box-action'>
                    <div className='merchant-name'>
                        <h2>{merchantName}</h2>
                    </div>
                    <div className="date-time">
                        <span>กด <span className='text-hilight'><b>รับคิว</b></span> เพื่อใช้บริการระบบคิวออนไลน์</span>
                    </div>
                    
                    <div className="ellipse">
                        <span className='heartbeat'></span>
                        <span className='take-queue' onClick={sendRequestToAPI}>รับคิว</span>
                    </div>
                    <br />
                    <p>{response}</p>
                </div>
                <div className="advertize">
                    <img src={ads} alt="Coke ads" />
                    <span className='ads-text'>ได้รับการสนับสนุนจาก <b>Coca Cola</b></span>
                </div>
        </div>
    );
}

export default Merchant;
