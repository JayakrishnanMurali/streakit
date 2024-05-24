"use client";
import { useStreak } from "@/hooks/useStreak";
import React from "react";

export const StreakGraph = () => {
  const { currentStreak } = useStreak();

  const graph = new Array(600).fill(0);

  return (
    <div className="flex flex-1 justify-center">
      <div className="grid grid-cols-10 gap-1 sm:grid-cols-20 lg:grid-cols-40">
        {graph.map((_, index) => (
          <div
            key={index}
            className={`h-4 w-4 rounded ${index < currentStreak ? "bg-green-500" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
};
