import React from 'react';
import axios from 'axios';
import { TexttoVoice } from './TexttoVoice';


export function Newsdemo(transcript, setTranscript) {
    console.log("News Demo");
    const getNews = () => { 
        TexttoVoice("Todays Top 10 are");
        setTranscript("Todays Top 10 are");
        axios.get("http://localhost:3000")
            .then((response) => {
                const data = response.data.data;
                for(let i=0; i<10 ; i++){
                    let title = data[i].title;
                    let desc = data[i].description;
                    console.log(desc);
                    // setTranscript(title);
                    TexttoVoice(title);
                    TexttoVoice(desc);
                }
            })
    }
    getNews();

    return null;
}
