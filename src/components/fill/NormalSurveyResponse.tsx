"use client";

import React, { useEffect, useState } from "react";

import { useSurvey } from "@/context/SurveyResponseContext";
import { ISection, ISurvey } from "@/types/survey";
import { TSurveyResponse } from "@/types/response";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/context/AuthContext";
import { isTruthy } from "@/helpers/isTruthy";
import { doc, writeBatch, increment, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { BeatLoader } from "react-spinners";
import SectionFill from "./SectionFill";
import { Question } from "@/types/question";
import Navbar from "../layout/NavBar";
import FullPageLoader from "../FullPageLoader";

interface NormalSurveyResponseProps {
  surveyData: ISurvey;
}

export const NormalSurveyResponse: React.FC<NormalSurveyResponseProps> = ({
  surveyData,
}) => {
  const {
    survey,
    setSurvey,
    responses,
    setSkippedQuestion,
    setSurveySubmitted,
  } = useSurvey();
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<ISection | null>(null);

  useEffect(() => {
    setSurvey(surveyData);
  }, [surveyData, setSurvey, user]);

  useEffect(() => {
    const mainSection: ISection | undefined = surveyData.sections.find(
      (section) => section.isMainSection
    );
    setCurrentSection(mainSection || null);
  }, [surveyData]);

  const getSectionIndex = (section_id: string): number | undefined =>
    survey?.sections.findIndex((section) => section.id === section_id);

  const handleNextSection = () => {
    // if a required questionwas not answered, don't proceed
    if (!handleAllQuestionsAnswered()) return;

    // get the index of the current section
    const currentSectionIndex = getSectionIndex(currentSection?.id || "");
    // console.log(currentSectionIndex)

    // if there is no survey or no section, then return
    if (!survey || currentSectionIndex === undefined) return;

    // if we're at the last section, then return
    if (currentSectionIndex === survey.sections.length - 1) return;

    const newCurrentSection = survey.sections[currentSectionIndex + 1];
    setCurrentSection(newCurrentSection);
    window.scrollY = 0;
  };

  const handlePrevSection = () => {
    // get the index of the current section
    const currentSectionIndex = getSectionIndex(currentSection?.id || "");

    // if there is no survey or no section, then return
    if (!survey || currentSectionIndex === undefined) return;

    // if we're at the first section, then return
    if (currentSectionIndex === 0) return;

    const newCurrentSection = survey.sections[currentSectionIndex - 1];
    setCurrentSection(newCurrentSection);
  };

  const handleAllQuestionsAnswered = (
    section: ISection | null = currentSection
  ): boolean => {
    // function to confirm if all required questons were answered

    if (!section) return false;

    const requiredQuestions: Question[] = [];
    // extract all required questions from thecurrent section
    section.questions.map((question) => {
      if (question.required) requiredQuestions.push(question);
    });

    if (requiredQuestions)
      for (const requiredQuestion of requiredQuestions) {
        // if the question was not answered, then flag it
        if (
          !isTruthy(
            responses.find(
              (response) => response.questionId === requiredQuestion.id
            )?.answer
          )
        ) {
          // set it as a skipped question
          setSkippedQuestion(requiredQuestion);

          if (section.id !== currentSection?.id) setCurrentSection(section);

          // scroll to the question
          const element = document.getElementById(requiredQuestion.id);
          if (element) {
            window.scrollTo({
              top: element.offsetTop - 50,
              behavior: "smooth",
            });
          }

          return false;
        }
      }

    return true;
  };

  const handleSubmitDisabled = async (e: React.FormEvent) => {
    e.preventDefault();
  };
  const handleSubmit = async () => {
    console.log("sunlight");

    if (!survey) return;

    // if a request is already pending, return
    if (loading) return;

    // if a required question was not answered, don't submit
    for (const section of survey.sections)
      if (!handleAllQuestionsAnswered(section)) return;

    // compute the survey response
    const response: TSurveyResponse = {
      surveyId: survey?.id || "",
      userId: survey.allowAnonymousResponses ? null : user?.uid || "",
      responseId: uuidv4(),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      answers: responses,
    };

    try {
      setLoading(true);
      const batch = writeBatch(db);

      // Reference to the survey document
      const surveyDocRef = doc(db, "surveys", survey?.id || "");

      // Reference to the new response document
      const responseDocRef = doc(db, "responses", response.responseId);

      // Add the response to the "responses" collection
      batch.set(responseDocRef, response);

      // Increment the responseCount in the survey document
      batch.update(surveyDocRef, {
        responsesCount: increment(1),
        updatedAt: Timestamp.now(),
      });

      // Commit the batch
      await batch.commit();

      setSurveySubmitted(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Error saving response and updating survey" + error);
    }
  };

  if (!survey) return <FullPageLoader />;

  return (
    <>
      <Navbar />

      <form
        onSubmit={handleSubmitDisabled}
        className="max-w-2xl mx-auto my-5 px-6"
      >
        {currentSection?.isMainSection && (
          <>
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md border mt-5">
              <h1 className="text-3xl font-bold mb-4">{survey.title}</h1>
              <p className="mb-6 text-gray-600 italic">{survey.description}</p>
            </div>
            <SectionFill section={currentSection} />
          </>
        )}
        {survey.sections
          .filter((section) => !section.isMainSection)
          .map((section, index) =>
            currentSection?.id === section.id ? (
              <SectionFill key={index} section={section} />
            ) : (
              <></>
            )
          )}
        <div className="w-min py-6 whitespace-nowrap ms-auto">
          {!currentSection?.isMainSection && (
            <button
              type="button"
              className={`bg-transparent hover:bg-gray-400 text-black font-bold py-2 px-4 ms-auto mt-5 rounded focus:outline-none focus:shadow-outline border mr-2`}
              onClick={handlePrevSection}
            >
              Back
            </button>
          )}

          {getSectionIndex(currentSection?.id || "") ===
          survey.sections.length - 1 ? (
            <button
              type="button"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ms-auto mt-5 rounded focus:outline-none focus:shadow-outline ${
                loading && "opacity-20"
              }`}
              disabled={loading}
              onClick={handleSubmit}
            >
              {!loading ? "Submit" : <BeatLoader size={10} color="#fff" />}
            </button>
          ) : (
            <button
              type="button"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ms-auto mt-5 rounded focus:outline-none focus:shadow-outline `}
              onClick={handleNextSection}
            >
              Next
            </button>
          )}
        </div>
      </form>
    </>
  );
};
