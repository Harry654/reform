"use client";

import FullPageLoader from "@/components/FullPageLoader";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/NavBar";
import PricingPlans from "@/components/plans/PricingPlans";
import { useAuth } from "@/context/AuthContext";
import { CheckCircle, MessageCircle, BarChart2, Users } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Slide } from "react-awesome-reveal";
import { ReactTyped } from "react-typed";

export default function LandingPage() {
  const { user } = useAuth();

  const typedStrings = [
    "Engage your audience with adaptive, chat-based surveys powered by artificial intelligence.",
    "Create personalized survey experiences with AI-driven conversations.",
    "Gather deeper insights through intelligent, interactive questionnaires.",
  ];

  return (
    <Suspense fallback={<FullPageLoader />}>
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
        <Navbar />

        <main className="container mx-auto text-black">
          <section className="flex flex-col justify-center items-center text-center py-20 h-[calc(100vh-3.5rem)]">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Revolutionize Your Surveys with AI
            </h2>
            <div className="h-20 md:h-16">
              {/* Fixed height container for the typing effect */}
              <ReactTyped
                strings={typedStrings}
                typeSpeed={50}
                backSpeed={10}
                backDelay={1000}
                loop
                className="text-lg md:text-xl mb-8 inline-block"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {user ? (
                <Link
                  href="/dashboard"
                  className="px-8 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  My Dashboard
                </Link>
              ) : (
                <Link
                  href="/create"
                  className="px-8 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Get Started for Free
                </Link>
              )}
              <Link
                href="/templates"
                className="px-8 py-4 bg-transparent border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100"
              >
                View Templates
              </Link>
            </div>
          </section>

          <section className="py-20">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Key Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: MessageCircle,
                  title: "AI-Powered Chats",
                  description:
                    "Engage users with natural, adaptive conversations.",
                },
                {
                  icon: BarChart2,
                  title: "Real-Time Analysis",
                  description: "Get instant insights as responses come in.",
                },
                {
                  icon: Users,
                  title: "User Sectionation",
                  description:
                    "Target specific groups for more relevant surveys.",
                },
                {
                  icon: CheckCircle,
                  title: "Easy to Use",
                  description:
                    "Intuitive interface for both creators and respondents.",
                },
              ].map((feature, index) => (
                <Slide
                  key={index}
                  direction="up"
                  delay={index * 100}
                  triggerOnce={true}
                >
                  <div className="border border-gray-200 rounded-lg p-6 text-center shadow-lg">
                    <feature.icon className="h-10 w-10 text-blue-500 mb-4 mx-auto" />
                    <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </Slide>
              ))}
            </div>
          </section>

          <PricingPlans />
        </main>

        <Footer />
      </div>
    </Suspense>
  );
}
