import React, { useState } from 'react';
import logo from '../assets/voice.png';
import Nav from './Nav';
import './Component.css';
import {TexttoVoice} from '../customHooks/TexttoVoice';
import { SetAlarm } from '../customHooks/SetAlarm';
import { Detection } from '../customHooks/Detection';
import { ChatBot } from '../customHooks/ChatBot';
import { NewsUpdate } from '../customHooks/NewsUpdate';

function Body(props) {

  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);

  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-IN';
  recognition.maxAlternatives = 2;

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
  }else if(transcript.toLowerCase().includes('open camera')){
    Detection("Yo are in Detection part");
  }else if(transcript.toLowerCase().includes('news update')){
    NewsUpdate(transcript, setTranscript);
  }else{
    ChatBot(transcript, setTranscript);
    
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

export default Body
