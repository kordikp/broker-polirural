import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Props {
  onClose: () => void;
}

export const AIAssistant: React.FC<Props> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I am your AI assistant. I can help you with:' +
        '\n• Finding potential matches between farmers and customers' +
        '\n• Analyzing market trends and making predictions' +
        '\n• Suggesting optimal pricing strategies' +
        '\n• Identifying opportunities for collaboration' +
        '\n\nHow can I assist you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        role: 'assistant',
        content: 'I understand you need help with "' + userMessage.content + '". ' +
          'I am analyzing the available data and market conditions to provide you with the best recommendations. ' +
          'This feature will be implemented in the next update.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <Card className={`max-w-[80%] ${message.role === 'assistant' ? 'bg-gray-50' : ''}`}>
              <CardContent className="p-3">
                <div className="whitespace-pre-wrap">{message.content}</div>
                <div className="text-xs text-gray-400 mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={!input.trim() || isProcessing}
            className={`px-4 py-2 rounded-lg text-white ${
              !input.trim() || isProcessing
                ? 'bg-gray-300'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isProcessing ? 'Processing...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}; 