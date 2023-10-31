import React from 'react'
import { useState, useEffect } from 'react'
import liff from '@line/liff'
import Header from './Header';

function Profile() {

    const queryParams = new URLSearchParams(window.location.search);
    const merchantId = queryParams.get("id");
    const [displayName, setDisplayName] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [userId, setUserId] = useState("");
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
  
    //   useEffect(() => {
    //       initLine();
    //   }, []);

  return (
    <>
    <Header />
    <div className='profile-info'>
        <p><b>ชื่อ : </b> {displayName}</p>
        <p><b>สเตตัส : </b> {statusMessage}</p>
        <p><b>เบอร์โทร : </b> 081-2345678</p>
        <button className='logout-btn' onClick={logout}>ออกจากระบบ</button>
    </div>
    </>
  )
}

export default Profile