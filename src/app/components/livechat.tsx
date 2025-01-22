"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FiSend } from 'react-icons/fi';

interface IMessage {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: string;
}

const LiveChat: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const msg: IMessage = {
        id: "1",
        userId: '123', // Replace with actual user data
        userName: 'User', // Replace with actual user data
        text: inputValue,
        timestamp: new Date().toLocaleString(), // Add current date and time

      };
      setMessages([...messages, msg]);
      setInputValue('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="live-chat-container flex flex-col h-500px">
      <h2 className="text-center text-2xl font-bold p-4">Live Chat</h2>
      <div className="messages flex-grow overflow-y-auto p-4 bg-gray-800 text-white">
        {messages.map((message) => (
          <div key={message.id} className="message mb-2 border-b border-gray-600 pb-2">
            <strong>{message.userId}:</strong> {message.text}
            <p>{message.timestamp}</p> {/* Display timestamp */}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container p-4 bg-gray-700 flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="flex-grow p-2 rounded-full bg-gray-600 text-white"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 p-2 rounded-full bg-blue-500 text-white"
        >
          <FiSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default LiveChat;