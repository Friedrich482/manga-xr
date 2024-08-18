"use client";
import { SYNOPSYS_LENGTH } from "@/lib/constants";
import { useState } from "react";

const Synopsys = ({ synopsys }: { synopsys: string }) => {
  const [showAll, setShowAll] = useState(false);
  return (
    <p className="first-letter:text-primary text-lg first-letter:text-7xl">
      {synopsys.length >= SYNOPSYS_LENGTH ? (
        <>
          {showAll ? synopsys : synopsys.slice(0, SYNOPSYS_LENGTH) + "..."}
          <button
            className="hover:text-primary pl-2 hover:underline"
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
