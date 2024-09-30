import { doc, collection, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


function getPrompt(previousQuestion, previousResponse, nextQuestion) {
  return `we're working with survey questions and i need you to optimize the tone of a question based on a question and a user's response to that question.
  you are going to take in 3 inputs: a question (in json format), a user's response to that question (a string) and the next question (in json format).
  Based on the user's response to the initial question (e.g. their tone), you will re-word or restructure the value of the text property of the next question's and/or the value of the elements in the options property and keep the remaining properties of the json object intact. Your result should be in json. Here are your inputs:
  
  The Question:  ${JSON.stringify(previousQuestion)}
  
  The User's response: ${JSON.stringify(previousResponse)}
  
  The next question to optimize: ${JSON.stringify(nextQuestion)}
  `
}

function getIndexes(sections, baseIndex) {
  let curr = 0
  for(let i=0; i < sections.length; i++) {
    curr+=sections[i].questions.length
    if(baseIndex <= curr) {
      console.log(curr)
      return { sectionIndex: i, questionIndex: (baseIndex - (curr-sections[i].questions.length))-1 }
    }
  }
}

async function getAIResults(previousQuestion, previousResponse, nextQuestion) {
  const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAi.getGenerativeModel({ model: "gemini-pro" });

  // console.log(getPrompt(previousQuestion, previousResponse, nextQuestion))
  try {
    const result = await model.generateContent([getPrompt(previousQuestion, previousResponse, nextQuestion)]);
    const text = result.response.text();
    console.log("AI result: ", text);

    return text
  } catch (error) {
    console.error("Error generating: ", error);
    throw new Error("Error generating optimized question")
  }
}

export const POST = async (req, { params }) => {
  try {
    const { surveyId, index } = params;
    const { previousQuestion, previousResponse } = await req.json()
    const indexInt = parseInt(index)
    if (!surveyId)
      return NextResponse.json(
        { error: "survey Id can't be undefined" },
        { status: 400 }
      );

    const surveyDocRef = doc(collection(db, "surveys/"), surveyId);
    const surveyDocSnap = await getDoc(surveyDocRef);

    if (surveyDocSnap.exists()) {
      if(indexInt > surveyDocSnap.data().questionCount || indexInt < 1) {
        return NextResponse.json(
          { error: "question index is out of bounds" },
          { status: 500 }
        )
      }

      const { sectionIndex, questionIndex } = getIndexes(surveyDocSnap.data().sections, indexInt)
      console.log({ sectionIndex, questionIndex })

      const optimizedQuestion = await getAIResults(previousQuestion, previousResponse, surveyDocSnap.data().sections[sectionIndex].questions[questionIndex])
      return NextResponse.json(JSON.parse(optimizedQuestion), { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Survey does not exist" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching survey: ", error);
    return NextResponse.json(
      { error: "error fetching survey" },
      { status: 500 }
    );
  }
};
