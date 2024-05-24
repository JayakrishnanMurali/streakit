"use client";
import React, { useEffect } from "react";
import { StreakGraph } from "./streak-graph";
import { StreakAnalysis } from "./streak-analysis";
import { useStreak } from "@/hooks/useStreak";
import { Loader2 } from "lucide-react";

export const Streak = () => {
  const { addStreak, isLoading } = useStreak();

  useEffect(() => {
    void addStreak();
  }, [addStreak]);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center gap-2 py-20">
        <Loader2 className="animate-spin" />
        <span className="text-sm font-bold">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-10">
      <StreakGraph />
      <StreakAnalysis />
    </div>
  );
};
