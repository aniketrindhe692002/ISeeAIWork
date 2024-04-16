import React from 'react';
import { TexttoVoice } from './TexttoVoice';

export function NewsUpdate(transcript, setTranscript) {

        const fetchData = async () => {
            const res = await fetch("https://newsapi.org/v2/top-headlines?country=in&apiKey=15c67e5f0742490ab70606684d6768e0");
            let data = await res.json();
            TexttoVoice("Todays Top 10 are");
            for (let i = 0; i < 10; i++) {
                TexttoVoice(data.articles[i].title);
                setTranscript(data.articles[i].title);
                TexttoVoice(data.articles[i].description);
            }
        };

        fetchData();

    return null; // Or render JSX if needed
}
