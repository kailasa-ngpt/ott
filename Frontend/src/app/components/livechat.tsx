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

  // Sample initial messages for demonstration
  useEffect(() => {
    // Simulate receiving some initial messages
    const initialMessages = [
      {
        id: "system-1",
        userId: "system",
        userName: "System",
        text: "Welcome to the live chat!",
        timestamp: new Date().toLocaleString(),
      },
      {
        id: "moderator-1",
        userId: "moderator",
        userName: "Moderator",
        text: "Please keep the conversation respectful.",
        timestamp: new Date().toLocaleString(),
      }
    ];
    
    setMessages(initialMessages);
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const msg: IMessage = {
        id: Date.now().toString(),
        userId: 'user-123', // Replace with actual user data
        userName: 'You', // Replace with actual user data
        text: inputValue,
        timestamp: new Date().toLocaleString(),
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
    <div className="live-chat-container flex flex-col h-500px rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <h2 className="text-center text-2xl font-bold p-4 text-black bg-white border-b border-gray-200">Live Chat</h2>
      
      <div className="messages flex-grow overflow-y-auto p-4 bg-white text-black">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`message mb-3 ${message.userId === 'user-123' ? 'text-right' : ''}`}
          >
            <div 
              className={`inline-block max-w-[85%] px-4 py-2 rounded-lg ${
                message.userId === 'user-123' 
                  ? 'bg-orange-gradient text-white' 
                  : 'bg-gray-100 text-black'
              }`}
            >
              <div className="font-semibold">
                {message.userName}
              </div>
              <div>{message.text}</div>
              <div className="text-xs mt-1 opacity-70">
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="input-container p-3 bg-white border-t border-gray-200 flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="flex-grow p-2 rounded-full border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#ff9901]"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 p-3 rounded-full"
          style={{
            background: 'linear-gradient(to right, #ff9901, #ff7801)',
          }}
        >
          <FiSend size={20} color="white" />
        </button>
      </div>
    </div>
  );
};

export default LiveChat;