
import localFont from "next/font/local";
import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PointsProvider } from "@/context/PointsContext";

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

export const metadata = {
  title: {
    default: "Quizzify | Challenge Your Knowledge",
    template: "%s | Quizzify",
  },
  description:
    "Challenge your knowledge, explore new subjects, and track your progress with Quizzify — your personal knowledge and quiz platform.",
  applicationName: "Quizzify",
  keywords: [
    "Quizzify",
    "online quiz",
    "knowledge platform",
    "practice quizzes",
    "learning",
    "quiz application",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PointsProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <SpeedInsights />
        </PointsProvider>
      </body>
    </html>
  );
}
