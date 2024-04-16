import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';
import wordsData from '../dataBase/mydata.json';
import Nav from './Nav';
import './Component.css';
import { TexttoVoice } from '../customHooks/TexttoVoice';

const videoConstraints = {
    width: window.innerWidth, // Adjust width as needed
    height: window.innerWidth, // Adjust height as needed
    facingMode: 'environment',
};

const Camera = ({transcript , setTranscript}) => {
    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [detectedText, setDetectedText] = useState('');

    const captureAndDetectText = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc); // Set the captured image src
        const text = await detectText(imageSrc);
        setDetectedText(text);
        matchWordInText(text, 'specific word');
    };

    const detectText = async (imageSrc) => {
        try {
            const { data: { text } } = await Tesseract.recognize(imageSrc, 'eng', { logger: m => console.log(m) });
            console.log('Detected text:', text); // Print detected text to console
            return text;
        } catch (error) {
            console.error('Error detecting text:', error);
            return '';
        }
    };
    const matchWordInText = (text) => {
        // Clean the detected text: remove leading/trailing whitespace and punctuation, convert to lowercase
        const cleanedText = text.trim().replace(/[^\w\s]/g, '').toLowerCase();

        // Iterate over the entries in the JSON data
        const matchedWords = wordsData.filter(word => {
            // Clean the word from JSON data: remove leading/trailing whitespace and punctuation, convert to lowercase
            const cleanedWord = word.name.trim().replace(/[^\w\s]/g, '').toLowerCase();

            // Check if the cleaned word exists in the cleaned detected text
            return cleanedText.includes(cleanedWord);
        });

        // Check if any matching word was found
        if (matchedWords.length > 0) {
            console.log('Matched words:', matchedWords);
            if(matchedWords.length >1){
                TexttoVoice("Matched Words are more than one");
                TexttoVoice("The Words are")
                for(let i=0; i<matchedWords.length; i++){
                    TexttoVoice(matchedWords[i].name);
                    TexttoVoice(matchedWords[i].description);
                }
            }else{
                TexttoVoice("Matched Words is only one");
                TexttoVoice(matchedWords[0].name);
                TexttoVoice(matchedWords[0].description);
            }
        } else {
            console.log('No matching words found in JSON data');
        }
    };


    return (
        <>
            <div className='webcam-container'>
                <Nav />
                <div className="photoTake">
                    <Webcam
                        className="myphoto"
                        audio={false}
                        height={videoConstraints.height}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={videoConstraints.width}
                        videoConstraints={videoConstraints}
                        onClick={captureAndDetectText}
                        style={{marginTop:'50px'}}
                    />
                </div>
                {capturedImage && <img style={{height:'250px', marginLeft:'70px', marginTop:'30px' , border:'5px solid white'}} src={capturedImage} alt="Captured" />}
            </div>
        </>
    );
};

export default Camera;