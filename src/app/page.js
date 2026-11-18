
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaArrowRight,
  FaBrain,
  FaChartLine,
  FaCheck,
  FaClock,
  FaGraduationCap,
  FaLayerGroup,
  FaPlay,
  FaRegLightbulb,
  FaTrophy,
  FaBolt,
  FaStar,
} from "react-icons/fa";

import SubjectExplorer from "@/components/SubjectExplorer";

const features = [
  {
    icon: FaLayerGroup,
    title: "Explore multiple subjects",
    description:
      "Discover a variety of topics, from programming and mathematics to science, history and beyond.",
    color: "text-violet-300",
    background: "bg-violet-400/10",
  },
  {
    icon: FaClock,
    title: "Challenge yourself",
    description:
      "Practice at your own pace or test your knowledge against the clock with timed challenges.",
    color: "text-cyan-300",
    background: "bg-cyan-400/10",
  },
  {
    icon: FaChartLine,
    title: "Track your performance",
    description:
      "Understand your strengths and weaknesses through clear results and performance insights.",
    color: "text-emerald-300",
    background: "bg-emerald-400/10",
  },
  {
    icon: FaTrophy,
    title: "Make progress",
    description:
      "Build consistency, improve your scores and turn learning into a rewarding habit.",
    color: "text-amber-300",
    background: "bg-amber-400/10",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose a subject",
    description:
      "Browse the available subjects and find a topic that interests you.",
    icon: FaGraduationCap,
  },
  {
    number: "02",
    title: "Start your quiz",
    description:
      "Select your preferences and answer questions at your own pace.",
    icon: FaBrain,
  },
  {
    number: "03",
    title: "Review your results",
    description:
      "See your score, evaluate your answers and identify areas to improve.",
    icon: FaChartLine,
  },
];

