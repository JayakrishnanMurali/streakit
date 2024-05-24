import React from "react";
import { StreakGraph } from "./streak-graph";
import { StreakAnalysis } from "./streak-analysis";

export const Streak = () => {
  return (
    <div className="flex flex-col gap-4 p-10">
      <StreakGraph />
      <StreakAnalysis />
    </div>
  );
};
