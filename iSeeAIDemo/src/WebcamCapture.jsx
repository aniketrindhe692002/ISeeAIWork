import React, { useState } from 'react';
import Webcam from 'react-webcam';
import DecodeImage from './DecodeImage';
import TextDetection from './TextDetection';

const videoConstraints = {
  width: window.innerWidth, // Adjust width as needed
  height: window.innerWidth, // Adjust height as needed
  facingMode: 'user',
};

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc); // Set the captured image src
    console.log(imageSrc);
  }, [webcamRef]);

  return (
    <>
      <div className="webcam-container">
        <Webcam
          className="myphoto"
          audio={false}
          height={videoConstraints.height}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={videoConstraints.width}
          videoConstraints={videoConstraints}
          onClick={capture} 
        />
      </div>
      { imageSrc && <DecodeImage imageSrc={imageSrc} />}
    </>
  );
};

export default WebcamCapture;
