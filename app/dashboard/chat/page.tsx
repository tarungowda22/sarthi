'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Bot, 
  User, 
  MoreVertical, 
  Paperclip,
  Mic,
  Square,
  Sparkles,
  Clock
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I am SARTHI, your AI command center assistant. How can I help you today?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I understand your request. Let me process that information and provide you with the best solution based on my analysis.',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Chat Header */}
      <div className="card-glass p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-semibold">SARTHI AI Assistant</h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-gray-400 text-sm">Online</span>
              </div>
            </div>
          </div>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600' 
                    : 'bg-gradient-to-r from-blue-500 to-cyan-600'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`card-glass p-4 ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30' 
                    : 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30'
                }`}>
                  <p className="text-white text-sm leading-relaxed">{message.content}</p>
                  <div className={`flex items-center gap-1 mt-2 text-xs text-gray-400 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}>
                    <Clock className="w-3 h-3" />
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="card-glass p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="mt-4 card-glass p-4">
        <div className="flex items-end gap-3">
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              rows={1}
              className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none transition-colors"
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
          </div>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Mic className="w-5 h-5" />
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed glow-blue"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
          {['Analyze data', 'Generate report', 'Schedule task', 'System status'].map((action) => (
            <button
              key={action}
              onClick={() => setInput(action)}
              className="flex items-center gap-2 px-3 py-1.5 bg-black/30 border border-gray-700 rounded-full text-gray-300 text-sm hover:bg-black/50 hover:text-white transition-colors whitespace-nowrap"
            >
              <Sparkles className="w-3 h-3" />
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}