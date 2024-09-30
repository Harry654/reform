"use client";

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, Mic, Check, ChevronLeft } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';
import { useParams } from "next/navigation";

type Response = {
  questionId: string;
  questionType: string;
  questionText: string;
  answer: string;
};

type Message = {
  id: number;
  text: string;
  sender: 'ai' | 'user';
}


export default function ChatSurvey() {
  const defaultMessage = { id: 1, text: "Hello! I'm ReformAI. Let's begin the survey", sender: 'ai' }
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [responses, setResponses] = useState([]);
  const { surveyId } = useParams();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSurveyComplete, setSurveyComplete] = useState(false);
  const [surveyInfo, setSurveyInfo] = useState({});
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatStartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  function convertToMessages(allResponses, tempQuestion) {
    if(Boolean(tempQuestion)) {
      const res =  allResponses.map((response, i) => {
        return [{ id: i+"-ai", text: response.questionText, sender: "ai" }, { id: i+"-user", text: response.answer, sender: "user" }]
      }).flat()
      res.push({id: "temp", text: tempQuestion.text, sender: "ai"})
      return res
    }
    return allResponses.map((response, i) => {
      return [{ id: i+"-ai", text: response.questionText, sender: "ai" }, { id: i+"-user", text: response.answer, sender: "user" }]
    }).flat()
  }

  async function getAndOptimizeNextQuestion(questionNumber, previousResponse, updatedResponses) {
    try {
      const response = await fetch(`/api/survey/id/${surveyId}/question/${questionNumber}`, {
        method: "POST",
        "Content-Type": "application/json",
        body: JSON.stringify({
          previousQuestion: currentQuestion,
          previousResponse
        })
      })
      const result = await response.json()
      console.log("Responses befores send to ai", updatedResponses)
      setMessages([...convertToMessages(updatedResponses, result)])
      setCurrentQuestion(result)
      if(result?.error) {
        throw new Error(result.error)
      }
    } catch(err) {
      console.log(err)
      setIsTyping(false)
      alert(err.message)
    }
  }

  async function initializeSurvey() {
    if(messages.length>0)return
    try {
      setIsTyping(true)
      const response = await fetch("/api/survey/start/"+surveyId)
      const result = await response.json()
      // console.log(result)
      if(result?.error) {
        throw new Error(result.error)
      }
      setSurveyInfo({title: result.name, questionCount: result.questionCount})
      setMessages(convertToMessages([], result.question))
      setCurrentQuestion(result.question)
      setIsTyping(false)
    } catch (err) {
      console.log(err)
      setIsTyping(false)
      alert(err.message)
    }
  }

  useEffect(() => {
    initializeSurvey()
  }, [])

  const handleSend = async () => {
    if(isTyping)return
    if (input.trim()) {
      const newResponse = {
        questionId: currentQuestion.id,
        questionType: currentQuestion.type,
        questionText: currentQuestion.text,
        answer: input,
      }


      const updatedResponses = [...responses, newResponse];
      setResponses(updatedResponses);
      setMessages([...convertToMessages(updatedResponses, null)]);
      console.log("updatedresponses", updatedResponses)
      setInput('');
      setIsTyping(true);
      setProgress((prev) => {
        const newProgress = Math.min(prev + 1 / surveyInfo.questionCount, 1);
        if (newProgress === 1) {
          setSurveyComplete(true);
        }
        return newProgress;
      });

      // AI response
      console.log("progress", progress)
      await getAndOptimizeNextQuestion(updatedResponses.length+1, newResponse.answer, updatedResponses)
      setIsTyping(false);
    }
  };

  const handlers = useSwipeable({
    onSwipedRight: () => {
      console.log('Swiped right - go back');
    },
    trackMouse: true,
    trackTouch: true,
  });

  console.log("end messages", messages)
  console.log("end repsonses", responses)
  return (
    <div {...handlers} className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4 flex items-center">
        <button className="mr-2 md:hidden">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">ReformAI: {surveyInfo.title}</h1>
      </header>

      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 pb-24 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div ref={chatStartRef} />
          <AnimatePresence>
            {[defaultMessage, ...messages].map((message) => (
              // console.log(messages)
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
              <button style={{cursor: isTyping && "not-allowed"}} type="submit" className="p-2 bg-blue-500 text-white rounded-r-lg transition-colors">
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
