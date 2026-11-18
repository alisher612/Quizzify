
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const PointsContext = createContext(null);

const STORAGE_KEY = "quizzify_user_progress";

const DEFAULT_PROGRESS = {
  points: 0,
  quizHistory: [],
};

const getToday = () => {
  return new Date().toISOString().split("T")[0];
};

const calculateStreak = (history) => {
  if (!history.length) return 0;

  const completedDates = [
    ...new Set(
      history.map((quiz) => quiz.date).filter(Boolean)
    ),
  ].sort((a, b) => b.localeCompare(a));

  if (!completedDates.length) return 0;

  const today = new Date();
  const todayString = getToday();

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const yesterdayString = yesterday.toISOString().split("T")[0];

  // A streak remains active if the last quiz was today or yesterday.
  if (
    completedDates[0] !== todayString &&
    completedDates[0] !== yesterdayString
  ) {
    return 0;
  }

  let streak = 0;
  const expectedDate = new Date(`${completedDates[0]}T00:00:00`);

  for (const date of completedDates) {
    const expectedString = expectedDate.toISOString().split("T")[0];

    if (date !== expectedString) break;

    streak++;

    expectedDate.setDate(expectedDate.getDate() - 1);
  }

  return streak;
};

export const PointsProvider = ({ children }) => {
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Restore progress from LocalStorage.
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEY);

      if (savedProgress) {
        const parsedProgress = JSON.parse(savedProgress);

        setProgress({
          points:
            typeof parsedProgress.points === "number"
              ? parsedProgress.points
              : 0,

          quizHistory: Array.isArray(parsedProgress.quizHistory)
            ? parsedProgress.quizHistory
            : [],
        });
      }
    } catch (error) {
      console.error("Failed to restore Quizzify progress:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Persist progress whenever it changes.
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(progress)
      );
    } catch (error) {
      console.error("Failed to save Quizzify progress:", error);
    }
  }, [progress, isLoaded]);

  // Backward-compatible points interface.
  const setPoints = useCallback((value) => {
    setProgress((previous) => {
      const nextPoints =
        typeof value === "function"
          ? value(previous.points)
          : value;

      return {
        ...previous,
        points: Math.max(0, Number(nextPoints) || 0),
      };
    });
  }, []);

  // Record a completed quiz.
  const addQuizResult = useCallback((result) => {
    const quizRecord = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`,

      subject: result.subject || "Unknown",
      mode: result.mode || "practice",
      score: Number(result.score) || 0,
      totalQuestions: Number(result.totalQuestions) || 0,
      correctAnswers: Number(result.correctAnswers) || 0,
      wrongAnswers: Number(result.wrongAnswers) || 0,
      unattemptedQuestions: Number(result.unattemptedQuestions) || 0,
      percentage: Number(result.percentage) || 0,
      timeSpent: Number(result.timeSpent) || 0,
      date: getToday(),
      completedAt: new Date().toISOString(),
    };

    setProgress((previous) => ({
      ...previous,
      quizHistory: [
        quizRecord,
        ...previous.quizHistory,
      ],
    }));

    return quizRecord;
  }, []);

  const clearProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
  }, []);

  const statistics = useMemo(() => {
    const history = progress.quizHistory;

    const totalQuizzes = history.length;

    const averageAccuracy =
      totalQuizzes > 0
        ? Math.round(
            history.reduce(
              (total, quiz) => total + quiz.percentage,
              0
            ) / totalQuizzes
          )
        : 0;

    const bestScore =
      totalQuizzes > 0
        ? Math.max(...history.map((quiz) => quiz.score))
        : 0;

    const streak = calculateStreak(history);

    return {
      totalQuizzes,
      averageAccuracy,
      bestScore,
      streak,
    };
  }, [progress.quizHistory]);

  const achievements = useMemo(() => {
    const history = progress.quizHistory;
    const totalQuizzes = history.length;

    const bestAccuracy =
      totalQuizzes > 0
        ? Math.max(...history.map((quiz) => quiz.percentage))
        : 0;

    return [
      {
        id: "first-quiz",
        title: "First Steps",
        description: "Complete your first quiz.",
        unlocked: totalQuizzes >= 1,
      },
      {
        id: "quiz-explorer",
        title: "Quiz Explorer",
        description: "Complete 5 quizzes.",
        unlocked: totalQuizzes >= 5,
      },
      {
        id: "quiz-master",
        title: "Quiz Master",
        description: "Complete 20 quizzes.",
        unlocked: totalQuizzes >= 20,
      },
      {
        id: "high-achiever",
        title: "High Achiever",
        description: "Score at least 80% in a quiz.",
        unlocked: bestAccuracy >= 80,
      },
      {
        id: "perfect-score",
        title: "Perfect Score",
        description: "Achieve 100% accuracy.",
        unlocked: bestAccuracy === 100,
      },
      {
        id: "xp-collector",
        title: "XP Collector",
        description: "Earn 100 XP.",
        unlocked: progress.points >= 100,
      },
    ];
  }, [progress.quizHistory, progress.points]);

  const value = {
    points: progress.points,
    setPoints,
    quizHistory: progress.quizHistory,
    addQuizResult,
    clearProgress,
    statistics,
    achievements,
    isLoaded,
  };

  return (
    <PointsContext.Provider value={value}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => {
  const context = useContext(PointsContext);

  if (!context) {
    throw new Error(
      "usePoints must be used inside PointsProvider."
    );
  }

  return context;
};
