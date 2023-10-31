import React, { useState } from 'react';
import axios from 'axios';

function LinePush() {
  const [notificationSent, setNotificationSent] = useState(false);

  const pushNotification = async () => {
    try {
      const data = {
        "to": "Uc759a2130a40ccadf3ec1798dfab2207",
        "messages":[
            {
      "type": "flex",
      "altText": "ถึงคิวของคุณแล้ว!",
      "contents": {
      "type": "bubble",
      "body": {
        "type": "box",
        "layout": "vertical",
        "spacing": "md",
        "contents": [
          {
            "type": "text",
            "text": "ร้านครัวเจริญ",
            "wrap": true,
            "weight": "bold",
            "gravity": "center",
            "size": "xl"
          },
          {
            "type": "box",
            "layout": "vertical",
            "margin": "lg",
            "spacing": "sm",
            "contents": [
              {
                "type": "box",
                "layout": "baseline",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "text",
                    "text": "วันที่",
                    "color": "#aaaaaa",
                    "size": "sm",
                    "flex": 1
                  },
                  {
                    "type": "text",
                    "text": "26 ตุลาคม 2566",
                    "wrap": true,
                    "size": "sm",
                    "color": "#666666",
                    "flex": 4
                  }
                ]
              },
              {
                "type": "box",
                "layout": "baseline",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "text",
                    "text": "เวลา",
                    "color": "#aaaaaa",
                    "size": "sm",
                    "flex": 1
                  },
                  {
                    "type": "text",
                    "text": "17.35 น.",
                    "wrap": true,
                    "color": "#666666",
                    "size": "sm",
                    "flex": 4
                  }
                ]
              },
              {
                "type": "box",
                "layout": "vertical",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "text",
                    "text": "ถึงคิวของคุณแล้ว",
                    "wrap": true,
                    "color": "#45cc02",
                    "size": "20px",
                    "flex": 5,
                    "weight": "bold",
                    "align": "center"
                  }
                ],
                "paddingAll": "20px"
              }
            ]
          },
          {
            "type": "box",
            "layout": "horizontal",
            "margin": "xxl",
            "contents": [
              {
                "type": "button",
                "action": {
                  "type": "uri",
                  "label": "ดูคิวปัจจุบัน",
                  "uri": "http://linecorp.com/"
                },
                "flex": 1,
                "color": "#444444"
              }
            ]
          }
        ]
      }
    }
    }
        ]
    };

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.line.me/v2/bot/message/push',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer v4vtftmKvYWr1rpE/LZ7ClpxwUMQpp0AkFja+dyCoXqY5Lj0ZE/V7sXw5h4WXcyaBVJpjWfYAUdwMv79WkswsyFiZmMet3ZFrU8/EkwQRXMikj9Xox6/1Br1KHIPicgze9mCR6PbvkYhKOjQXDJ/ywdB04t89/1O/w1cDnyilFU='
        },
        data
      };

      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));

      // Set notificationSent to true to indicate that the notification has been sent
      setNotificationSent(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={pushNotification} disabled={notificationSent}>
        {notificationSent ? 'Notification Sent' : 'Send Line Notification'}
      </button>
    </div>
  );
}

export default LinePush;
