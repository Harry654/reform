import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CreateSurveyProvider } from "@/context/CreateSurveyContext";
import { SurveyResponseProvider } from "@/context/SurveyResponseContext";
import ProtectedRoute from "@/wrappers/ProtectedRoute";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Reform - Making Surveys Interactive",
  description:
    "Reform is an AI-powered survey platform that keeps your users interactively engaged throughout the survey process, ensuring a seamless and enjoyable experience while gathering valuable insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ProtectedRoute>
            <CreateSurveyProvider>
              <SurveyResponseProvider>{children}</SurveyResponseProvider>
            </CreateSurveyProvider>
          </ProtectedRoute>
        </AuthProvider>
      </body>
    </html>
  );
}
