"use client";
import { useStreak } from "@/hooks/useStreak";
import { format } from "date-fns";
import React from "react";

export const StreakAnalysis = () => {
  const { currentStreak, maxStreak, nextStreakDate } = useStreak();

  return (
    <div className="py-10 text-xl">
      <h1 className="mb-4 font-bold">Stats:</h1>

      <p className="mb-2">
        <span className="inline-block w-36 bg-gray-300">Current streak:</span>{" "}
        <span className="font-bold">{currentStreak} days</span>
      </p>
      <p className="mb-2">
        <span className="inline-block w-36 bg-gray-300">Max streak:</span>{" "}
        <span className="font-bold">{maxStreak} days</span>
      </p>
      {nextStreakDate && (
        <p className="mb-2">
          <span className="inline-block w-36 bg-gray-300">Next streak:</span>{" "}
          <span className="font-bold">
            {format(nextStreakDate, "dd MMM yyyy, hh:mm a")}
          </span>
        </p>
      )}
    </div>
  );
};
