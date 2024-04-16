import React, { createContext } from 'react';
import { useContext } from 'react';
import TextDetection from './TextDetection';

export const UserContextDecode = createContext();

function DecodeImage({ imageSrc }) {

    let myImage='';
    function base64Decoder(base64) {

        const http = new XMLHttpRequest();
        http.onload = () => {

            var url = window.URL.createObjectURL(http.response);
            var link = document.createElement('a');
            link.href = url;
            // response = response.blob(blob=> myImage=blob);
            fetch(imageSrc).then(response => response.blob()).then(blob => myImage = blob);
            link.click();
        }

        http.responseType = 'blob';
        http.open('GET', base64, true);
        http.send();
    }

    if (imageSrc !== '') {
        base64Decoder(imageSrc);
    }

    return (
        <UserContextDecode.Provider value={myImage} >
            
        </UserContextDecode.Provider>
    );
}

export default DecodeImage;
