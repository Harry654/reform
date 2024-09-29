"use client";

import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Mic, Check, ChevronLeft } from "lucide-react";
import { useSwipeable } from "react-swipeable";
import FullPageLoader from "@/components/FullPageLoader";
import { ISurvey,  } from "@/types/survey";
import { MCQQuestionFill, RatingQuestionFill } from "./QuestionFillComponents";
import { Question } from "@/types/question";

interface InteractiveSurveyResponseProps {
  surveyData: ISurvey;
}

type Message = {
  id: number;
  content: string | React.ReactNode;
  sender: "ai" | "user";
};

export const InteractiveSurveyResponse: React.FC<InteractiveSurveyResponseProps> = ({ surveyData }) => {
  const MESSAGES_PER_PAGE = 20;
  const all_questions = surveyData.sections.flatMap((section) => section.questions);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: `Hello! I'm ReformAI. Let's start our conversation about ${surveyData.title}. How are you feeling today?`,
      sender: "ai",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSurveyComplete, setSurveyComplete] = useState(false);
  const [page, setPage] = useState(1);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatStartRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadMoreMessages = useCallback(() => {
    if (page * MESSAGES_PER_PAGE >= messages.length) return;

    setIsLoading(true);

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
      const newMessage: Message = {
        id: messages.length + 1,
        content: input,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      setInput("");
      setIsTyping(true);
      setProgress((prev) => {
        const newProgress = Math.min(prev + 1 / all_questions.length, 1);
        if (newProgress === 1) {
          setSurveyComplete(true);
        }
        return newProgress;
      });

      setTimeout(() => {
        const aiResponse = getAIResponse(input);
        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);
        if (currentQuestionIndex < all_questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      }, 1500);
    }
  };

  const getAIResponse = (userInput: string): Message => {
    const responses = [
      "That's interesting! Can you elaborate on that?",
      "I see. How does that make you feel?",
      "Thank you for sharing. Let's move on to the next question.",
      "I appreciate your input. Is there anything else you'd like to add before we continue?",
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    const nextQuestion = all_questions[currentQuestionIndex];
    const questionComponent = renderQuestionComponent(nextQuestion);

    return {
      id: messages.length + 2,
      content: (
        <>
          <p className="mb-4">{randomResponse}</p>
          {questionComponent}
        </>
      ),
      sender: "ai",
    };
  };

  const renderQuestionComponent = (question: Question) => {
    switch (question.type) {
      case "mcq":
        return <MCQQuestionFill question={question} />;
      case "rating":
        return <RatingQuestionFill question={question} />;
      default:
        return null;
    }
  };

  const handlers = useSwipeable({
    onSwipedRight: () => {
      console.log("Swiped right - go back");
    },
    trackMouse: true,
    trackTouch: true,
  });

  return (
    <Suspense fallback={<FullPageLoader />}>
      <div
        {...handlers}
        className="max-w-screen-md mx-auto flex flex-col h-screen bg-gradient-to-b from-blue-50 to-white font-sans"
      >
        <header className="bg-white shadow-sm p-4 flex items-center">
          <button className="mr-2 md:hidden">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl md:text-2xl font-semibold text-blue-800">
            {surveyData.title}
          </h1>
        </header>

        <main className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 pb-24 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100">
            <div ref={chatStartRef} />
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-4 ${
                    message.sender === "ai" ? "text-left" : "text-right"
                  }`}
                >
                  <div
                    className={`inline-block p-4 rounded-lg max-w-[80%] md:max-w-[70%] ${
                      message.sender === "ai"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <div className="text-left mb-4">
                <div className="inline-block p-3 rounded-lg bg-blue-100">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="w-12 h-6 flex justify-around items-center"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  </motion.div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="bottom-0 left-0 right-0 bg-white shadow-md p-4">
            <div className="w-full max-w-7xl mx-auto">
              <div className="flex items-center mb-4">
                <div className="flex-1 h-2 bg-blue-200 rounded-full">
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
                  className="flex-1 p-3 rounded-l-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-800 placeholder-blue-400"
                />
                <button
                  type="submit"
                  className="p-3 bg-blue-500 text-white rounded-r-lg transition-colors hover:bg-blue-600"
                >
                  <Send size={20} />
                </button>
                <button
                  type="button"
                  className="p-3 ml-2 bg-blue-100 text-blue-600 rounded-lg transition-colors hover:bg-blue-200"
                >
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
                <h2 className="text-2xl font-semibold text-center mb-2 text-blue-800">
                  Survey Complete!
                </h2>
                <p className="text-center text-blue-600 mb-4">
                  Thank you for participating in our survey. Your feedback is valuable to us.
                </p>
                <button
                  onClick={() => setSurveyComplete(false)}
                  className="w-full p-3 bg-blue-500 text-white rounded-lg transition-colors hover:bg-blue-600"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Suspense>
  );
};