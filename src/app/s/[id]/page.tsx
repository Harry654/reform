"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { ISurvey } from "@/types/survey";
import { NormalSurveyResponse } from "@/components/fill/NormalSurveyResponse";
import { useParams } from "next/navigation";

const Survey = () => {
  const [surveyData, setSurveyData] = useState<ISurvey | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  useEffect(() => {
    if (typeof id === "string") {
      // Ensure id is a string
      const fetchSurveyData = async () => {
        setLoading(true);
        try {
          // Fetch surveyData from Firestore based on the ID
          const surveyDoc = await getDoc(doc(db, "surveys", id));
          if (surveyDoc.exists()) {
            setSurveyData(surveyDoc.data() as ISurvey);
          } else {
            setError("Survey data not found");
          }
        } catch (err) {
          console.error("Error fetching surveyData:", err);
          setError("Failed to fetch surveyData");
        } finally {
          setLoading(false);
        }
      };

      fetchSurveyData();
    }
  }, [id]);

  if (loading) return <p>Loading surveyData...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {surveyData ? (
        <NormalSurveyResponse surveyData={surveyData} />
      ) : (
        <p>No survey data available.</p>
      )}
    </div>
  );
};

export default Survey;
