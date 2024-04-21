import React, { useState } from 'react'

const OpenAiAPI = process.env.OPENAI_API_KEY;

function ChatBot() {
  const [message, setMessage] = useState('');
  const [allMessage, setAllmessage] = useState([]);

  const sendMessage = async () => {
    // console.log(message);

    let url =  "https://api.openai.com/v1/chat/completions";
    let token = `Bearer ${OpenAiAPI}`;
    let model = 'gpt-3.5-turbo';

    let messagesToSend = [
        ...allMessage,
        {
            role:'user',
            content:message
        }
    ]

    let res = await fetch(url,{
        method : 'POST',
        headers : {
            'Authorization':token,
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            model : model,
            messages : messagesToSend 

        })
    })
    let resjson = await res.json();
    if(resjson){
        console.log(resjson);
    }
  }
}

export default ChatBot
