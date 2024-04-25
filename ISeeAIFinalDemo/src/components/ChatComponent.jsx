import React, { useState } from 'react';
import axios from 'axios';

export const ChatComponent = ({transcript,setTranscript}) => {

  async function generateAnswer() {
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBwgVFQpK7PxZeZbvNnJTMTXcpHXyuCB88",
      method: "post",
      data: { 
        "contents": [
          { "parts": [{ "text": transcript }] }
        ] 
      }
    })
    console.log(response);
    return response;
  }

  // return generateAnswer();
};

// export default ChatComponent;
