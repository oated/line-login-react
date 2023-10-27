import React from 'react'
import viteLogo from '/vite.svg'
import { useState, useEffect } from 'react'
import liff from '@line/liff'

function Merchant() {

    const queryParams = new URLSearchParams(window.location.search)
    const merchantId = queryParams.get("id")
    const merchantName = queryParams.get("name")
    const [pictureUrl, setPictureUrl] = useState(viteLogo);
    const [idToken, setIdToken] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [userId, setUserId] = useState("");
  
    const logout = () => {
      liff.logout();
      window.location.reload();
    }
  
    const initLine = () => {
      liff.init({ liffId: '2001346006-R6d1wj3Q' }, () => {
        if (liff.isLoggedIn()) {
          runApp();
        } else {
          liff.login({ redirectUri: merchantId });
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
  
    useEffect(() => {
      initLine();
    }, []);
  return (
    <div className="App">
      <header className="App-header">
      <div style={{ textAlign: "center" }}>
        <div><h3>Merchant ID : {merchantId}</h3></div>
        <div><h3>Merchant Name : {merchantName}</h3></div>
        <hr/>
        <img src={pictureUrl} width="300px" height="300px"/>
        <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>id token: </b> {idToken}</p>
        <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>display name: </b> {displayName}</p>
        <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>status message: </b> {statusMessage}</p>
        <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>user id: </b> {userId}</p>

        <button onClick={() => logout()} style={{ width: "100%", height: 30 }}>Logout</button>
      </div>
      </header>
    </div>
  );
}

export default Merchant