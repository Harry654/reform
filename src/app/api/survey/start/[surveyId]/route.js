import { doc, collection, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { surveyId } = params;
    if (!surveyId)
      return NextResponse.json(
        { error: "survey Id can't be undefined" },
        { status: 400 }
      );

    const surveyDocRef = doc(collection(db, "surveys/"), surveyId);
    const surveyDocSnap = await getDoc(surveyDocRef);

    if (surveyDocSnap.exists()) {
      return NextResponse.json(surveyDocSnap.data().sections[0].questions[0], { status: 200 });
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
