
"use client";

import Link from "next/link";
import {
  FaCode,
  FaCalculator,
  FaFlask,
  FaLandmark,
  FaGlobe,
  FaBookOpen,
  FaPalette,
  FaMusic,
  FaFutbol,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";

const subjectStyles = {
  coding: {
    icon: FaCode,
    color: "text-cyan-300",
    background: "bg-cyan-400/10",
    border: "group-hover:border-cyan-400/40",
    glow: "from-cyan-500/15",
    description: "Programming, development and technology.",
  },
  math: {
    icon: FaCalculator,
    color: "text-violet-300",
    background: "bg-violet-400/10",
    border: "group-hover:border-violet-400/40",
    glow: "from-violet-500/15",
    description: "Numbers, formulas and logical thinking.",
  },
  science: {
    icon: FaFlask,
    color: "text-emerald-300",
    background: "bg-emerald-400/10",
    border: "group-hover:border-emerald-400/40",
    glow: "from-emerald-500/15",
    description: "Explore the world of scientific discovery.",
  },
  history: {
    icon: FaLandmark,
    color: "text-amber-300",
    background: "bg-amber-400/10",
    border: "group-hover:border-amber-400/40",
    glow: "from-amber-500/15",
    description: "Discover events that shaped our world.",
  },
  geography: {
    icon: FaGlobe,
    color: "text-sky-300",
    background: "bg-sky-400/10",
    border: "group-hover:border-sky-400/40",
    glow: "from-sky-500/15",
    description: "Explore countries, places and our planet.",
  },
  literature: {
    icon: FaBookOpen,
    color: "text-pink-300",
    background: "bg-pink-400/10",
    border: "group-hover:border-pink-400/40",
    glow: "from-pink-500/15",
    description: "Books, authors and literary knowledge.",
  },
  art: {
    icon: FaPalette,
    color: "text-orange-300",
    background: "bg-orange-400/10",
    border: "group-hover:border-orange-400/40",
    glow: "from-orange-500/15",
    description: "Explore creativity, artists and art history.",
  },
  music: {
    icon: FaMusic,
    color: "text-fuchsia-300",
    background: "bg-fuchsia-400/10",
    border: "group-hover:border-fuchsia-400/40",
    glow: "from-fuchsia-500/15",
    description: "Discover instruments, composers and music.",
  },
  sports: {
    icon: FaFutbol,
    color: "text-lime-300",
    background: "bg-lime-400/10",
    border: "group-hover:border-lime-400/40",
    glow: "from-lime-500/15",
    description: "Test your knowledge of sports and games.",
  },
};

export default function SubjectCard({ subject }) {
  const key = subject.name.toLowerCase();

  const style = subjectStyles[key] || {
    icon: FaBookOpen,
    color: "text-violet-300",
    background: "bg-violet-400/10",
    border: "group-hover:border-violet-400/40",
    glow: "from-violet-500/15",
    description: "Discover something new and test your knowledge.",
  };

  const Icon = style.icon;
  const questionCount = subject.questions?.length || 0;

  return (
    <Link
      href={`/configure/${encodeURIComponent(key)}`}
      className={`group relative flex min-h-[218px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#191F32] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 ${style.border}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${style.glow} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />

      <div className="relative flex items-start justify-between">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${style.background}`}
        >
          <Icon className={`text-2xl ${style.color}`} />
        </div>

        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-slate-500 transition-all group-hover:border-violet-400/30 group-hover:bg-violet-500/10 group-hover:text-violet-300">
          <FaArrowUpRightFromSquare className="text-sm" />
        </span>
      </div>

      <div className="relative mt-6">
        <h3 className="text-lg font-bold text-white transition-colors group-hover:text-violet-200">
          {subject.name}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          {subject.description || style.description}
        </p>
      </div>

      <div className="relative mt-auto flex items-center justify-between border-t border-white/[0.07] pt-4">
        <span className="text-xs font-medium text-slate-500">
          {questionCount} questions
        </span>

        <span className="text-xs font-semibold text-violet-300 transition-transform group-hover:translate-x-1">
          Configure quiz →
        </span>
      </div>
    </Link>
  );
}
