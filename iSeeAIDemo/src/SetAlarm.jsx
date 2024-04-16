import React from 'react'
import './Component.css';
import { useState } from 'react';

function SetAlarm({myInputText, handleRecognitionStart}) {

  // const [myAlarm, SetAlarm] = useState(false);
  let currentTime = new Date();
  currentTime = currentTime.get

  if(myInputText.includes('set Alarm')){
    // myAlarm = SetAlarm(true);
    myInputText = 'Current time is {currentTime} Tell After How Many Hours to put Alarm';
    handleRecognitionStart();
    console.log(myInputText);
  }
}

export default SetAlarm
