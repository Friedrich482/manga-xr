"use client";
import { SYNOPSYS_LENGTH } from "@/lib/constants";
import { useState } from "react";

const Synopsys = ({ synopsys }: { synopsys: string }) => {
  const [showAll, setShowAll] = useState(false);
  return (
    <p className="text-lg first-letter:text-7xl first-letter:text-red-700">
      {synopsys.length >= SYNOPSYS_LENGTH ? (
        <>
          {showAll ? synopsys : synopsys.slice(0, SYNOPSYS_LENGTH) + "..."}
          <button
            className="pl-2 hover:text-red-700 hover:underline"
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
