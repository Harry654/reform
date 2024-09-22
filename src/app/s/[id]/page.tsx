"use client";

import { Suspense, useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { ISurvey } from "@/types/survey";
import { NormalSurveyResponse } from "@/components/fill/NormalSurveyResponse";
import { useParams, useRouter } from "next/navigation";
import FullPageLoader from "@/components/FullPageLoader";
import { InteractiveSurveyResponse } from "@/components/fill/InteractiveSurveyResponse";
import { useAuth } from "@/context/AuthContext";
import { useSurvey } from "@/context/SurveyResponseContext";
import AuthenticationRequired from "@/components/AuthenticationRequired";
import FormSubmissionSuccess from "@/components/FormSubmissionSuccess";

const Survey = () => {
  const [surveyData, setSurveyData] = useState<ISurvey | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = useParams();
  const router = useRouter();
  const { user, loginUrl, signupUrl } = useAuth();
  const { surveySubmitted, setSurveySubmitted } = useSurvey();

  const fetchPrevSurveyResponse = async (surveyData: ISurvey) => {
    if (typeof surveyData.id === "string" && user?.uid) {
      try {
        // Query the collection where userId matches and surveyId matches
        const q = query(
          collection(db, "responses"), // Replace "responses" with your actual collection name
          where("userId", "==", user.uid),
          where("surveyId", "==", surveyData.id)
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty && !surveyData?.allowMultipleSubmissions) {
          setSurveySubmitted(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    if (typeof id === "string") {
      // Ensure id is a string
      const fetchSurveyData = async () => {
        setLoading(true);
        try {
          // Fetch surveyData from Firestore based on the ID
          const surveyDoc = await getDoc(doc(db, "surveys", id));
          if (surveyDoc.exists()) {
            const surveyData = surveyDoc.data() as ISurvey;
            setSurveyData(surveyData);
            await fetchPrevSurveyResponse(surveyData);
          } else {
            router.push("/not-found");
          }
        } catch (err) {
          console.error("Error fetching surveyData:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchSurveyData();
    }
  }, [id, user]);

  if (loading) return <FullPageLoader />;
  if (!surveyData) return router.push("/not-found");

  // if user requires authentication to fill out the survey
  if (!surveyData.allowAnonymousResponses && !user)
    return (
      <Suspense fallback={<FullPageLoader />}>
        <AuthenticationRequired loginUrl={loginUrl} signupUrl={signupUrl} />;
      </Suspense>
    );

  // if the form has been submitted
  if (surveySubmitted)
    return (
      <Suspense fallback={<FullPageLoader />}>
        <FormSubmissionSuccess
          allowMultipleSubmissions={surveyData.allowMultipleSubmissions}
          successMessage={surveyData.successMessage}
        />
      </Suspense>
    );

  return (
    <Suspense fallback={<FullPageLoader />}>
      {surveyData.type === "normal" ? (
        <NormalSurveyResponse surveyData={surveyData} />
      ) : (
        <InteractiveSurveyResponse surveyData={surveyData} />
      )}
    </Suspense>
  );
};

export default Survey;
