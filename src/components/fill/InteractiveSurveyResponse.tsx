"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Send,
  Mic,
  Check,
  ChevronLeft,
  ArrowBigRight,
  UploadIcon,
  Loader,
} from "lucide-react";
import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/navigation";
import FullPageLoader from "@/components/FullPageLoader";
import { Question } from "@/types/question";
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
  YesNoQuestionFill,
} from "@/components/fill/QuestionFillComponents";
import { useSurvey } from "@/context/SurveyResponseContext";
import { TAnswer, TSurveyResponse } from "@/types/response";
import { db } from "@/lib/firebase/config";
import { doc, setDoc, collection, addDoc, Timestamp } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { ISurvey } from "@/types/survey";
import { marked } from "marked";
import FeedbackFormModal from "../FeedbackFormModal";

type AskedQuestion = {
  question: { questionDetails: Question; time: number };
  answer: { answerValue: TAnswer; time: number } | null;
};

type ClarificationMessage = {
  sender: "ai" | "user";
  text: string;
  timeSent: number;
};

type Message = {
  text: string;
  questionId: string;
  sender: "ai" | "user";
  timeSent: number;
};

interface Props {
  surveyData: ISurvey;
}

const InteractiveSurveyResponse: React.FC<Props> = ({ surveyData }) => {
  const { user } = useAuth();
  const { responses } = useSurvey();
  const router = useRouter();

  const [allAskedQuestions, setAllAskedQuestions] = useState<AskedQuestion[]>([
    {
      question: {
        questionDetails: surveyData.sections.flatMap(
          (section) => section.questions
        )[0],
        time: new Date().getTime(),
      },
      answer: null,
    },
  ]);
  const [clarificationMessages, setClarificationMessages] = useState<
    ClarificationMessage[]
  >([]);
  const surveyId = surveyData.id;
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false);
  const [progress, setProgress] = useState(1);
  const [feedbackModalOpen, setShowFeedbackModal] = useState(!false);
  //   const [surveyInfo, setSurveyInfo] = useState<{
  //     title: string;
  //     questionCount: number;
  //   }>({ title: "Loading ...", questionCount: 0 });

  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatStartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allAskedQuestions, clarificationMessages]);

  const feedbackModalClosed = () => setShowFeedbackModal(false);

  const feedbackSubmitted = async (rating: number, feedback: string) => {
    try {
      await addDoc(collection(db, "feedback"), {
        rating,
        feedback,
        date: Timestamp.now(),
      });

      feedbackModalClosed();
      alert("Thank You for Your Feedback!");
    } catch (error) {
      console.error("Error submitting feedback: ", error);
    }
  };

  async function submitSurveyResponse() {
    if (!isSurveyComplete) {
      return alert("You haven't completed the survey yet");
    }
    if (submitting) return;

    setSubmitting(true);
    try {
      const newSurveyResponse: TSurveyResponse = {
        surveyId: surveyId as string,
        userId: user?.uid || null,
        responseId: uuidv4(),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        answers: responses,
      };
      console.log("newSurveyResponse", newSurveyResponse);
      await setDoc(
        doc(db, "responses", newSurveyResponse.responseId),
        newSurveyResponse
      );
      setSubmitting(false);
      setShowCompletionAnimation(true);
    } catch (error) {
      setSubmitting(false);
      alert("Couldn't submit response. Check your internet and try again");
    }
  }

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

  function convertToAIChatMessages(askedQuestions: Array<AskedQuestion>) {
    console.log("from convertToAIChatMessages: ", askedQuestions);
    const convertedAIChatMessagesFromAskedQuestions = askedQuestions
      .map((askedQuestion) => {
        if (askedQuestion.answer) {
          return [
            {
              timeSent: askedQuestion.question.time,
              role: "model",
              parts: [
                {
                  text: JSON.stringify(
                    askedQuestion.question.questionDetails.text
                  ),
                },
              ],
            },
            {
              timeSent: askedQuestion.answer.time,
              role: "user",
              parts: [
                { text: JSON.stringify(askedQuestion.answer.answerValue) },
              ],
            },
          ];
        } else {
          return {
            timeSent: askedQuestion.question.time,
            role: "model",
            parts: [
              {
                text: JSON.stringify(
                  askedQuestion.question.questionDetails.text
                ),
              },
            ],
          };
        }
      })
      .flat();

    const convertedMessagesFromClarificationMessages =
      clarificationMessages.map((cm) => {
        return {
          text: cm.text,
          parts: [{ text: cm.text }],
          role: cm.sender === "ai" ? "model" : "user",
          timeSent: cm.timeSent,
        };
      });

    const sortedMessages = [
      ...convertedAIChatMessagesFromAskedQuestions,
      ...convertedMessagesFromClarificationMessages,
    ]
      .sort((a, b) => a.timeSent - b.timeSent)
      .map((m) => ({ role: m.role, parts: m.parts }));

    console.log("ai chatconverted messages: ", sortedMessages);
    return [{ role: "user", parts: [{ text: "hello" }] }, ...sortedMessages];
  }

  function convertToMessages(
    askedQuestions: Array<AskedQuestion>
  ): Array<Message> {
    console.log("from converToMessages: ", askedQuestions);
    const convertedMessagesFromAskedQuestions = askedQuestions.map(
      (askedQuestion) => {
        return {
          text: askedQuestion.question.questionDetails.text,
          questionId: askedQuestion.question.questionDetails.id,
          sender: "ai" as const,
          timeSent: askedQuestion.question.time,
        };
      }
    );

    console.log(
      "converted messages from askedQuestions: ",
      convertedMessagesFromAskedQuestions
    );

    const convertedMessagesFromClarificationMessages =
      clarificationMessages.map((cm) => {
        return {
          text: cm.text,
          questionId: "clarification",
          sender: cm.sender,
          timeSent: cm.timeSent,
        };
      });
    return [
      ...convertedMessagesFromAskedQuestions,
      ...convertedMessagesFromClarificationMessages,
    ].sort((a, b) => a.timeSent - b.timeSent);
  }

  async function getAndOptimizeNextQuestion(
    currentAskedQuestion: AskedQuestion
  ) {
    try {
      if (currentAskedQuestion.answer === null) return;
      const response = await fetch(
        `/api/survey/id/${surveyId}/question/${allAskedQuestions.length + 1}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            previousQuestion: currentAskedQuestion.question.questionDetails,
            previousResponse: currentAskedQuestion.answer.answerValue,
          }),
        }
      );
      const result = await response.json();
      if (result?.error) {
        throw new Error(result.error);
      }
      setAllAskedQuestions((prev) => [
        ...prev,
        {
          question: { questionDetails: result, time: new Date().getTime() },
          answer: null,
        },
      ]);
      setProgress((prev) => prev + 1);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      setIsTyping(false);
      alert(err.message);
    }
  }

  async function sendClarificationMessageToAI(message: string) {
    try {
      const response = await fetch(`/api/survey/clarify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          history: convertToAIChatMessages(allAskedQuestions),
          newMessage: message,
        }),
      });
      const result = await response.json();
      if (result?.error) {
        throw new Error(result.error);
      }
      console.log("clarification message AI response", result);
      setClarificationMessages((prev) => [
        ...prev,
        { text: result, sender: "ai", timeSent: new Date().getTime() },
      ]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      setIsTyping(false);
      alert(err.message);
    }
  }

  const handleSendQuestionResponse = async (questionId: string) => {
    const questionAnswer = responses.find(
      (res) => res.questionId === questionId
    );
    console.log("questionAnswer", questionId);
    const targetAskedQuestion = allAskedQuestions.find(
      (q) => q.question.questionDetails.id === questionId
    );
    if (isTyping) return;
    if (
      targetAskedQuestion?.question.questionDetails.required &&
      !questionAnswer
    )
      return alert("You can't skip a required question");
    if (!targetAskedQuestion) return;

    const newAskedQuestion: AskedQuestion = {
      question: targetAskedQuestion.question,
      answer: {
        answerValue: questionAnswer ? questionAnswer.answer : "",
        time: new Date().getTime(),
      },
    };
    const filteredAskedQuestions = allAskedQuestions.filter(
      (aaq) =>
        aaq.question.questionDetails.id !==
        targetAskedQuestion.question.questionDetails.id
    );
    setAllAskedQuestions([...filteredAskedQuestions, newAskedQuestion]);
    setIsTyping(true);

    // AI response
    await getAndOptimizeNextQuestion(newAskedQuestion);
    setIsTyping(false);
  };

  const handleSendClarificationMessage = async () => {
    if (isTyping) return;
    if (input.trim()) {
      const newClarificationMessage: ClarificationMessage = {
        text: input,
        sender: "user",
        timeSent: new Date().getTime(),
      };
      setClarificationMessages((prev) => [...prev, newClarificationMessage]);
      setInput("");
      setIsTyping(true);

      // AI response
      console.log("progress", progress);
      await sendClarificationMessageToAI(input);
      setIsTyping(false);
    }
  };

  function checkSurveyCompletion() {
    if (allAskedQuestions.length === surveyData.questionCount) {
      const lastQuestion = allAskedQuestions[allAskedQuestions.length - 1];
      if (!lastQuestion) return false;
      if (!lastQuestion.question.questionDetails.required) {
        return true;
      } else {
        const questionAnswer = responses.find(
          (res) => res.questionId === lastQuestion.question.questionDetails.id
        );
        if (questionAnswer?.answer) {
          return true;
        } else {
          return false;
        }
      }
    } else return false;
  }

  const handlers = useSwipeable({
    onSwipedRight: () => {
      console.log("Swiped right - go back");
    },
    trackMouse: true,
    trackTouch: true,
  });

  // console.log("last progress: ", progress);
  // console.log("surveyInfo: ", surveyInfo);
  // console.log("allAskedQuestions: ", allAskedQuestions);
  // console.log("responses from usesurvey: ", responses);
  const isSurveyComplete = checkSurveyCompletion();
  return (
    <Suspense fallback={<FullPageLoader />}>
      <div {...handlers} className="flex flex-col h-screen bg-gray-50">
        <header className="bg-white shadow-sm p-4 flex items-center gap-x-10">
          <button className="mr-2 md:hidden">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
            {surveyData.title}
          </h1>
          <div className="ms-auto flex gap-x-5 whitespace-nowrap">
            <button
              style={{
                cursor:
                  isTyping ||
                  allAskedQuestions.length === surveyData.questionCount
                    ? "not-allowed"
                    : "pointer",
              }}
              disabled={
                isTyping ||
                allAskedQuestions.length === surveyData.questionCount
              }
              onClick={() =>
                handleSendQuestionResponse(
                  allAskedQuestions[allAskedQuestions.length - 1].question
                    .questionDetails.id
                )
              }
              className={`w-50 flex items-center gap-x-1 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                allAskedQuestions.length === surveyData.questionCount
                  ? "bg-gray-600"
                  : "bg-blue-600 hover:bg-blue-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
            >
              <ArrowBigRight size={15} />
              Next Question
            </button>
            <button
              onClick={submitSurveyResponse}
              className={`w-50 flex items-center gap-x-1 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                !isSurveyComplete
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 cursor-pointer"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
              disabled={!isSurveyComplete}
            >
              {submitting ? (
                <>
                  <Loader color="#ffffff" size={15} /> Submitting...
                </>
              ) : (
                <>
                  <UploadIcon size={15} /> Submit
                </>
              )}
            </button>
          </div>
        </header>

        <main className="container mx-auto flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 pb-24 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div ref={chatStartRef} />
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-4 text-left"
              >
                <div className="inline-block p-4 rounded-lg max-w-[80%] md:max-w-[70%] bg-blue-100 text-blue-800">
                  {"Hello! I'm ReformAI. Let's begin"}
                </div>
              </motion.div>
              {convertToMessages(allAskedQuestions).map((message) => {
                if (message.questionId === "clarification") {
                  return (
                    <motion.div
                      key={message.timeSent}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className={`mb-4 ${
                        message.sender === "ai" ? "text-left" : "text-right"
                      }`}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: marked.parse(message.text),
                        }}
                        className={`inline-block p-4 rounded-lg max-w-[80%] md:max-w-[70%] ${
                          message.sender === "ai"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      />
                    </motion.div>
                  );
                }
                const targetQuestion = allAskedQuestions.find(
                  (aaq) =>
                    aaq.question.questionDetails.id === message.questionId
                )!.question;
                return (
                  // console.log(messages)
                  <motion.div
                    key={message.timeSent}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`mb-4 ${
                      message.sender === "ai" ? "text-left" : "text-right"
                    }`}
                  >
                    <div
                      className={`inline-block p-3 rounded-lg max-w-[80%] md:max-w-[70%] ${
                        message.sender === "ai"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      <>
                        <p className="mb-4">{message.text}</p>
                        {renderQuestionComponent(
                          targetQuestion.questionDetails
                        )}
                      </>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {isTyping && (
              <div className="text-left mb-4">
                <div className="inline-block p-3 rounded-lg bg-gray-200">
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
                    animate={{
                      width: `${(progress / surveyData.questionCount) * 100}%`,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendClarificationMessage();
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
                <button
                  style={{
                    cursor: isTyping || !input ? "not-allowed" : "pointer",
                  }}
                  type="submit"
                  className="p-2 bg-blue-500 text-white rounded-r-lg transition-colors"
                >
                  <Send size={20} />
                </button>
                <button
                  type="button"
                  className="p-2 ml-2 bg-gray-200 text-gray-600 rounded-lg transition-colors"
                >
                  <Mic size={20} />
                </button>
              </form>
            </div>
          </div>
        </main>

        <AnimatePresence>
          {showCompletionAnimation && (
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
                <h2 className="text-2xl font-semibold text-center mb-2">
                  Survey Complete!
                </h2>
                <p className="text-center text-gray-600 mb-4">
                  Thank you for participating in our survey
                </p>
                <button
                  onClick={() => {
                    setShowCompletionAnimation(false);
                    setShowFeedbackModal(true);
                  }}
                  className="w-full p-2 bg-blue-500 text-white rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <FeedbackFormModal
          isOpen={feedbackModalOpen}
          onClose={feedbackModalClosed}
          onSubmit={feedbackSubmitted}
        />
      </div>
    </Suspense>
  );
};

export default InteractiveSurveyResponse;
