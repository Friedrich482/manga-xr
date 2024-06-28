"use client";
import { useState } from "react";

const Synopsys = ({ synopsys }: { synopsys: string }) => {
  const [showAll, setShowAll] = useState(false);
  return (
    <p className="text-lg first-letter:text-7xl first-letter:text-orange-500">
      {synopsys.length >= 621 ? (
        <>
          {showAll ? synopsys : synopsys.slice(0, 621) + "..."}
          <button
            className="pl-2 hover:text-orange-500 hover:underline"
            onClick={() => {
              setShowAll((prev) => !prev);
            }}
          >
            {showAll ? "Show less" : "Show more"}
          </button>
        </>
      ) : (
        synopsys
      )}
    </p>
  );
};
export default Synopsys;
