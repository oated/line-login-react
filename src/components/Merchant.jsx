import React from 'react'
import viteLogo from '/vite.svg'
import { useState, useEffect } from 'react'
import liff from '@line/liff'
import axios from 'axios'

function Merchant() {

    const queryParams = new URLSearchParams(window.location.search);
    const merchantId = queryParams.get("id");
    const merchantName = queryParams.get("name");
    const [idToken, setIdToken] = useState("");
    const [pictureUrl, setPictureUrl] = useState(viteLogo);
    const [displayName, setDisplayName] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [userId, setUserId] = useState("");
    const destinationUrl = window.location.href;
  
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


    // const detail = JSON.stringify({ market_id: merchantId,  line_token: userId })
    // console.log(detail);

    
    sendRequestToAPI = () => {
        const data = JSON.stringify({ market_id: merchantId,  line_token: userId });
    
        axios.post('http://188.166.177.184:3001/bot/add_token_user', data, {
          headers: {
            'Content-Type': 'application/json',
            'Cookie': 'connect.sid=s%3A97EGMK4BdrzqZwYDuOXrKTx-s6WWmklS.FHUkAIB257jH7stTEsn2VcuUMxVsCYmzV%2BdZxSJUHes',
          }
        })
          .then(response => {
            this.setState({ response: JSON.stringify(response.data) });
          })
          .catch(error => {
            console.error(error);
          });
      }

    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ market_id: merchantId,  line_token: userId })
    // };
    // fetch('http://188.166.177.184:3001/bot/add_token_user', requestOptions)
    //     .then(async response => {
    //         const isJson = response.headers.get('content-type')?.includes('application/json');
    //         const data = isJson && await response.json();

    //         // check for error response
    //         if (!response.ok) {
    //             // get error message from body or default to response status
    //             const error = (data && data.message) || response.status;
    //             return Promise.reject(error);
    //         }

    //         this.setState({ market_id: merchantId,  line_token: userId })
    //     })
    //     .catch(error => {
    //         this.setState({ errorMessage: error.toString() });
    //         console.error('There was an error!', error);
    //     });
  
    useEffect(() => {
      initLine();
    }, []);
  return (
    <div className="App">
      <header className="App-header">
      <div style={{ textAlign: "center" }}>
        <div><h3>Merchant ID : {merchantId}</h3></div>
        <div><h3>Merchant Name : {merchantName}</h3></div>
        <img src={pictureUrl} width="300px" height="300px" style={{borderRadius: "100rem"}}/>
        <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>display name: </b> {displayName}</p>
        <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>user id: </b> {userId}</p>
        <button onClick={this.sendRequestToAPI} style={{ width: "100%", height: 30 }}>Queue</button>
        <br />
        <button onClick={() => logout()} style={{ width: "100%", height: 30 }}>Logout</button>
      </div>
      </header>
    </div>
  );
}

export default Merchant