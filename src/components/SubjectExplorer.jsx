
"use client";

import { useMemo, useState } from "react";
import { FaSearch, FaLayerGroup, FaCode, FaFlask, FaBookOpen, FaFutbol } from "react-icons/fa";
import SubjectCard from "@/components/SubjectCard";

const categories = [
  { label: "All subjects", value: "All", icon: FaLayerGroup },
  { label: "Technology", value: "Technology", icon: FaCode },
  { label: "STEM", value: "STEM", icon: FaFlask },
  { label: "Humanities", value: "Humanities", icon: FaBookOpen },
  { label: "Sports", value: "Sports", icon: FaFutbol },
];

const subjectCategories = {
  coding: "Technology",
  math: "STEM",
  science: "STEM",
  history: "Humanities",
  geography: "Humanities",
  literature: "Humanities",
  art: "Humanities",
  music: "Humanities",
  sports: "Sports",
};

export default function SubjectExplorer({ subjects = [], loading, error }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      const matchesSearch = subject.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const category =
        subjectCategories[subject.name.toLowerCase()] || "Other";

      const matchesCategory =
        activeCategory === "All" || category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [subjects, search, activeCategory]);

  return (
    <section
      id="subjects"
      className="section-container scroll-mt-24 py-24"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
            Expand your knowledge
          </span>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Explore your interests
            <span className="text-violet-400">.</span>
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            Find a subject, choose your challenge and build your knowledge
            one question at a time.
          </p>
        </div>

        <span className="text-sm font-medium text-slate-500">
          {subjects.length} subjects available
        </span>
      </div>

      {!loading && !error && (
        <div className="mt-9 flex flex-col gap-5">
          <div className="relative max-w-xl">
            <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search subjects..."
              aria-label="Search subjects"
              className="w-full rounded-xl border border-white/10 bg-[#191F32] py-4 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.value;

              return (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => setActiveCategory(category.value)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? "border-violet-400/40 bg-violet-500/15 text-violet-200"
                      : "border-white/[0.08] bg-[#191F32] text-slate-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <Icon className="text-xs" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {loading ? (
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-[218px] animate-pulse rounded-2xl border border-white/[0.06] bg-[#191F32]"
            />
          ))}
        </div>
      ) : error ? (
        <div className="mt-12 rounded-2xl border border-red-400/20 bg-red-400/[0.05] p-8 text-center">
          <p className="font-semibold text-red-300">
            We couldn&apos;t load the subjects.
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Please refresh the page and try again.
          </p>
        </div>
      ) : filteredSubjects.length > 0 ? (
        <>
          <p className="mt-8 text-xs font-medium text-slate-500">
            Showing {filteredSubjects.length} of {subjects.length} subjects
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSubjects.map((subject) => (
              <SubjectCard key={subject.name} subject={subject} />
            ))}
          </div>
        </>
      ) : (
        <div className="mt-12 rounded-2xl border border-white/[0.08] bg-[#191F32] px-6 py-12 text-center">
          <FaSearch className="mx-auto text-2xl text-slate-500" />
          <h3 className="mt-4 font-bold text-white">
            No matching subjects
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Try another search term or choose a different category.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setActiveCategory("All");
            }}
            className="mt-5 text-sm font-semibold text-violet-300 hover:text-violet-200"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
