import React from 'react';
import { TexttoVoice } from './TexttoVoice';

export function NewsUpdate({transcript, setTranscript}) {
    let fetchDataCalled = false;

    const fetchData = async () => {
        if (!fetchDataCalled) {
            fetchDataCalled = true;
            try {
                const res = await fetch("https://newsapi.org/v2/top-headlines?country=in&apiKey=15c67e5f0742490ab70606684d6768e0");
                const data = await res.json();
                TexttoVoice("Todays Top 10 are");
                // setTranscript("Todays Top 10 News");
                for (let i = 0; i < 10; i++) {
                    TexttoVoice(data.articles[i].title);
                    TexttoVoice(data.articles[i].description);
                    console.log(data.articles[i].title);
                }
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        }
    };

    fetchData();

    return null;
}
