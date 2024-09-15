import { doc, collection, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { NextResponse } from "next/server";


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

export const GET = async (req, { params }) => {
  try {
    const { surveyId, index } = params;
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
      return NextResponse.json(surveyDocSnap.data().sections[sectionIndex].questions[questionIndex], { status: 200 });
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
