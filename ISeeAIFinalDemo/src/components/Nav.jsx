import React from 'react'
import './Component.css'
import logo from '../assets/voice.png'

function Nav() {

  const handleNavBarClick = () => {
    window.location.href = './App.jsx'; // Specify the path of your home page
  };

  return (
    <>
      <div className='navBar' onClick={handleNavBarClick}>
        <img className='logoImg'  src={logo} alt='IseeAI logo'/>
        <span className='brandName'>IseeAI</span>
      </div>
    </>
  )
}

export default Nav
