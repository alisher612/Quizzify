
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  FaArrowLeft,
  FaArrowRight,
  FaBolt,
  FaBrain,
  FaCheck,
  FaClock,
  FaGraduationCap,
  FaLayerGroup,
  FaQuestionCircle,
  FaRegLightbulb,
  FaShieldAlt,
  FaTrophy,
} from "react-icons/fa";

const modeOptions = [
  {
    id: "practice",
    title: "Practice Mode",
    description: "Learn at your own pace without a countdown.",
    icon: FaGraduationCap,
    features: [
      "No time pressure",
      "Focus on understanding",
      "Learn at your own pace",
    ],
    color: "emerald",
  },
  {
    id: "challenge",
    title: "Challenge Mode",
    description: "Test your knowledge against the clock.",
    icon: FaBolt,
    features: [
      "Timed questions",
      "Test your speed",
      "Challenge your knowledge",
    ],
    color: "violet",
  },
];

const timerOptions = [10, 15, 20];

export default function ConfigureQuiz({ params }) {
  const router = useRouter();

  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [mode, setMode] = useState("practice");
  const [questionCount, setQuestionCount] = useState(5);
  const [timePerQuestion, setTimePerQuestion] = useState(15);

  const subjectSlug = params.subject;

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch("/data/questions.json");

        if (!response.ok) {
          throw new Error("Unable to load question bank");
        }

        const data = await response.json();

        if (!Array.isArray(data.subjects)) {
          throw new Error("Invalid question bank format");
        }

        const selectedSubject = data.subjects.find(
          (item) =>
            item.name.toLowerCase() ===
            decodeURIComponent(subjectSlug).toLowerCase()
        );

        if (!selectedSubject) {
          setError(true);
          return;
        }

        setSubject(selectedSubject);

        const availableQuestions =
          selectedSubject.questions?.length || 0;

        setQuestionCount(Math.min(5, availableQuestions));
      } catch (err) {
        console.error("Failed to load subject:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSubject();
  }, [subjectSlug]);

  const availableQuestions = subject?.questions?.length || 0;

  const questionOptions = [5, 10].filter(
    (count) => count <= availableQuestions
  );

  const handleStartQuiz = () => {
    if (!subject || questionCount === 0 || questionCount > availableQuestions) {
      return;
    }

    const searchParams = new URLSearchParams({
      mode,
      count: String(questionCount),
      time: String(mode === "challenge" ? timePerQuestion : 0),
    });

    router.push(
      `/quiz/${encodeURIComponent(subject.name.toLowerCase())}?${searchParams.toString()}`
    );
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#101322] px-5">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-violet-400/20 border-t-violet-400" />
          <p className="mt-5 text-sm font-medium text-slate-400">
            Preparing your quiz configuration...
          </p>
        </div>
      </main>
    );
  }

  if (error || !subject) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#101322] px-5">
        <div className="w-full max-w-md rounded-3xl border border-white/[0.08] bg-[#191F32] p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-400/10">
            <FaQuestionCircle className="text-2xl text-red-300" />
          </div>

          <h1 className="mt-6 text-xl font-bold text-white">
            Subject not found
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            We couldn&apos;t find this subject in the question bank. Please
            return to the subject explorer and select another subject.
          </p>

          <Link
            href="/#subjects"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-violet-500"
          >
            <FaArrowLeft />
            Back to subjects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#101322] px-4 py-10 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-5xl">
        {/* BACK NAVIGATION */}
        <Link
          href="/#subjects"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-violet-300"
        >
          <FaArrowLeft className="text-xs" />
          Back to subjects
        </Link>

        {/* PAGE HEADER */}
        <div className="mt-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10">
            <FaBrain className="text-3xl text-violet-300" />
          </div>

          <span className="mt-6 inline-block text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
            Customize your experience
          </span>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Configure your quiz
            <span className="text-violet-400">.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            Choose your preferred settings and get ready to challenge
            your knowledge.
          </p>
        </div>

        {/* SUBJECT INFORMATION */}
        <section className="mt-12 rounded-2xl border border-white/[0.08] bg-[#191F32] p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-400/10">
                <FaLayerGroup className="text-2xl text-violet-300" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Selected subject
                </p>

                <h2 className="mt-1 text-xl font-bold text-white">
                  {subject.name}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {subject.description ||
                    "Expand your knowledge and test your skills."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-violet-400/15 bg-violet-400/[0.06] px-4 py-3">
              <FaQuestionCircle className="text-violet-300" />

              <div>
                <p className="text-lg font-extrabold text-white">
                  {availableQuestions}
                </p>
                <p className="text-[11px] text-slate-400">
                  Available questions
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MODE SELECTION */}
        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-white">
              01. Select your quiz mode
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Decide how you want to test your knowledge.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {modeOptions.map((option) => {
              const Icon = option.icon;
              const selected = mode === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setMode(option.id)}
                  aria-pressed={selected}
                  className={`relative rounded-2xl border p-6 text-left transition-all duration-200 ${
                    selected
                      ? option.color === "emerald"
                        ? "border-emerald-400/50 bg-emerald-400/[0.07]"
                        : "border-violet-400/50 bg-violet-400/[0.07]"
                      : "border-white/[0.08] bg-[#191F32] hover:border-white/20"
                  }`}
                >
                  {selected && (
                    <span className="absolute right-5 top-5 flex h-6 w-6 items-center justify-center rounded-full bg-violet-500 text-white">
                      <FaCheck className="text-xs" />
                    </span>
                  )}

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                      option.color === "emerald"
                        ? "bg-emerald-400/10"
                        : "bg-violet-400/10"
                    }`}
                  >
                    <Icon
                      className={`text-xl ${
                        option.color === "emerald"
                          ? "text-emerald-300"
                          : "text-violet-300"
                      }`}
                    />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-white">
                    {option.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {option.description}
                  </p>

                  <ul className="mt-5 space-y-3">
                    {option.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-xs font-medium text-slate-300"
                      >
                        <FaCheck className="text-[10px] text-emerald-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        </section>

        {/* QUESTION COUNT */}
        <section className="mt-10 rounded-2xl border border-white/[0.08] bg-[#191F32] p-6 sm:p-7">
          <div>
            <h2 className="text-lg font-bold text-white">
              02. Number of questions
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Select how many questions you want in this quiz.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {questionOptions.map((count) => {
              const selected = questionCount === count;

              return (
                <button
                  key={count}
                  type="button"
                  onClick={() => setQuestionCount(count)}
                  aria-pressed={selected}
                  className={`rounded-xl border px-4 py-5 text-center transition ${
                    selected
                      ? "border-violet-400/50 bg-violet-400/10"
                      : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
                  }`}
                >
                  <span className="block text-2xl font-extrabold text-white">
                    {count}
                  </span>

                  <span className="mt-1 block text-xs font-medium text-slate-400">
                    Questions
                  </span>

                  {selected && (
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-violet-300">
                      <FaCheck />
                      Selected
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {questionOptions.length === 0 && (
            <p className="mt-4 text-sm text-amber-300">
              There are no questions available for this subject yet.
            </p>
          )}
        </section>

        {/* TIMER SETTINGS */}
        {mode === "challenge" && (
          <section className="mt-6 rounded-2xl border border-violet-400/20 bg-[#191F32] p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-400/10">
                <FaClock className="text-xl text-violet-300" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-white">
                  03. Time per question
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Choose your countdown duration.
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {timerOptions.map((seconds) => {
                const selected = timePerQuestion === seconds;

                return (
                  <button
                    key={seconds}
                    type="button"
                    onClick={() => setTimePerQuestion(seconds)}
                    aria-pressed={selected}
                    className={`rounded-xl border px-3 py-4 transition ${
                      selected
                        ? "border-violet-400/50 bg-violet-400/10 text-violet-200"
                        : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/20"
                    }`}
                  >
                    <span className="block text-xl font-extrabold">
                      {seconds}s
                    </span>

                    <span className="mt-1 block text-[11px]">
                      Per question
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* DIFFICULTY INFORMATION */}
        <section className="mt-6 flex gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/10">
            <FaRegLightbulb className="text-lg text-amber-300" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-white">
              Question difficulty
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-400">
              Difficulty filters are not available yet because the current
              question bank does not contain difficulty labels. Questions
              will use the existing subject question set.
            </p>
          </div>
        </section>

        {/* QUIZ SUMMARY */}
        <section className="mt-10 overflow-hidden rounded-2xl border border-violet-400/20 bg-gradient-to-br from-[#211c3d] to-[#191F32] p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <FaShieldAlt className="text-xl text-violet-300" />

            <h2 className="text-lg font-bold text-white">
              Your quiz summary
            </h2>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            <div>
              <p className="text-xs text-slate-400">Subject</p>
              <p className="mt-2 font-bold text-white">
                {subject.name}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Quiz mode</p>
              <p className="mt-2 font-bold capitalize text-white">
                {mode}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Questions</p>
              <p className="mt-2 font-bold text-white">
                {questionCount}
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-400">
                  {mode === "challenge"
                    ? "Time per question"
                    : "Time limit"}
                </p>

                <p className="mt-1 text-sm font-bold text-white">
                  {mode === "challenge"
                    ? `${timePerQuestion} seconds`
                    : "No time limit"}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-slate-400">
                  {mode === "challenge"
                    ? "Maximum quiz duration"
                    : "Learning experience"}
                </p>

                <p className="mt-1 text-sm font-bold text-white">
                  {mode === "challenge"
                    ? `${questionCount * timePerQuestion} seconds`
                    : "Self-paced"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* START QUIZ */}
        <div className="mt-8">
          <button
            type="button"
            onClick={handleStartQuiz}
            disabled={
              questionCount === 0 ||
              questionCount > availableQuestions
            }
            className="group flex w-full items-center justify-center gap-3 rounded-xl bg-violet-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-violet-950/30 transition hover:-translate-y-0.5 hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            <FaTrophy />
            Start your quiz
            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </button>

          <p className="mt-4 text-center text-xs text-slate-500">
            Review your settings before starting your quiz.
          </p>
        </div>
      </div>
    </main>
  );
}
