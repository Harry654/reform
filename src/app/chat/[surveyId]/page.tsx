"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, Mic, Check, ChevronLeft } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';
import { useParams } from "next/navigation";
import FullPageLoader from '@/components/FullPageLoader';
import { Question } from '@/types/question';
import {
  CheckboxesQuestionFill,
  DateTimeQuestionFill,
  DropdownQuestionFill,
  FileUploadQuestionFill,
  ImageChoiceQuestionFill,
  LongAnswerQuestionFill, 
  MatrixQuestionFill, 
  MCQQuestionFill,
  RankingQuestionFill,
  RatingQuestionFill,
  ShortAnswerQuestionFill,
  SliderQuestionFill,
  YesNoQuestionFill
} from '@/components/fill/QuestionFillComponents';
import { useSurvey } from '@/context/SurveyResponseContext';

type AskedQuestion = {
  question: Question;
  answer: string;
}

type Message = {
  id: string;
  text: string;
  questionId: string;
  sender: 'ai' | 'user';
}


export default function ChatSurvey() {
  const defaultMessage: Message = { id: "default", text: "Hello! I'm ReformAI. Let's begin the survey", questionId: "default", sender: 'ai' }

  const { responses } = useSurvey()

  const [allAskedQuestions, setAllAskedQuestions] = useState<AskedQuestion[]>([]);
  const { surveyId } = useParams();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSurveyComplete, setSurveyComplete] = useState(false);
  const [surveyInfo, setSurveyInfo] = useState<{title: string, questionCount: number}>({});

  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatStartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allAskedQuestions]);

  const renderQuestionComponent = (question: Question) => {
    switch (question.type) {
      case "mcq":
      return <MCQQuestionFill question={question} />;
      case "short_answer":
        return <ShortAnswerQuestionFill question={question} />;
      case "long_answer":
        return <LongAnswerQuestionFill question={question} />;
      case "rating":
        return <RatingQuestionFill question={question} />;
      case "checkboxes":
        return <CheckboxesQuestionFill question={question} />;
      case "dropdown":
        return <DropdownQuestionFill question={question} />;
      case "ranking":
        return <RankingQuestionFill question={question} />;
      case "date_time":
        return <DateTimeQuestionFill question={question} />;
      case "matrix":
        return <MatrixQuestionFill question={question} />;
      case "slider":
        return <SliderQuestionFill question={question} />;
      case "file_upload":
        return <FileUploadQuestionFill question={question} />;
      case "yes_no":
        return <YesNoQuestionFill question={question} />;
      case "image_choice":
        return <ImageChoiceQuestionFill question={question} />;
      default:
        return null;
    }
  };

  function convertToMessages(askedQuestions: Array<AskedQuestion>): Array<Message> {
    console.log("from converToMessages: ", askedQuestions)
    const convertedMessages =  askedQuestions.map((askedQuestion, i) => {
      if(askedQuestion.answer) {
        return [
          { id: i + "-ai", text: askedQuestion.question.text, questionId: askedQuestion.question.id, sender: "ai" as const }, 
          { id: i + "-user", text: askedQuestion.answer, questionId: askedQuestion.question.id, sender: "user" as const }
        ];
      } else {
        return { id: i + "-ai", text: askedQuestion.question.text, questionId: askedQuestion.question.id, sender: "ai" as const }
      }
    }).flat();

    console.log("converted messages: ", convertedMessages)
    return convertedMessages
  }
  

  async function getAndOptimizeNextQuestion(currentAskedQuestion : AskedQuestion) {
    try {
      const response = await fetch(`/api/survey/id/${surveyId}/question/${allAskedQuestions.length+1}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          previousQuestion: currentAskedQuestion.question,
          previousResponse: currentAskedQuestion.answer
        })
      })
      const result = await response.json()
      if(result?.error) {
        throw new Error(result.error)
      }
      setAllAskedQuestions(prev => [...prev, { question: result, answer: ""}]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(err: any) {
      console.log(err)
      setIsTyping(false)
      alert(err.message)
    }
  }

  async function initializeSurvey() {
    if(allAskedQuestions.length>0)return
    try {
      setIsTyping(true)
      const response = await fetch("/api/survey/start/"+surveyId)
      const result = await response.json()
      // console.log(result)
      if(result?.error) {
        throw new Error(result.error)
      }
      setSurveyInfo({title: result.name, questionCount: result.questionCount})
      setAllAskedQuestions([{question: result.question, answer: ""}])
      setIsTyping(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err)
      setIsTyping(false)
      alert(err.message)
    }
  }

  useEffect(() => {
    initializeSurvey()
  }, [surveyId])

  const handleSend = async () => {
    if(isTyping)return
    if (input.trim()) {
      const currentAskedQuestion = allAskedQuestions[allAskedQuestions.length-1]
      const newAskedQuestion : AskedQuestion = { question: currentAskedQuestion.question, answer: input }
      const filteredAskedQuestions = allAskedQuestions.filter(aaq => aaq.question.id !== currentAskedQuestion.question.id)
      setAllAskedQuestions([...filteredAskedQuestions, newAskedQuestion])
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
      await getAndOptimizeNextQuestion(newAskedQuestion)
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

  console.log("responses from usesurvey: ", responses)

  return (
    <Suspense fallback={<FullPageLoader />}>
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
              {[defaultMessage, ...convertToMessages(allAskedQuestions)].map((message) => (
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
                    {
                      (message.sender === "ai" && message.questionId!=="default") ? 
                      <>
                        <p className="mb-4">{message.text}</p>
                        {renderQuestionComponent(allAskedQuestions.find(aaq => aaq.question.id === message.questionId)!.question)}
                        <button
                          onClick={() => window.location.reload()}
                          className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <Send size={15} />
                          Proceed
                        </button>
                      </>
                      : message.text
                    }
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
                <button style={{cursor: isTyping ? "not-allowed": "pointer"}} type="submit" className="p-2 bg-blue-500 text-white rounded-r-lg transition-colors">
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
    </Suspense>
  );
}
