"use client";

import { useAuth } from "@/context/AuthContext";
import { CheckCircle, MessageCircle, BarChart2, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Slide } from "react-awesome-reveal";

export default function LandingPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="container mx-auto px-4 py-8 text-black">
        <nav className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">Reform</h1>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">
                {`${user.firstName} ${user.lastName}`}
              </span>
              <Image
                className="h-8 w-8 rounded-full"
                src={
                  user.photoURL
                    ? user.photoURL
                    : "https://firebasestorage.googleapis.com/v0/b/reform-a80a2.appspot.com/o/empty_user.png?alt=media&token=5ad8397a-1e3f-44fd-8143-31972b02f3fd"
                }
                alt={`${user.firstName}'s profile`}
                width={100}
                height={100}
              />
              <button
                onClick={logout}
                className="text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div>
              <Link
                href="/auth/login"
                className="mr-2 px-4 py-2 bg-transparent border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100"
              >
                Log In
              </Link>
              <Link
                href="/auth/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </header>

      <main className="container mx-auto px-4 text-black">
        <section className="text-center py-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Revolutionize Your Surveys with AI
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Engage your audience with adaptive, chat-based surveys powered by
            artificial intelligence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/create"
              className="px-8 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Get Started for Free
            </Link>
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
              <Slide key={index} direction="up" delay={index * 100}>
                <div className="border border-gray-200 rounded-lg p-6 text-center shadow-lg">
                  <feature.icon className="h-10 w-10 text-blue-500 mb-4 mx-auto" />
                  <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </Slide>
            ))}
          </div>
        </section>

        <section className="py-20">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Pricing Plans
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Basic",
                price: "$29",
                features: [
                  "100 survey responses/mo",
                  "Basic AI features",
                  "Email support",
                ],
              },
              {
                title: "Pro",
                price: "$99",
                features: [
                  "1000 survey responses/mo",
                  "Advanced AI analysis",
                  "Priority support",
                ],
              },
              {
                title: "Enterprise",
                price: "Custom",
                features: [
                  "Unlimited responses",
                  "Custom AI model",
                  "Dedicated account manager",
                ],
              },
            ].map((plan, index) => (
              <Slide key={index} direction="right" delay={index * 100}>
                <div
                  key={index}
                  className={`border border-gray-200 rounded-lg p-6 shadow-lg ${
                    index === 1 ? "border-blue-500" : ""
                  } text-black`}
                >
                  <h4 className="text-2xl font-bold mb-2">{plan.title}</h4>
                  <p className="text-3xl font-bold mb-4">{plan.price}</p>
                  {index === 1 && (
                    <p className="text-blue-500 font-semibold">Most Popular</p>
                  )}
                  <ul className="space-y-2 my-4 text-left">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Choose Plan
                  </button>
                </div>
              </Slide>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-8 text-black">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Reform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
