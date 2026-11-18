
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePoints } from "@/context/PointsContext";
import Results from "@/components/Results";

import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaClock,
  FaFlagCheckered,
  FaLightbulb,
  FaTimes,
  FaTrophy,
} from "react-icons/fa";

export default function Quiz({ params }) {
  const { setPoints, addQuizResult } = usePoints();

  const subjectSlug = params.subject;

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [mode, setMode] = useState("practice");
  const [timePerQuestion, setTimePerQuestion] = useState(15);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const pointsAwarded = useRef(false);

  // Load subject questions and configuration.
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        setLoading(true);
        setError(false);

        const query = new URLSearchParams(window.location.search);

        const selectedMode =
          query.get("mode") === "challenge" ? "challenge" : "practice";

        const requestedCount = Number(query.get("count")) || 5;
        const requestedTime = Number(query.get("time")) || 15;

        const validTime = [10, 15, 20].includes(requestedTime)
          ? requestedTime
          : 15;

        setMode(selectedMode);
        setTimePerQuestion(validTime);
        setTimeLeft(validTime);

        const response = await fetch("/data/questions.json");

        if (!response.ok) {
          throw new Error("Unable to load questions");
        }

        const data = await response.json();

        if (!Array.isArray(data.subjects)) {
          throw new Error("Invalid question bank");
        }

        const selectedSubject = data.subjects.find(
          (item) =>
            item.name.toLowerCase() ===
            decodeURIComponent(subjectSlug).toLowerCase()
        );

        if (
          !selectedSubject ||
          !Array.isArray(selectedSubject.questions) ||
          selectedSubject.questions.length === 0
        ) {
          throw new Error("Subject has no available questions");
        }

        // Randomize questions using Fisher-Yates shuffle.
        const shuffledQuestions = [...selectedSubject.questions];

        for (let i = shuffledQuestions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));

          [shuffledQuestions[i], shuffledQuestions[j]] = [
            shuffledQuestions[j],
            shuffledQuestions[i],
          ];
        }

        const safeCount = Math.min(
          Math.max(1, requestedCount),
          shuffledQuestions.length
        );

        const selectedQuestions = shuffledQuestions.slice(0, safeCount);

        setQuestions(selectedQuestions);
        setResponses([]);
        setCurrentQuestionIndex(0);
        setTotalTimeSpent(0);
        setShowResults(false);
        pointsAwarded.current = false;
      } catch (err) {
        console.error("Failed to prepare quiz:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [subjectSlug]);

  const currentQuestion = questions[currentQuestionIndex];
  const currentResponse = responses[currentQuestionIndex];

  const isAnswered = Boolean(currentResponse);

  const correctAnswers = useMemo(
    () => responses.filter((response) => response?.correct).length,
    [responses]
  );

  const wrongAnswers = useMemo(
    () =>
      responses.filter(
        (response) =>
          response && !response.correct && !response.timedOut
      ).length,
    [responses]
  );

  const unattemptedQuestions = useMemo(
    () => responses.filter((response) => response?.timedOut).length,
    [responses]
  );

  const earnedPoints = correctAnswers * 4;

  const percentage =
    questions.length > 0
      ? Math.round((correctAnswers / questions.length) * 100)
      : 0;

  const averageTimePerQuestion =
    questions.length > 0
      ? (totalTimeSpent / questions.length).toFixed(2)
      : "0.00";

  // Reset countdown whenever a new question becomes active.
  useEffect(() => {
    setTimeLeft(timePerQuestion);
  }, [currentQuestionIndex, timePerQuestion]);

  // Track time spent answering questions.
  useEffect(() => {
    if (loading || error || showResults || !currentQuestion || isAnswered) {
      return;
    }

    const interval = setInterval(() => {
      setTotalTimeSpent((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [
    loading,
    error,
    showResults,
    currentQuestion,
    currentQuestionIndex,
    isAnswered,
  ]);

  // Challenge countdown.
  useEffect(() => {
    if (
      loading ||
      error ||
      showResults ||
      mode !== "challenge" ||
      isAnswered ||
      !currentQuestion
    ) {
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((previous) => Math.max(0, previous - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [
    loading,
    error,
    showResults,
    mode,
    isAnswered,
    currentQuestion,
    currentQuestionIndex,
  ]);

  // Automatically mark a question unanswered when time runs out.
  useEffect(() => {
    if (
      mode !== "challenge" ||
      timeLeft > 0 ||
      isAnswered ||
      !currentQuestion ||
      showResults
    ) {
      return;
    }

    setResponses((previous) => {
      if (previous[currentQuestionIndex]) {
        return previous;
      }

      const updated = [...previous];

      updated[currentQuestionIndex] = {
        selected: null,
        correct: false,
        timedOut: true,
      };

      return updated;
    });
  }, [
    mode,
    timeLeft,
    isAnswered,
    currentQuestion,
    currentQuestionIndex,
    showResults,
  ]);

  const handleAnswer = (option) => {
    if (isAnswered || !currentQuestion) {
      return;
    }

    const isCorrect = option === currentQuestion.answer;

    setResponses((previous) => {
      if (previous[currentQuestionIndex]) {
        return previous;
      }

      const updated = [...previous];

      updated[currentQuestionIndex] = {
        selected: option,
        correct: isCorrect,
        timedOut: false,
      };

      return updated;
    });
  };

  const finishQuiz = () => {
    if (pointsAwarded.current) {
      return;
    }

    pointsAwarded.current = true;

    // Award XP.
    setPoints((previousPoints) => previousPoints + earnedPoints);

    // Save this completed quiz to history.
    addQuizResult({
      subject: subjectSlug,
      mode,
      score: earnedPoints,
      totalQuestions: questions.length,
      correctAnswers,
      wrongAnswers,
      unattemptedQuestions,
      percentage,
      timeSpent: totalTimeSpent,
    });

    setShowResults(true);
  };

  const handleNext = () => {
    if (!isAnswered) {
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((previous) => previous + 1);
    } else {
      finishQuiz();
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#101322] px-5">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-violet-400/20 border-t-violet-400" />

          <p className="mt-5 text-sm text-slate-400">
            Preparing your quiz...
          </p>
        </div>
      </main>
    );
  }

  if (error || !questions.length) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#101322] px-5">
        <div className="w-full max-w-md rounded-3xl border border-white/[0.08] bg-[#191F32] p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-400/10">
            <FaTimes className="text-2xl text-red-300" />
          </div>

          <h1 className="mt-6 text-xl font-bold text-white">
            Unable to start quiz
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            We couldn&apos;t load the questions for this subject. Please try
            selecting the subject again.
          </p>

          <Link
            href={`/configure/${encodeURIComponent(subjectSlug)}`}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-violet-500"
          >
            <FaArrowLeft />
            Back to configuration
          </Link>
        </div>
      </main>
    );
  }

  // Results dashboard.
  if (showResults) {
    return (
      <Results
        score={earnedPoints}
        totalQuestions={questions.length}
        correctAnswers={correctAnswers}
        wrongAnswers={wrongAnswers}
        unattemptedQuestions={unattemptedQuestions}
        percentage={percentage}
        timeSpent={totalTimeSpent}
        averageTimePerQuestion={averageTimePerQuestion}
        questions={questions}
        responses={responses}
        subject={subjectSlug}
      />
    );
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <main className="min-h-screen bg-[#101322] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">
        {/* TOP NAVIGATION */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/configure/${encodeURIComponent(subjectSlug)}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-violet-300"
          >
            <FaArrowLeft className="text-xs" />
            Exit quiz
          </Link>

          <span
            className={`rounded-full border px-4 py-2 text-xs font-bold ${mode === "challenge"
                ? "border-violet-400/20 bg-violet-400/10 text-violet-300"
                : "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
              }`}
          >
            {mode === "challenge" ? "CHALLENGE MODE" : "PRACTICE MODE"}
          </span>
        </div>

        {/* QUIZ HEADER */}
        <div className="mt-9 rounded-2xl border border-white/[0.08] bg-[#191F32] p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Current subject
              </p>

              <h1 className="mt-1 text-2xl font-extrabold text-white">
                {subjectSlug.charAt(0).toUpperCase() +
                  subjectSlug.slice(1)}
              </h1>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-violet-400/10 px-4 py-3">
              <FaTrophy className="text-violet-300" />

              <div>
                <p className="text-sm font-bold text-white">
                  {earnedPoints} XP
                </p>

                <p className="text-[10px] text-slate-400">
                  Quiz points
                </p>
              </div>
            </div>
          </div>

          {/* PROGRESS */}
          <div className="mt-7 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-300">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>

            <p className="text-xs font-bold text-violet-300">
              {Math.round(progress)}% completed
            </p>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.07]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* TIMER AND QUESTION */}
        <section className="mt-6 rounded-2xl border border-white/[0.08] bg-[#191F32] p-5 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Your question
            </span>

            <div
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold ${mode === "challenge"
                  ? timeLeft <= 5
                    ? "bg-red-400/10 text-red-300"
                    : "bg-violet-400/10 text-violet-300"
                  : "bg-emerald-400/10 text-emerald-300"
                }`}
            >
              <FaClock />

              {mode === "challenge"
                ? `00:${String(timeLeft).padStart(2, "0")}`
                : "No time limit"}
            </div>
          </div>

          <h2 className="mt-7 text-xl font-bold leading-8 text-white sm:text-2xl">
            {currentQuestion.question}
          </h2>

          {/* ANSWER OPTIONS */}
          <div className="mt-8 space-y-3">
            {currentQuestion.options.map((option, index) => {
              const selected = currentResponse?.selected === option;
              const correct = option === currentQuestion.answer;

              let optionStyle =
                "border-white/[0.08] bg-white/[0.025] text-slate-300 hover:border-violet-400/30 hover:bg-violet-400/[0.04]";

              if (isAnswered && correct) {
                optionStyle =
                  "border-emerald-400/40 bg-emerald-400/[0.08] text-emerald-200";
              } else if (isAnswered && selected && !correct) {
                optionStyle =
                  "border-red-400/40 bg-red-400/[0.08] text-red-200";
              } else if (isAnswered) {
                optionStyle =
                  "border-white/[0.05] bg-white/[0.015] text-slate-500";
              }

              return (
                <button
                  key={`${currentQuestionIndex}-${option}`}
                  type="button"
                  onClick={() => handleAnswer(option)}
                  disabled={isAnswered}
                  className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition sm:p-5 ${optionStyle} disabled:cursor-default`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${isAnswered && correct
                        ? "bg-emerald-400 text-[#101322]"
                        : isAnswered && selected
                          ? "bg-red-400 text-[#101322]"
                          : "bg-white/[0.07] text-slate-400"
                      }`}
                  >
                    {isAnswered && correct ? (
                      <FaCheck />
                    ) : isAnswered && selected ? (
                      <FaTimes />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </span>

                  <span className="flex-1 text-sm font-semibold leading-6">
                    {option}
                  </span>

                  {isAnswered && correct && (
                    <FaCheck className="shrink-0 text-emerald-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* ANSWER FEEDBACK */}
          {isAnswered && (
            <div
              className={`mt-6 rounded-xl border p-5 ${currentResponse.timedOut
                  ? "border-amber-400/20 bg-amber-400/[0.06]"
                  : currentResponse.correct
                    ? "border-emerald-400/20 bg-emerald-400/[0.06]"
                    : "border-red-400/20 bg-red-400/[0.06]"
                }`}
            >
              <div className="flex items-center gap-3">
                {currentResponse.timedOut ? (
                  <FaClock className="text-amber-300" />
                ) : currentResponse.correct ? (
                  <FaCheck className="text-emerald-300" />
                ) : (
                  <FaTimes className="text-red-300" />
                )}

                <h3
                  className={`text-sm font-bold ${currentResponse.timedOut
                      ? "text-amber-300"
                      : currentResponse.correct
                        ? "text-emerald-300"
                        : "text-red-300"
                    }`}
                >
                  {currentResponse.timedOut
                    ? "Time is up!"
                    : currentResponse.correct
                      ? "Correct answer!"
                      : "Incorrect answer"}
                </h3>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                {currentResponse.timedOut
                  ? "You did not answer this question in time."
                  : currentResponse.correct
                    ? "Well done! You earned 4 points."
                    : "Keep learning. Review the correct answer below."}
              </p>

              {!currentResponse.correct && (
                <p className="mt-3 text-sm font-semibold text-white">
                  Correct answer:{" "}
                  <span className="text-emerald-300">
                    {currentQuestion.answer}
                  </span>
                </p>
              )}
            </div>
          )}

          {/* NEXT QUESTION */}
          <div className="mt-8">
            <button
              type="button"
              onClick={handleNext}
              disabled={!isAnswered}
              className="group flex w-full items-center justify-center gap-3 rounded-xl bg-violet-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {currentQuestionIndex === questions.length - 1
                ? "Finish quiz"
                : "Next question"}

              {currentQuestionIndex === questions.length - 1 ? (
                <FaFlagCheckered />
              ) : (
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              )}
            </button>

            {!isAnswered && (
              <p className="mt-3 text-center text-xs text-slate-500">
                Select an answer to continue.
              </p>
            )}
          </div>
        </section>

        {/* QUIZ FOOTER */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-2">
            <FaLightbulb className="text-violet-300" />
            Take your time and think carefully.
          </span>

          <span>
            {correctAnswers} correct · {wrongAnswers} incorrect ·{" "}
            {unattemptedQuestions} skipped
          </span>
        </div>
      </div>
    </main>
  );
}
