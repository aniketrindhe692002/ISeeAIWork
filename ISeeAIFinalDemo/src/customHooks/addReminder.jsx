// import reminderTone from '../assets/reminderTone.mp3';
import { TexttoVoice } from './TexttoVoice';

export const AddReminder = (command) => {

    if (command.includes('add reminder')) {
        const reminderIndex = command.indexOf('add reminder');
        const reminderText = command.substring(reminderIndex + 'add reminder'.length).trim();

        // Extracting time duration from command (e.g., "after 2 hours" or "after 30 minutes")
        const timeIndex = command.indexOf('after');
        if (timeIndex !== -1) {
            const timeText = command.substring(timeIndex + 'after'.length).trim();
            const [duration, timeUnit] = timeText.split(' ');
            let reminderTime;

            if (timeUnit === 'hours' || timeUnit === 'hour') {
                reminderTime = new Date(Date.now() + parseInt(duration) * 3600 * 1000); // Convert hours to milliseconds
            } else if (timeUnit === 'minutes' || timeUnit === 'minute') {
                reminderTime = new Date(Date.now() + parseInt(duration) * 60 * 1000); // Convert minutes to milliseconds
            } else {
                console.error('Invalid time unit. Please use "hours" or "minutes".');
                return;
            }

            // Store reminder in local storage
            const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
            reminders.push({ text: reminderText, time: reminderTime.getTime() });
            localStorage.setItem('reminders', JSON.stringify(reminders));

            // Set reminder to log to console and play alarm tone after specified time
            setTimeout(() => {
                console.log(`Reminder: ${reminderText}`);
                // playAlarm(); // Play the alarm tone
                TexttoVoice(`Reminder: ${reminderText}`);
            }, reminderTime - Date.now());
        } else {
            console.error('Invalid command. Please include the time duration.');
        }
    }
};

