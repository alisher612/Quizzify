
import Link from "next/link";
import {
  FaBrain,
  FaArrowRight,
  FaArrowUp,
  FaHome,
  FaCompass,
  FaStar,
  FaPlayCircle,
  FaChartLine,
  FaGraduationCap,
  FaBolt,
  FaTrophy,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const exploreLinks = [
    { label: "Home", href: "/", icon: FaHome },
    { label: "Explore Subjects", href: "/#subjects", icon: FaCompass },
    { label: "Features", href: "/#features", icon: FaStar },
    { label: "How It Works", href: "/#how-it-works", icon: FaPlayCircle },
  ];

  const platformLinks = [
    { label: "My Dashboard", href: "/dashboard", icon: FaChartLine },
    { label: "Start Learning", href: "/#subjects", icon: FaGraduationCap },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-[#0c0f1c]">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-80 w-80 rounded-full bg-violet-600/[0.07] blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-indigo-600/[0.06] blur-[100px]" />

      <div className="section-container relative">
        {/* Main Footer */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-16">

          {/* Brand Section */}
          <div className="lg:col-span-5">
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-900/30 transition-transform group-hover:rotate-6">
                <FaBrain className="text-xl text-white" />
              </span>

              <span className="text-2xl font-extrabold tracking-tight text-white">
                Quizzify<span className="text-violet-400">.</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              Challenge your knowledge, explore new subjects, and track your
              learning journey. Turn every question into an opportunity to grow.
            </p>

            {/* Platform Highlights */}
            <div className="mt-7 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2">
                <FaBolt className="text-sm text-violet-400" />
                <span className="text-xs font-medium text-slate-300">
                  Interactive Quizzes
                </span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2">
                <FaTrophy className="text-sm text-amber-400" />
                <span className="text-xs font-medium text-slate-300">
                  Track Your Progress
                </span>
              </div>
            </div>
          </div>

          {/* Explore Links */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Explore
            </h3>

            <div className="mt-6 flex flex-col gap-4">
              {exploreLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group inline-flex w-fit items-center gap-3 text-sm text-slate-400 transition-colors hover:text-violet-300"
                  >
                    <Icon className="text-xs text-slate-500 transition-colors group-hover:text-violet-400" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Platform Links */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Your Learning Space
            </h3>

            <div className="mt-6 flex flex-col gap-4">
              {platformLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group inline-flex w-fit items-center gap-3 text-sm text-slate-400 transition-colors hover:text-violet-300"
                  >
                    <Icon className="text-xs text-slate-500 transition-colors group-hover:text-violet-400" />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Dashboard CTA */}
            <Link
              href="/dashboard"
              className="group mt-7 inline-flex items-center gap-3 rounded-xl border border-violet-500/20 bg-violet-500/[0.08] px-4 py-3 transition-all hover:border-violet-400/40 hover:bg-violet-500/[0.13]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/15 text-violet-300">
                <FaChartLine />
              </span>

              <span>
                <span className="block text-sm font-semibold text-white">
                  View Your Progress
                </span>
                <span className="mt-1 block text-xs text-slate-400">
                  Check your learning journey
                </span>
              </span>

              <FaArrowRight className="ml-2 text-xs text-violet-400 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-5 border-t border-white/[0.07] py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs text-slate-500">
              © {currentYear} Quizzify. All rights reserved.
            </p>

            <p className="mt-1 text-xs text-slate-600">
              Challenge Your Knowledge. Discover Your Potential.
            </p>
          </div>

          <div className="flex items-center justify-between gap-5 sm:justify-end">
            <span className="text-xs text-slate-500">
              Learn. Practice. Improve.
            </span>

            <Link
              href="/#top"
              aria-label="Back to top"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 transition-all hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-300"
            >
              <FaArrowUp className="text-xs" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
