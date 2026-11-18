
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaBars,
  FaBrain,
  FaCoins,
  FaTimes,
  FaChartLine,
  FaHome,
  FaCompass,
  FaStar,
  FaPlayCircle,
} from "react-icons/fa";
import { usePoints } from "@/context/PointsContext";

const Header = () => {
  const { points } = usePoints();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/", icon: FaHome },
    { label: "Explore", href: "/#subjects", icon: FaCompass },
    { label: "Features", href: "/#features", icon: FaStar },
    { label: "How it works", href: "/#how-it-works", icon: FaPlayCircle },
    { label: "Dashboard", href: "/dashboard", icon: FaChartLine },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#101322]/90 backdrop-blur-xl">
      <div className="section-container">
        <div className="flex h-[76px] items-center justify-between gap-5">
          {/* Brand */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3"
            onClick={() => setMenuOpen(false)}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-900/30 transition-transform group-hover:rotate-6">
              <FaBrain className="text-xl text-white" />
            </span>

            <span className="text-2xl font-extrabold tracking-tight text-white">
              Quizzify<span className="text-violet-400">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    link.label === "Dashboard"
                      ? "text-violet-300 hover:text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Icon className="text-sm" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-xl border border-amber-400/15 bg-amber-400/[0.07] px-3 py-2 sm:flex">
              <FaCoins className="text-amber-400" />
              <span className="text-xs font-medium text-slate-300">
                Points
              </span>
              <span className="text-sm font-bold text-amber-300">
                {points}
              </span>
            </div>

            <Link
              href="/#subjects"
              className="hidden rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/20 transition-all hover:bg-violet-500 sm:inline-flex"
            >
              Start learning
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-xl text-white transition-colors hover:bg-white/10 md:hidden"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="border-t border-white/10 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                      link.label === "Dashboard"
                        ? "text-violet-300 hover:bg-white/5 hover:text-white"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="text-base" />
                    {link.label}
                  </Link>
                );
              })}

              {/* Mobile Points */}
              <div className="mt-2 flex items-center gap-2 rounded-lg bg-amber-400/[0.07] px-3 py-3 text-sm sm:hidden">
                <FaCoins className="text-amber-400" />
                <span className="text-slate-300">Your points:</span>
                <span className="font-bold text-amber-300">{points}</span>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
