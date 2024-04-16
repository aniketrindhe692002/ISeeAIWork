import React, { useEffect, useState, useRef } from 'react';
import Body from './Body';
import './Component.css';
import alarmAudio from './assets/alarm-clock-short-6402.mp3'
import WebcamCapture from './WebcamCapture';

function App() {

  // Speech to Text Code

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-IN';
  recognition.maxAlternatives = 2;
  let prevInputText = '';

  let [myInputText, setInputText] = useState('Welcome to IseeAI');
  const [speaking, setSpeaking] = useState(false);

  const handleRecognitionStart = () => {
    recognition.start();
  };


  recognition.onresult = (event) => {
    let transcript = event.results[0][0].transcript;
    console.log('transcript text:', transcript);
    myInputText = "";
    myInputText += transcript;
    setInputText(myInputText);
    console.log('myInputText:', myInputText);
  };

  useEffect(() => {
    // Convert input text to lowercase for case insensitivity
    const inputTextLowercase = myInputText.toLowerCase();

    // Check if the command to open the camera is detected
    if (inputTextLowercase.includes('open camera')) {
      setShowCamera(true);
    } else {
      setShowCamera(false);
    }

    // Speak the input text
    if (myInputText !== '' && myInputText !== prevInputText) {
      const utterance = new SpeechSynthesisUtterance(myInputText);
      setSpeaking(true);
      utterance.onend = () => {
        setSpeaking(false);
      };
      window.speechSynthesis.speak(utterance);
      prevInputText = myInputText;
    }
  }, [myInputText]);


  // Camera Operation Part

  const [showCamera, setShowCamera] = useState(false);

  const handleCloseCamera = () => {
    const videoElement = document.getElementById('camera-video');
    if (videoElement) {
      const stream = videoElement.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
    setShowCamera(false);
    setInputText('');
    window.location.href = './App.jsx';
  };

  // Set Alarm

  const audio = new Audio(alarmAudio);

  function playAlarm() {
    audio.play();
  }

  let currentTime = new Date();

  const existingAlarm = localStorage.getItem('alarm');
  if (existingAlarm) {
    const { time, type } = JSON.parse(existingAlarm);
    setAlarm(time, type);
  }

  function setAlarm(time, type) {
    const alarmTime = Date.now() + (type === 'hours' ? time * 60 * 60 * 1000 : time * 60 * 1000);
    localStorage.setItem('alarm', JSON.stringify({ time, type }));
    setTimeout(() => {
      playAlarm();
      localStorage.removeItem('alarm'); // Remove the alarm after it's triggered
    }, alarmTime - Date.now());
  }

  if (myInputText.toLowerCase().includes('set alarm')) {
    myInputText = `Current time is ${currentTime.getHours()} hours & ${currentTime.getMinutes()} Minutes. Tell me Do you want to set the alarm for how many hours or minutes?`;

    recognition.onresult = (event) => {
      const myAlarmInput = event.results[0][0].transcript.toLowerCase();
      const regex = /\d+/;
      const match = myAlarmInput.match(regex);
      const time = match ? parseInt(match[0]) : null;
      if (myAlarmInput.includes('hours') || myAlarmInput.includes('hour')) {
        setInputText(`Alarm is set for ${time} hour`);
        setAlarm(time, 'hours');
      } else if (myAlarmInput.includes('minutes') || myAlarmInput.includes('minute')) {
        setInputText(`Alarm is set for ${time} Minute`);
        setAlarm(time, 'minutes');
      }
    };
  }

  
  
  

  return (
    <>
      <Body myInputText={myInputText} handleRecognitionStart={handleRecognitionStart} />
      {showCamera && <WebcamCapture onClose={handleCloseCamera} recognition={recognition} />}
    </>
  );
}

export default App;
