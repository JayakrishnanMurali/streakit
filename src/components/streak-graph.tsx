import React from "react";

export const StreakGraph = () => {
  const data = new Array(600).fill(0);

  return (
    <div className="flex flex-1 justify-center">
      <div className="grid grid-cols-10 gap-1 sm:grid-cols-20   lg:grid-cols-40">
        {data.map((_, index) => (
          <div key={index} className={`h-4 w-4 rounded bg-green-500`} />
        ))}
      </div>
    </div>
  );
};
