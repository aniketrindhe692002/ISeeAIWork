import React, { useState } from 'react';
import Nav from './Nav'; // Assuming Nav is a separate component
import './Component.css'; // Import your CSS file
import { TexttoVoice } from '../customHooks/TexttoVoice';

function VoiceNotesComponent() {
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);

  const startRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-IN';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log('Voice recognition started');
    };

    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const text = event.results[last][0].transcript;
      console.log('Transcript:', text);
      setTranscript(text);
    };

    recognition.onend = () => {
      console.log('Voice recognition ended');
    };

    recognition.start();
    setRecognition(recognition);
  };

  const stopRecognition = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  const handleButtonPress = () => {
    startRecognition();
  };

  const handleButtonRelease = () => {
    stopRecognition();
    // Store transcript in localStorage or perform any other action
  };

  return (
    <div className="voice-notes-container">
      <Nav />
      <div className="voice-notes-box">
        <p>{transcript || 'Speak now...'}</p>
      </div>
      <button onMouseDown={handleButtonPress} onMouseUp={handleButtonRelease}>
        Hold to Speak
      </button>
    </div>
  );
}

export default VoiceNotesComponent;
