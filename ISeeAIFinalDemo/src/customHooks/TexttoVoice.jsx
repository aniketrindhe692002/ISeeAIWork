import React from 'react'


export function TexttoVoice(text) {
  
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);

}


