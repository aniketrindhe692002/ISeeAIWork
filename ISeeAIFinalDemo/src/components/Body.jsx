import React, { useState } from 'react';
import logo from '../assets/voice.png';
import Nav from './Nav';
import './Component.css';
import { TexttoVoice } from '../customHooks/TexttoVoice';
import { SetAlarm } from '../customHooks/SetAlarm';
import { NewsUpdate } from '../customHooks/NewsUpdate';
import Camera from './Camera';
import { Newsdemo } from '../customHooks/Newsdemo';
import { AddReminder } from '../customHooks/addReminder';
import introVoice from '../assets/introVoice.mp3';

function Body(props) {

  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const [camera, setCamera] = useState(false);
  // const [intro , setIntro] = useState("Hello there,I'm Stella, your friendly AI companion from the future. I'm here to make your life simpler and more exciting. While I may reside in the digital realm, my purpose is grounded in helping you navigate the complexities of the modern world.Think of me as your personal assistant, ready to lend a hand whenever you need it. Whether it's setting reminders for important tasks, keeping you up-to-date with the latest news, or just sharing a joke to brighten your day, I'm always at your service.Together, we'll embark on a journey of discovery, exploring the endless possibilities that lie ahead. So, buckle up and get ready to dive into the future with Stella by your side.happy to tell you that this project is developed by the team debug. Welcome aboard!");

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


  if (transcript.toLowerCase().includes('set alarm')) {
    SetAlarm(transcript, setTranscript);
  } else if (transcript.toLowerCase().includes('news update')) {
    // NewsUpdate(transcript, setTranscript);
    Newsdemo(transcript, setTranscript);
  } else if (transcript.toLowerCase().includes('open camera')) {
    return (
      <Camera transcript={transcript} setTranscript={setTranscript} />

    )
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
