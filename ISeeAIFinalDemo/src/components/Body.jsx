import React, { useEffect, useState } from 'react';
import logo from '../assets/voice.png';
import Nav from './Nav';
import './Component.css';
import { TexttoVoice } from '../customHooks/TexttoVoice';
import { SetAlarm } from '../customHooks/SetAlarm';
import Camera from './Camera';
import { Newsdemo } from '../customHooks/Newsdemo';
import { AddReminder } from '../customHooks/addReminder';
import axios from 'axios';
import { ChatComponent } from './ChatComponent';

function Body(props) {

  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const [camera, setCamera] = useState(false);

  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-IN';
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    console.log('Voice recognition started');
    setListening(true);
  };

  recognition.onend = () => {
    console.log('Voice recognition ended');
    setListening(false);
  };

  const startListening = () => {
    console.log('Start listening');
    recognition.start();
  };

  recognition.onresult = (event) => {
    const last = event.results.length - 1;
    const text = event.results[last][0].transcript;
    console.log('Transcript:', text);
    setTranscript(text);
    TexttoVoice(text);  //Function to convert Text Into Voice 
  };

  useEffect(() => {
    if (transcript.toLowerCase().includes('stella')) {
      if (transcript.toLowerCase().includes('set alarm')) {
        SetAlarm(transcript, setTranscript);
      } else if (transcript.toLowerCase().includes('news update')) {
        Newsdemo(transcript, setTranscript);
      } else if (transcript.toLowerCase().includes('open camera')) {
        setCamera(true);
      } else if (transcript.toLowerCase().includes('current time')) {
        let time = new Date();
        let timeHr = time.getHours();
        let timeMn = time.getMinutes();
        let currTime = `Current Time is ${timeHr} hours & ${timeMn} Minutes`;
        TexttoVoice(currTime);
      } else if (transcript.toLowerCase().includes("today's date")) {
        const currentDate = new Date();
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const day = dayNames[currentDate.getDay()];
        const month = monthNames[currentDate.getMonth()];
        const year = currentDate.getFullYear();
        let currDate = `Today is ${day}, ${month}, ${year}`;
        TexttoVoice(currDate);
      } else if (transcript.toLowerCase().includes("add reminder")) {
        AddReminder(transcript);
      } else {
        console.log(transcript);
        async function generateAnswer() {
          try {
            const response = await axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBwgVFQpK7PxZeZbvNnJTMTXcpHXyuCB88",
              {
                "contents": [
                  { "parts": [{ "text": transcript + "in 3 lines" }] }
                ]
              }
            );
            console.log(response);
            const myres = response.data.candidates[0].content.parts[0].text;
            console.log("My response : ", myres);
            let len = myres.length;
            const res1 = myres.substring(0, parseInt(len/2));
            const res2 = myres.substring(parseInt(len/2), len);
            TexttoVoice(res1);
            TexttoVoice(res2);
          } catch (error) {
            console.error("Error generating answer:", error);
          }
        }
        generateAnswer();
      }
    } else {
      console.log("I didn't get that can you please repeat");
    }
  }, [transcript]);

  return (
    <>
      <Nav />
      {camera && <Camera transcript={transcript} setTranscript={setTranscript} className="cameraOverlay" />}
      { !camera && <div className='myBody' style={{zIndex:'9999'}}>
      <span className='press'>Press To Talk....</span>
      <img src={logo} onClick={startListening} alt='MainBodyLogo' className='bodyLogo' />
      <p id='showInput'>{transcript || 'Welcome to IseeAI'}</p>
    </div>}
    </>
  )
}

export default Body;
