import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

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
    "Reform is an AI powered survey platform designed to keep users engaged while filling out surveys",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="assets/img/favicon.png"
        />

        <link rel="stylesheet" href="/assets/css/bootstrap-4.5.0.min.css" />
        <link rel="stylesheet" href="/assets/css/lineicons.css" />
        {/* <link rel="stylesheet" href="/assets/css/animate.css" /> */}
        <link rel="stylesheet" href="/assets/css/style.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