export default function Home() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("/data/questions.json");

        if (!response.ok) {
          throw new Error("Unable to load question bank");
        }

        const data = await response.json();

        if (!Array.isArray(data.subjects)) {
          throw new Error("Invalid question bank format");
        }

        setSubjects(data.subjects);
      } catch (err) {
        console.error("Failed to load subjects:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const totalQuestions = subjects.reduce(
    (total, subject) => total + (subject.questions?.length || 0),
    0
  );

  return (
    <div id="top" className="overflow-hidden bg-[#101322]">
      {/* HERO */}
      <section className="relative isolate">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="animate-pulse-glow absolute -left-40 top-10 h-96 w-96 rounded-full bg-violet-700/20 blur-[120px]" />

          <div className="absolute -right-40 top-32 h-96 w-96 rounded-full bg-indigo-600/15 blur-[120px]" />

          <div className="absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-400/30 to-transparent" />
        </div>

        <div className="section-container grid min-h-[650px] items-center gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.07] px-4 py-2">
              <FaStar className="text-xs text-violet-300" />

              <span className="text-xs font-semibold tracking-wide text-violet-200">
                YOUR PERSONAL KNOWLEDGE PLATFORM
              </span>
            </div>

            <h1 className="text-balance text-5xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-6xl lg:text-[68px]">
              Challenge Your
              <span className="mt-2 block text-gradient">
                Knowledge.
              </span>
              <span className="mt-2 block">Discover Your</span>
              <span className="text-gradient">Potential.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
              Turn curiosity into progress. Explore subjects, test what you
              know, and discover how much you can achieve with every quiz.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#subjects"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-violet-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-violet-900/30 transition-all hover:-translate-y-1 hover:bg-violet-500"
              >
                Explore subjects
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-4 text-sm font-semibold text-slate-200 transition-all hover:border-violet-400/30 hover:bg-white/[0.07]"
              >
                <FaPlay className="text-xs text-violet-300" />
                How it works
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/[0.08] pt-7">
              <div>
                <p className="text-2xl font-extrabold text-white">
                  {loading ? "—" : subjects.length}
                  <span className="text-violet-400">+</span>
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Subjects to explore
                </p>
              </div>

              <div className="h-10 w-px bg-white/10" />

              <div>
                <p className="text-2xl font-extrabold text-white">
                  {loading ? "—" : totalQuestions}
                  <span className="text-violet-400">+</span>
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Available questions
                </p>
              </div>

              <div className="h-10 w-px bg-white/10" />

              <div>
                <p className="text-2xl font-extrabold text-white">100%</p>
                <p className="mt-1 text-xs text-slate-500">
                  Self-paced learning
                </p>
              </div>
            </div>
          </div>

          {/* HERO QUIZ PREVIEW */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="animate-pulse-glow absolute inset-8 rounded-full bg-violet-600/20 blur-[90px]" />

            <div className="animate-float relative rounded-[28px] border border-white/10 bg-[#191F32] p-5 shadow-2xl shadow-black/40 sm:p-7">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15">
                    <FaBrain className="text-xl text-violet-300" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white">
                      Knowledge Check
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Sample quiz preview
                    </p>
                  </div>
                </div>

                <span className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                  Practice
                </span>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">
                  Question 03 of 10
                </span>

                <span className="text-xs font-semibold text-violet-300">
                  30% completed
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.07]">
                <div className="h-full w-[30%] rounded-full bg-gradient-to-r from-violet-600 to-indigo-400" />
              </div>

              <h3 className="mt-8 text-xl font-bold leading-8 text-white">
                Which technology is responsible for styling web pages?
              </h3>

              <div className="mt-6 space-y-3">
                {[
                  { label: "A", answer: "HTML", correct: false },
                  { label: "B", answer: "CSS", correct: true },
                  { label: "C", answer: "JavaScript", correct: false },
                  { label: "D", answer: "SQL", correct: false },
                ].map((option) => (
                  <div
                    key={option.label}
                    className={`flex items-center gap-4 rounded-xl border p-4 ${
                      option.correct
                        ? "border-emerald-400/40 bg-emerald-400/[0.08]"
                        : "border-white/[0.07] bg-white/[0.025]"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                        option.correct
                          ? "bg-emerald-400 text-[#101322]"
                          : "bg-white/[0.07] text-slate-400"
                      }`}
                    >
                      {option.correct ? <FaCheck /> : option.label}
                    </span>

                    <span
                      className={`text-sm font-medium ${
                        option.correct ? "text-emerald-200" : "text-slate-300"
                      }`}
                    >
                      {option.answer}
                    </span>

                    {option.correct && (
                      <span className="ml-auto text-xs font-semibold text-emerald-300">
                        Correct
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between rounded-xl bg-white/[0.035] p-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <FaClock className="text-violet-300" />
                  Time remaining
                </div>

                <span className="text-sm font-bold text-white">00:24</span>
              </div>

              <div className="pointer-events-none absolute -right-5 top-24 hidden rounded-2xl border border-white/10 bg-[#242b43] p-4 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10">
                    <FaTrophy className="text-xl text-amber-300" />
                  </span>

                  <div>
                    <p className="text-lg font-extrabold text-white">
                      +40 XP
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Keep improving
                    </p>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute -bottom-5 -left-5 hidden rounded-2xl border border-white/10 bg-[#242b43] p-4 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/10">
                    <FaBolt className="text-lg text-violet-300" />
                  </span>

                  <div>
                    <p className="text-xs font-bold text-white">
                      Keep learning
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      One question at a time
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-8 text-center text-[11px] tracking-wide text-slate-600">
              ILLUSTRATIVE QUIZ PREVIEW · ACTUAL QUIZ EXPERIENCE MAY VARY
            </p>
          </div>
        </div>
      </section>

      {/* SUBJECT EXPLORER */}
      <section id="subjects" className="scroll-mt-24 py-24">
        <SubjectExplorer
          subjects={subjects}
          loading={loading}
          error={error}
        />
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="scroll-mt-24 border-y border-white/[0.06] bg-[#151a2b] py-24"
      >
        <div className="section-container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
              Built for better learning
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              More than just a quiz
              <span className="text-violet-400">.</span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
              A focused learning experience designed to make practicing
              knowledge simple, engaging and meaningful.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-white/[0.07] bg-[#191F32] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/25"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.background}`}
                  >
                    <Icon className={`text-xl ${feature.color}`} />
                  </div>

                  <h3 className="mt-6 text-base font-bold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="section-container scroll-mt-24 py-24"
      >
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
            Simple by design
          </span>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Your learning journey
            <span className="text-violet-400">.</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
            Getting started takes only a few steps. Choose what you want to
            learn and let your progress build from there.
          </p>
        </div>

        <div className="relative mt-16 grid gap-10 md:grid-cols-3">
          <div className="absolute left-[17%] right-[17%] top-7 hidden border-t border-dashed border-violet-400/20 md:block" />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative text-center">
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/20 bg-[#191F32] shadow-lg shadow-violet-950/20">
                  <Icon className="text-2xl text-violet-300" />

                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white">
                    {step.number.slice(1)}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-bold text-white">
                  {step.title}
                </h3>

                <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-slate-400">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="section-container pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-[#282044] via-[#211c3d] to-[#171c31] px-6 py-14 text-center sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-violet-500/20 blur-[100px]" />

          <div className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-indigo-500/15 blur-[100px]" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-300/10">
              <FaRegLightbulb className="text-2xl text-violet-200" />
            </div>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Ready to challenge yourself?
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
              Your next learning milestone starts with one question. Choose a
              subject and see what you can achieve.
            </p>

            <Link
              href="#subjects"
              className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-7 py-4 text-sm font-bold text-[#211c3d] transition-all hover:-translate-y-1 hover:bg-violet-100"
            >
              Find your next quiz
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
