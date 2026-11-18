
"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  FaArrowRight,
  FaBolt,
  FaBullseye,
  FaCalendarCheck,
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaFire,
  FaLock,
  FaMedal,
  FaPlay,
  FaStar,
  FaTrophy,
  FaWallet,
} from "react-icons/fa";
import { usePoints } from "@/context/PointsContext";

const formatSubject = (subject = "") =>
  subject.charAt(0).toUpperCase() + subject.slice(1);

const formatDate = (date) => {
  if (!date) return "Unknown date";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Unknown date";
  }

  return parsedDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (seconds = 0) => {
  const safeSeconds = Math.max(0, Number(seconds) || 0);
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;

  if (minutes === 0) return `${remainingSeconds}s`;

  return `${minutes}m ${remainingSeconds}s`;
};

const Dashboard = () => {
  const {
    points,
    quizHistory,
    statistics,
    achievements,
    isLoaded,
  } = usePoints();

  const recentQuizzes = useMemo(() => {
    return [...quizHistory]
      .sort(
        (a, b) =>
          new Date(b.completedAt || b.date).getTime() -
          new Date(a.completedAt || a.date).getTime()
      )
      .slice(0, 6);
  }, [quizHistory]);

  const stats = [
    {
      title: "Total XP",
      value: points.toLocaleString(),
      description: "Your accumulated experience",
      icon: FaBolt,
      color: "text-violet-400",
      background: "bg-violet-500/10",
    },
    {
      title: "Quizzes Completed",
      value: statistics.totalQuizzes,
      description: "Total completed quizzes",
      icon: FaCheckCircle,
      color: "text-emerald-400",
      background: "bg-emerald-500/10",
    },
    {
      title: "Average Accuracy",
      value: `${statistics.averageAccuracy}%`,
      description: "Your overall performance",
      icon: FaBullseye,
      color: "text-blue-400",
      background: "bg-blue-500/10",
    },
    {
      title: "Best Score",
      value: `${statistics.bestScore}%`,
      description: "Your highest quiz accuracy",
      icon: FaTrophy,
      color: "text-amber-400",
      background: "bg-amber-500/10",
    },
  ];

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-[#101322] px-5 py-16 text-white">
        <div className="mx-auto max-w-7xl animate-pulse space-y-6">
          <div className="h-10 w-64 rounded-lg bg-white/10" />
          <div className="h-40 rounded-2xl bg-white/5" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-36 rounded-2xl bg-white/5"
              />
            ))}
          </div>
          <div className="h-72 rounded-2xl bg-white/5" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#101322] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Dashboard Header */}
        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
              Your learning space
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              My Dashboard
            </h1>

            <p className="mt-2 text-sm text-gray-400 sm:text-base">
              Track your progress, review your performance, and keep learning.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold transition hover:bg-violet-500"
          >
            <FaPlay size={12} />
            Take a Quiz
          </Link>
        </section>

        {/* XP and Streak Overview */}
        <section className="grid gap-5 lg:grid-cols-3">

          <div className="relative overflow-hidden rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-600/25 to-[#191F32] p-6 lg:col-span-2">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <div className="mb-3 flex items-center gap-2 text-violet-300">
                  <FaBolt />
                  <span className="text-sm font-semibold uppercase tracking-wider">
                    Total Experience Points
                  </span>
                </div>

                <h2 className="text-5xl font-extrabold tracking-tight">
                  {points.toLocaleString()}
                  <span className="ml-2 text-lg font-semibold text-violet-300">
                    XP
                  </span>
                </h2>

                <p className="mt-3 text-sm text-gray-300">
                  Every correct answer brings you closer to your next milestone.
                </p>
              </div>

              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-400/10">
                <FaTrophy className="text-4xl text-amber-300" />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-orange-400/20 bg-[#191F32] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  Current Streak
                </p>

                <h2 className="mt-2 text-4xl font-bold">
                  {statistics.streak}
                  <span className="ml-2 text-base font-semibold text-gray-400">
                    {statistics.streak === 1 ? "Day" : "Days"}
                  </span>
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500/10">
                <FaFire className="text-3xl text-orange-400" />
              </div>
            </div>

            <p className="mt-5 text-sm text-gray-400">
              Complete quizzes on consecutive days to maintain your streak.
            </p>
          </div>
        </section>

        {/* Statistics */}
        <section>
          <div className="mb-5 flex items-center gap-2">
            <FaChartLine className="text-violet-400" />
            <h2 className="text-xl font-bold">Performance Overview</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-white/5 bg-[#191F32] p-5 transition-colors hover:border-violet-400/20"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-400">
                      {stat.title}
                    </p>

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.background}`}
                    >
                      <Icon className={`text-lg ${stat.color}`} />
                    </div>
                  </div>

                  <h3 className="mt-5 text-3xl font-bold">
                    {stat.value}
                  </h3>

                  <p className="mt-2 text-xs text-gray-500">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Achievements */}
        <section>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FaMedal className="text-amber-400" />
              <h2 className="text-xl font-bold">Achievements</h2>
            </div>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
              {achievements.filter((item) => item.unlocked).length} /{" "}
              {achievements.length} Unlocked
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => {
              const unlocked = achievement.unlocked;

              return (
                <div
                  key={achievement.id}
                  className={`flex items-start gap-4 rounded-2xl border p-5 transition-colors ${
                    unlocked
                      ? "border-amber-400/20 bg-[#191F32]"
                      : "border-white/5 bg-[#191F32]/60"
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                      unlocked
                        ? "bg-amber-400/10 text-amber-400"
                        : "bg-white/5 text-gray-600"
                    }`}
                  >
                    {unlocked ? (
                      <FaStar className="text-xl" />
                    ) : (
                      <FaLock className="text-lg" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        className={`font-semibold ${
                          unlocked ? "text-white" : "text-gray-400"
                        }`}
                      >
                        {achievement.title || achievement.name}
                      </h3>

                      {unlocked && (
                        <FaCheckCircle className="shrink-0 text-sm text-emerald-400" />
                      )}
                    </div>

                    <p className="mt-1 text-xs leading-relaxed text-gray-500">
                      {achievement.description}
                    </p>

                    <p
                      className={`mt-3 text-xs font-semibold ${
                        unlocked ? "text-emerald-400" : "text-gray-600"
                      }`}
                    >
                      {unlocked ? "Achievement unlocked" : "Not unlocked yet"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Quiz History */}
        <section>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FaCalendarCheck className="text-violet-400" />
              <h2 className="text-xl font-bold">Recent Quiz History</h2>
            </div>

            <span className="text-xs text-gray-500">
              Showing your latest {recentQuizzes.length} quizzes
            </span>
          </div>

          {recentQuizzes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-[#191F32] px-6 py-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10">
                <FaWallet className="text-2xl text-violet-400" />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                No quizzes completed yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-gray-400">
                Your quiz history and performance reports will appear here
                after you complete your first quiz.
              </p>

              <Link
                href="/"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold transition hover:bg-violet-500"
              >
                Start Your First Quiz
                <FaArrowRight size={12} />
              </Link>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#191F32]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/[0.02] text-xs uppercase tracking-wider text-gray-500">
                      <th className="px-5 py-4 font-semibold">Subject</th>
                      <th className="px-5 py-4 font-semibold">Mode</th>
                      <th className="px-5 py-4 font-semibold">Score</th>
                      <th className="px-5 py-4 font-semibold">Accuracy</th>
                      <th className="px-5 py-4 font-semibold">Duration</th>
                      <th className="px-5 py-4 font-semibold">Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentQuizzes.map((quiz) => (
                      <tr
                        key={quiz.id}
                        className="border-b border-white/5 last:border-0 transition-colors hover:bg-white/[0.02]"
                      >
                        <td className="px-5 py-4">
                          <span className="font-semibold text-white">
                            {formatSubject(quiz.subject)}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              quiz.mode === "challenge"
                                ? "bg-orange-400/10 text-orange-400"
                                : "bg-blue-400/10 text-blue-400"
                            }`}
                          >
                            {quiz.mode === "challenge"
                              ? "Challenge"
                              : "Practice"}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-sm font-semibold text-violet-300">
                          {quiz.score} XP
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`text-sm font-semibold ${
                              quiz.percentage >= 70
                                ? "text-emerald-400"
                                : quiz.percentage >= 40
                                  ? "text-amber-400"
                                  : "text-red-400"
                            }`}
                          >
                            {quiz.percentage}%
                          </span>
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-400">
                          <span className="inline-flex items-center gap-2">
                            <FaClock className="text-gray-500" />
                            {formatTime(quiz.timeSpent)}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-400">
                          {formatDate(quiz.completedAt || quiz.date)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* Bottom CTA */}
        <section className="rounded-2xl border border-violet-400/15 bg-gradient-to-r from-violet-600/15 to-[#191F32] p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold">
                Ready for another challenge?
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                Keep practicing, improve your accuracy, and earn more XP.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold transition hover:bg-violet-500"
            >
              Explore Quizzes
              <FaArrowRight size={12} />
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
};

export default Dashboard;
