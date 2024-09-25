"use client";

import React, { Suspense, useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase/config";
import { useRouter, useSearchParams } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { TFirestoreUser } from "@/types/user";
import FullPageLoader from "@/components/FullPageLoader";

export default function LoginComponent() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useAuth();
  const searchParams = useSearchParams();

  // Get the redirect_url param or default to '/'
  const redirectUrl = searchParams.get("redirect_url") || "/";

  const handleSignInWithEmailAndPassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (loading) return;
    if (!email || !password) return alert("Some fields are missing");
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      // Signed in successfully
      redirect();
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof Error) {
        // Check if error has a 'code' property
        const errorCode = (error as { code?: string }).code;

        if (errorCode === "auth/invalid-credential") {
          return alert("Username or password is invalid");
        }

        alert("Something went wrong");
      } else {
        alert("Unknown error occurred");
      }
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user already exists in Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // Save user's information to Firestore if it's a new user
        const newUser: TFirestoreUser = {
          uid: user.uid,
          firstName: user.displayName?.split(" ")[0] || "",
          lastName: user.displayName?.split(" ")[1] || "",
          email: user.email || "",
          createdAt: Timestamp.now(),
          tosAgreedAt: Timestamp.now(), // Add the timestamp of ToS agreement
          privacyPolicyAgreedAt: Timestamp.now(),
          photoURL: user.photoURL || null,
          subscription: {
            subscriptionCode: null, // ID of the subscription plan
            subscriptionStatus: null, // Status of the subscription
            subscriptionStartDate: new Date(), // Start date ofnew Date() the subscription
            paymentMethod: null, // Payment method used
            plan: {
              name: "free", // name of the subscription plan
              code: null,
            },
          },
          paystack_id: null,
        };
        await setDoc(userDocRef, newUser);
        setUser(newUser);
      }

      redirect();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const redirect = () => router.push(redirectUrl);

  return (
    <Suspense fallback={<FullPageLoader />}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center text-black">
            Login
          </h2>
          <form
            onSubmit={handleSignInWithEmailAndPassword}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {error && <div className="text-red-600 text-sm">{error}</div>}

            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading && "opacity-20"
              }`}
              disabled={loading}
            >
              {!loading ? "Sign In" : <BeatLoader size={10} color="#fff" />}
            </button>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={signInWithGoogle}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <a
                  href={`/auth/signup?redirect_url=${encodeURIComponent(
                    redirectUrl
                  )}`}
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
