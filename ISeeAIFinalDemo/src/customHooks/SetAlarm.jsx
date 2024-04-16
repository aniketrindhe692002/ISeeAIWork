import React from 'react';
import alarmAudio from '../assets/alarm-clock-short-6402.mp3';
import { TexttoVoice } from './TexttoVoice';

export function SetAlarm(transcript, setTranscript) {

    const audio = new Audio(alarmAudio);

    function playAlarm() {
        audio.play();
    }

    const currentTime = new Date();
    let existingAlarm;

    try {
        existingAlarm = JSON.parse(localStorage.getItem('alarm'));
    } catch (error) {
        console.error('Error parsing existing alarm:', error);
    }

    function setAlarm(time, type) {
        const alarmTime = Date.now() + (type === 'hours' ? time * 60 * 60 * 1000 : time * 60 * 1000);
        localStorage.setItem('alarm', JSON.stringify({ time, type }));
        setTimeout(() => {
            playAlarm();
            localStorage.removeItem('alarm'); // Remove the alarm after it's triggered
        }, alarmTime - Date.now());
    }

    const myAlarmInput = transcript.toLowerCase();
    const regex = /\d+/;
    const match = myAlarmInput.match(regex);
    const time = match ? parseInt(match[0]) : null;
    if (myAlarmInput.includes('hours') || myAlarmInput.includes('hour')) {
        setAlarm(time, 'hours');
        setTranscript(`Alarm is set for ${time} hour`);
        TexttoVoice(`Alarm is set for ${time} hour`);
    } else if (myAlarmInput.includes('minutes') || myAlarmInput.includes('minute')) {
        setAlarm(time, 'minutes');
        setTranscript(`Alarm is set for ${time} minute`);
        TexttoVoice(`Alarm is set for ${time} minute`);
    }

}
