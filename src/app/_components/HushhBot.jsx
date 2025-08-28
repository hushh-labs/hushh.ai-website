'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HushhBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m Hushh Bot, your AI assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const typingIdRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);
    setError(null);

    // Add a rich typing placeholder message that will be replaced once the API responds
    const typingId = `typing-${Date.now()}`;
    typingIdRef.current = typingId;
    setMessages(prev => [
      ...prev,
      {
        id: typingId,
        type: 'typing',
        content: '',
        timestamp: new Date()
      }
    ]);

    try {
      const response = await fetch('https://hushh-techh.onrender.com/api/hushh/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: inputValue.trim()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Simulate small delay for smoother UX and then replace typing bubble
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: data.response || data.message || 'I apologize, but I couldn\'t process your request. Please try again.',
          timestamp: new Date()
        };
        setMessages(prev => {
          const withoutTyping = prev.filter(m => m.id !== typingIdRef.current);
          return [...withoutTyping, botMessage];
        });
        setIsLoading(false);
        setIsTyping(false);
      }, 500);

    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'Sorry, I\'m experiencing some technical difficulties. Please try again later.',
        timestamp: new Date()
      };
      setMessages(prev => {
        const withoutTyping = prev.filter(m => m.id !== typingIdRef.current);
        return [...withoutTyping, errorMessage];
      });
      setError(error.message);
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleClose = () => {
    setIsOpen(false);
    setError(null);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 z-[9999] w-16 h-16 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        aria-label="Toggle Hushh Bot chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
        
        {/* Pulse animation when closed */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-400 opacity-75"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Chatbot Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 pt-16 sm:inset-auto sm:bottom-20 sm:right-2 sm:left-auto sm:top-auto sm:pt-0 sm:w-[calc(100vw-1rem)] md:bottom-20 md:right-6 md:w-72 lg:bottom-24 lg:right-8 lg:w-80 sm:h-[450px] md:h-[450px] lg:h-[500px] bg-white sm:rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden z-[9999]"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-4 sm:px-3 sm:py-3 md:px-4 md:py-3 lg:px-5 lg:py-4 pr-12 text-white min-h-[64px] sm:min-h-0">
              <div className="flex items-center">
                <div className="flex items-center space-x-3 md:space-x-3 max-w-[75%] sm:max-w-none overflow-hidden">
                  <div className="w-8 h-8 sm:w-7 sm:h-7 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-semibold text-lg sm:text-base md:text-base lg:text-lg leading-tight whitespace-nowrap overflow-hidden text-ellipsis">Hushh Bot</h3>
                    <p className="text-sm sm:text-xs md:text-xs lg:text-sm text-blue-100 leading-tight whitespace-nowrap overflow-hidden text-ellipsis">AI Assistant</p>
                  </div>
                </div>
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 sm:p-1 hover:bg-white/20 rounded-full transition-colors flex items-center justify-center"
                  aria-label="Close chat"
                >
                  <svg className="w-6 h-6 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-3 md:p-3 lg:p-4 space-y-3 sm:space-y-3 md:space-y-3 lg:space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {message.type === 'typing' ? (
                    <div className="max-w-[75%] sm:max-w-[75%] md:max-w-[70%] lg:max-w-[60%]">
                      <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-2xl rounded-bl-md shadow-sm">
                        <span className="sr-only">Hushh is typing…</span>
                        <motion.span className="w-2.5 h-2.5 bg-white/90 rounded-full"
                          animate={{ y: [0, -4, 0], opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' }} />
                        <motion.span className="w-2.5 h-2.5 bg-white/90 rounded-full"
                          animate={{ y: [0, -4, 0], opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop', delay: 0.15 }} />
                        <motion.span className="w-2.5 h-2.5 bg-white/90 rounded-full"
                          animate={{ y: [0, -4, 0], opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop', delay: 0.3 }} />
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`max-w-[85%] sm:max-w-[85%] md:max-w-[85%] lg:max-w-[80%] px-4 py-3 sm:px-3 sm:py-2 md:px-3 md:py-2 lg:px-4 lg:py-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white rounded-br-md'
                          : 'bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-200'
                      }`}
                    >
                      <p className="text-base sm:text-sm leading-relaxed break-words">{message.content}</p>
                      <p className={`text-sm sm:text-xs mt-2 sm:mt-1 md:mt-1 lg:mt-2 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Error Display */}
            {error && (
              <div className="px-4 py-2 bg-red-50 border-t border-red-200">
                <p className="text-xs text-red-600 text-center">
                  Connection error. Please check your internet connection.
                </p>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 sm:p-3 md:p-3 lg:p-4 bg-white border-t border-gray-200">
              <div className="flex space-x-3 sm:space-x-2">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="w-full px-4 py-3 sm:px-3 sm:py-2 md:px-3 md:py-2 lg:px-4 lg:py-3 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base sm:text-sm"
                    rows={1}
                    style={{ minHeight: '48px', maxHeight: '120px' }}
                    onInput={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                    }}
                    disabled={isLoading}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="w-12 h-12 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-11 lg:h-11 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <svg className="w-5 h-5 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                </button>
              </div>
              
              {/* Footer */}
              <div className="mt-3 sm:mt-2 md:mt-2 lg:mt-3 text-center">
                <p className="text-sm sm:text-xs text-gray-500">
                  Powered by Hushh AI • Your data, your privacy
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HushhBot;
