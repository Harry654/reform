"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, Mic, Check, ChevronLeft } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

type Message = {
  id: number;
  text: string;
  sender: 'ai' | 'user';
};

const MESSAGES_PER_PAGE = 20;
const TOTAL_QUESTIONS = 5; // Adjust based on your survey length

export default function ChatSurvey() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm ReformAI. Let's start our conversation about your experience. How was your day today?", sender: 'ai' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSurveyComplete, setSurveyComplete] = useState(false);
  const [page, setPage] = useState(1);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatStartRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadMoreMessages = useCallback(() => {
    if (page * MESSAGES_PER_PAGE >= messages.length) return;

    setIsLoading(true);

    // Simulate API call to load more messages
    setTimeout(() => {
      const newMessages = messages.slice((page - 1) * MESSAGES_PER_PAGE, page * MESSAGES_PER_PAGE);
      setMessages((prevMessages) => [...newMessages, ...prevMessages]);
      setPage((prevPage) => prevPage + 1);
      setIsLoading(false);
    }, 1000);
  }, [messages, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMoreMessages();
        }
      },
      { threshold: 1 }
    );

    if (chatStartRef.current) {
      observer.observe(chatStartRef.current);
    }

    return () => observer.disconnect();
  }, [loadMoreMessages, isLoading]);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = { id: messages.length + 1, text: input, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInput('');
      setIsTyping(true);
      setProgress((prev) => {
        const newProgress = Math.min(prev + 1 / TOTAL_QUESTIONS, 1);
        if (newProgress === 1) {
          setSurveyComplete(true);
        }
        return newProgress;
      });

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = { id: messages.length + 2, text: getAIResponse(input), sender: 'ai' };
        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const getAIResponse = (userInput: string): string => {
    console.log(userInput);
    // Placeholder for actual AI logic
    const responses = [
      "That's interesting! Can you tell me more about that?",
      'I see. How does that make you feel?',
      'Thank you for sharing. On a scale of 1-10, how would you rate your experience?',
      'I appreciate your input. Is there anything else you\'d like to add?',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handlers = useSwipeable({
    onSwipedRight: () => {
      console.log('Swiped right - go back');
    },
    trackMouse: true,
    trackTouch: true,
  });

  return (
    <div {...handlers} className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4 flex items-center">
        <button className="mr-2 md:hidden">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">ReformAI-[Survey Name]</h1>
      </header>

      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 pb-24 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div ref={chatStartRef} />
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`mb-4 ${message.sender === 'ai' ? 'text-left' : 'text-right'}`}
              >
                <div
                  className={`inline-block p-3 rounded-lg max-w-[80%] md:max-w-[70%] ${
                    message.sender === 'ai'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {message.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <div className="text-left mb-4">
              <div className="inline-block p-3 rounded-lg bg-gray-200">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                  className="w-12 h-6 flex justify-around items-center"
                >
                  <div className="w-2 h-2 bg-gray-500 rounded-full" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full" />
                </motion.div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4">
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex items-center mb-4">
              <div className="flex-1 h-2 bg-gray-200 rounded-full">
                <motion.div
                  className="h-2 bg-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your response..."
                className="flex-1 p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="p-2 bg-blue-500 text-white rounded-r-lg transition-colors">
                <Send size={20} />
              </button>
              <button type="button" className="p-2 ml-2 bg-gray-200 text-gray-600 rounded-lg transition-colors">
                <Mic size={20} />
              </button>
            </form>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {isSurveyComplete && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-green-100 rounded-full p-2">
                  <Check className="text-green-500" size={32} />
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-center mb-2">Survey Complete!</h2>
              <p className="text-center text-gray-600 mb-4">
                Thank you for participating in our survey. Your feedback is valuable to us.
              </p>
              <button
                onClick={() => setSurveyComplete(false)}
                className="w-full p-2 bg-blue-500 text-white rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
