import React, { useState } from 'react';
import logo from '../assets/voice.png';
import Nav from './Nav';
import './Component.css';
import {TexttoVoice} from '../customHooks/TexttoVoice';
import { SetAlarm } from '../customHooks/SetAlarm';
// import { ChatBot } from '../customHooks/ChatBot';
import { NewsUpdate } from '../customHooks/NewsUpdate';
import Camera from './Camera';
import { Newsdemo } from '../customHooks/Newsdemo';
// import VoiceNotesComponent from './VoiceNotesComponent';

function Body(props) {

  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const [camera , setCamera] = useState(false);

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


  if(transcript.toLowerCase().includes('set alarm')){
    SetAlarm(transcript,setTranscript);
  }else if(transcript.toLowerCase().includes('news update')){
    // NewsUpdate(transcript, setTranscript);
    Newsdemo(transcript, setTranscript);
  }else if(transcript.toLowerCase().includes('open camera')){
    return(
      <Camera transcript={transcript} setTranscript={setTranscript}/>
      
    )
  }else if(transcript.toLowerCase().includes('current time')){  
    let time = new Date();
    let timeHr = time.getHours();
    let timeMn = time.getMinutes();
    let currTime = `Current Time is ${timeHr} hours & ${timeMn} Minutes`;
    TexttoVoice(currTime);

  }else if(transcript.toLowerCase().includes("today's date")){
    const currentDate = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const day = dayNames[currentDate.getDay()];
    const month = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    let currDate = `Today is ${day}, ${month}, ${year}`;
    TexttoVoice(currDate);
  }else{
    console.log(transcript);
  }


  return (
    <>
      <Nav />
      <div className='myBody'>
        <span className='press'>Press To Talk....</span>
        <img src={logo} onClick={startListening} alt='MainBodyLogo' className='bodyLogo' />
        <p id='showInput'>{transcript || 'Welcome to IseeAI'}</p>
      </div>
    </>
  )
}

export default Body;
