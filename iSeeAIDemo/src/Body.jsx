import React, { useEffect, useState } from 'react';
import logo from './assets/voice.png';
import Nav from './Nav';
import './Component.css';

function Body(props) {

  return (
    <>
      <Nav />
      <div className='myBody'>
        <span className='press'>Press To Talk....</span>
        <img src={logo} onClick={props.handleRecognitionStart} alt='MainBodyLogo' className='bodyLogo' />
        <p id='showInput'>{props.myInputText}</p>
      </div>
    </>
  )
}

export default Body
