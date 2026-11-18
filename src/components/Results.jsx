
"use client";

import { useMemo, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useRouter } from "next/navigation";
import {
  FaTrophy,
  FaCircleCheck,
  FaCircleXmark,
  FaClock,
  FaArrowRotateRight,
  FaHouse,
  FaChevronDown,
  FaChevronUp,
  FaChartLine,
  FaLightbulb,
} from "react-icons/fa6";

const Results = ({
  score = 0,
  totalQuestions = 0,
  correctAnswers = 0,
  wrongAnswers = 0,
  unattemptedQuestions = 0,
  percentage = 0,
  timeSpent = 0,
  averageTimePerQuestion = 0,
  questions = [],
  responses = [],
  subject = "",
}) => {
  const router = useRouter();
  const { width, height } = useWindowSize();
  const [showReview, setShowReview] = useState(true);
  const [expandedQuestions, setExpandedQuestions] = useState({});

  const safePercentage = Math.min(100, Math.max(0, Number(percentage) || 0));
  const safeScore = Number(score) || 0;
  const maximumScore = totalQuestions * 4;

  const performance = useMemo(() => {
    if (safePercentage >= 90) {
      return {
        grade: "A+",
        title: "Outstanding Performance!",
        message: "Excellent work. You demonstrated a strong understanding of this subject.",
        color: "text-emerald-400",
        background: "bg-emerald-400/10",
      };
    }

    if (safePercentage >= 80) {
      return {
        grade: "A",
        title: "Excellent Work!",
        message: "You performed very well. Keep building on this progress.",
        color: "text-emerald-400",
        background: "bg-emerald-400/10",
      };
    }

    if (safePercentage >= 70) {
      return {
        grade: "B",
        title: "Good Performance!",
        message: "You have a solid foundation. Review a few topics to improve further.",
        color: "text-sky-400",
        background: "bg-sky-400/10",
      };
    }

    if (safePercentage >= 60) {
      return {
        grade: "C",
        title: "You're Making Progress!",
        message: "Keep practicing and focus on the questions you missed.",
        color: "text-amber-400",
        background: "bg-amber-400/10",
      };
    }

    if (safePercentage >= 40) {
      return {
        grade: "D",
        title: "Room to Improve",
        message: "Review the subject material and try another round.",
        color: "text-orange-400",
        background: "bg-orange-400/10",
      };
    }

    return {
      grade: "F",
      title: "Keep Learning!",
      message: "Every attempt is a learning opportunity. Practice and try again.",
      color: "text-rose-400",
      background: "bg-rose-400/10",
    };
  }, [safePercentage]);

  const formattedTime = `${Math.floor((Number(timeSpent) || 0) / 60)}m ${Math.round(
    (Number(timeSpent) || 0) % 60
  )}s`;

  const toggleQuestion = (index) => {
    setExpandedQuestions((previous) => ({
      ...previous,
      [index]: !previous[index],
    }));
  };

  const handleRetake = () => {
    window.location.reload();
  };

  const handleBackToConfiguration = () => {
    if (subject) {
      router.push(`/configure/${encodeURIComponent(subject)}`);
    } else {
      router.push("/");
    }
  };

  const hasReview = questions.length > 0 && responses.length > 0;

  return (
    <main className="min-h-screen bg-[#101322] px-4 py-10 text-white sm:px-6">
      {safePercentage >= 70 && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={180}
          recycle={false}
          gravity={0.18}
        />
      )}

      <div className="mx-auto max-w-5xl">
        {/* Result heading */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10">
            <FaTrophy className="text-3xl text-violet-400" />
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
            Quiz completed
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {performance.title}
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
            {performance.message}
          </p>
        </div>

        {/* Main score card */}
        <section className="mb-6 rounded-3xl border border-white/10 bg-[#191F32] p-6 shadow-2xl shadow-black/10 sm:p-8">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-medium text-slate-400">
                Your total quiz score
              </p>

              <div className="mt-2 flex flex-wrap items-baseline gap-2">
                <span className="text-5xl font-extrabold tracking-tight sm:text-6xl">
                  {safeScore}
                </span>
                <span className="text-xl font-medium text-slate-500">
                  / {maximumScore}
                </span>
                <span className="ml-1 rounded-full bg-violet-500/15 px-3 py-1 text-xs font-semibold text-violet-300">
                  {safePercentage}% accuracy
                </span>
              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-[#272E45]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-400 transition-all duration-1000"
                  style={{ width: `${safePercentage}%` }}
                />
              </div>

              <div className="mt-2 flex justify-between text-xs text-slate-500">
                <span>0 points</span>
                <span>{maximumScore} points</span>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full border-[7px] border-violet-400/20 bg-violet-500/10 sm:h-36 sm:w-36">
                <span className={`text-4xl font-extrabold ${performance.color}`}>
                  {performance.grade}
                </span>
                <span className="mt-1 text-xs font-medium text-slate-400">
                  Final grade
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Performance metrics */}
        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-[#191F32] p-5">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
              <FaCircleCheck />
            </div>
            <p className="text-2xl font-bold">{correctAnswers}</p>
            <p className="mt-1 text-sm text-slate-400">Correct answers</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#191F32] p-5">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-rose-400/10 text-rose-400">
              <FaCircleXmark />
            </div>
            <p className="text-2xl font-bold">{wrongAnswers}</p>
            <p className="mt-1 text-sm text-slate-400">Incorrect answers</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#191F32] p-5">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
              <FaLightbulb />
            </div>
            <p className="text-2xl font-bold">{unattemptedQuestions}</p>
            <p className="mt-1 text-sm text-slate-400">Unanswered</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#191F32] p-5">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-400/10 text-sky-400">
              <FaClock />
            </div>
            <p className="text-2xl font-bold">{formattedTime}</p>
            <p className="mt-1 text-sm text-slate-400">Total time</p>
          </div>
        </section>

        {/* Time and accuracy details */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#191F32] p-5">
            <div className="flex items-center gap-3">
              <FaChartLine className="text-xl text-violet-400" />
              <div>
                <p className="text-sm text-slate-400">Answer accuracy</p>
                <p className="mt-1 text-xl font-bold">{safePercentage}%</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#191F32] p-5">
            <div className="flex items-center gap-3">
              <FaClock className="text-xl text-violet-400" />
              <div>
                <p className="text-sm text-slate-400">Average time per question</p>
                <p className="mt-1 text-xl font-bold">
                  {Number(averageTimePerQuestion || 0).toFixed(2)} seconds
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Question review */}
        {hasReview && (
          <section className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-[#191F32]">
            <button
              type="button"
              onClick={() => setShowReview((previous) => !previous)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
              aria-expanded={showReview}
            >
              <div>
                <h2 className="text-lg font-bold sm:text-xl">
                  Question Review
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Review your answers and identify areas to improve.
                </p>
              </div>

              {showReview ? (
                <FaChevronUp className="shrink-0 text-slate-400" />
              ) : (
                <FaChevronDown className="shrink-0 text-slate-400" />
              )}
            </button>

            {showReview && (
              <div className="space-y-3 border-t border-white/10 p-4 sm:p-6">
                {questions.map((question, index) => {
                  const response = responses[index] || {};
                  const isCorrect = response.correct === true;
                  const isTimedOut = response.timedOut === true;
                  const isExpanded = expandedQuestions[index];

                  return (
                    <div
                      key={`${index}-${question.question}`}
                      className="overflow-hidden rounded-xl border border-white/10 bg-[#141A2B]"
                    >
                      <button
                        type="button"
                        onClick={() => toggleQuestion(index)}
                        className="flex w-full items-center justify-between gap-4 p-4 text-left"
                        aria-expanded={Boolean(isExpanded)}
                      >
                        <div className="flex min-w-0 items-start gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-xs font-bold text-slate-300">
                            {index + 1}
                          </span>

                          <div className="min-w-0">
                            <p className="line-clamp-2 text-sm font-medium leading-6 text-slate-200">
                              {question.question}
                            </p>

                            <span
                              className={`mt-2 inline-block text-xs font-semibold ${
                                isCorrect
                                  ? "text-emerald-400"
                                  : isTimedOut
                                  ? "text-amber-400"
                                  : "text-rose-400"
                              }`}
                            >
                              {isCorrect
                                ? "Correct"
                                : isTimedOut
                                ? "Time expired"
                                : response.selected
                                ? "Incorrect"
                                : "Not answered"}
                            </span>
                          </div>
                        </div>

                        {isExpanded ? (
                          <FaChevronUp className="shrink-0 text-slate-500" />
                        ) : (
                          <FaChevronDown className="shrink-0 text-slate-500" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="space-y-3 border-t border-white/10 p-4">
                          <div>
                            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                              Your answer
                            </p>
                            <p className="text-sm text-slate-300">
                              {response.selected || "No answer selected"}
                            </p>
                          </div>

                          <div>
                            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                              Correct answer
                            </p>
                            <p className="text-sm text-emerald-300">
                              {question.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {!hasReview && (
          <div className="mb-8 rounded-2xl border border-white/10 bg-[#191F32] p-5 text-center">
            <p className="text-sm text-slate-400">
              Detailed question review will appear here when question data is provided.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleRetake}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#101322]"
          >
            <FaArrowRotateRight />
            Retake Quiz
          </button>

          <button
            type="button"
            onClick={handleBackToConfiguration}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#191F32] px-6 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:border-violet-400/40 hover:bg-[#202840] focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            <FaHouse />
            Back to Configuration
          </button>
        </div>
      </div>
    </main>
  );
};

export default Results;
