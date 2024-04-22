import React, { useState } from 'react';

function ChatBot({transcript}) {
  const [message, setMessage] = useState(transcript);
  const [allMessage, setAllmessage] = useState([]);
  const [response , setResponse] = useState('');

  const sendMessage = async () => {
    // console.log(message);

    let url =  "https://api.openai.com/v1/chat/completions";
    const token = `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`;
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
        setResponse(resjson);
    }else{
        console.log("Dont know aniket");
    }
  }
  sendMessage();
  return (
    <>
    <p id='showInput'>{response}</p>
    </>
  )
}

export default ChatBot
