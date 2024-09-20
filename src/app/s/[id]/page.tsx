"use client";

import { useEffect, useState } from "react";
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
import {
  useParams,
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";
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
  const { user } = useAuth();
  const { surveySubmitted, setSurveySubmitted } = useSurvey();

  const pathname = usePathname(); // Get the current path, e.g., "/dashboard"
  const searchParams = useSearchParams(); // Get the current query parameters

  // Construct query parameters string
  const params = new URLSearchParams(searchParams);

  // Build the redirect URL: path + query params
  const redirect_url = `${pathname}?${params.toString()}`;

  // Construct the login URL with the redirect_url
  const loginUrl = `/auth/login?redirect_url=${encodeURIComponent(
    redirect_url
  )}&${params.toString()}`;

  const signupUrl = `/auth/signup?redirect_url=${encodeURIComponent(
    redirect_url
  )}&${params.toString()}`;

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
    return <AuthenticationRequired loginUrl={loginUrl} signupUrl={signupUrl} />;

  // if the form has been submitted
  if (surveySubmitted)
    return (
      <FormSubmissionSuccess
        allowMultipleSubmissions={surveyData.allowMultipleSubmissions}
        successMessage={surveyData.successMessage}
      />
    );

  return surveyData.type === "normal" ? (
    <NormalSurveyResponse surveyData={surveyData} />
  ) : (
    <InteractiveSurveyResponse surveyData={surveyData} />
  );
};

export default Survey;
