import React, { useRef, useEffect } from 'react';

const Camera = ({ onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Enable camera and set up video stream
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    enableCamera();

  }, []);

  const handleCapturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL('image/jpeg');
      console.log("This block is executed");
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'captured_photo.jpg';
      document.body.appendChild(link);
      link.click();
      // Clean up
      document.body.removeChild(link);
    }
  };

  return (
    <div className="camera-container">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        onDoubleClick={handleCapturePhoto}
      />
      <button onClick={onClose}>Close Camera</button>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default Camera;
