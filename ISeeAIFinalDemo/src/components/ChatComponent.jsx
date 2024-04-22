import React, { useState } from 'react';
import axios from 'axios';

const ChatComponent = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    try {
      // Make a request to the ChatGPT API with the user input
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          prompt: input,
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer sk-proj-NN85dqWMUXKY6IRGNxWjT3BlbkFJSZQzBXiDP6jqlU3TIhhm`,
          },
        }
      );

      // Update the conversation history with the response from ChatGPT
      setMessages([...messages, { role: 'user', content: input }, { role: 'assistant', content: response.data.choices[0].text }]);
      console.log(messages);
      // Clear the input field
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <div>
        <input type="text" value={input} onChange={handleInputChange} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;
