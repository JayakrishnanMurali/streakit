import React from "react";
import { format } from "date-fns";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between border-b py-4">
      <h1 className="font-bold">Streak</h1>

      <div className="text-sm font-bold">
        {format(new Date(), "EEEE, dd MMM yyyy")}
      </div>
    </div>
  );
};
