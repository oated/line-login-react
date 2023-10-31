import React, { useState, useEffect } from 'react';
import axios from 'axios';
import liff from '@line/liff';
import ads from '/Coke-ads.jpeg'


function Merchant() {
    const queryParams = new URLSearchParams(window.location.search);
    const merchantId = queryParams.get("id");
    const merchantName = queryParams.get("name");
    const [userId, setUserId] = useState("");
    const [response, setResponse] = useState("");
    const destinationUrl = window.location.href;

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
            <Header />
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
