"use client";
import { SYNOPSIS_LENGTH } from "@/lib/constants";
import { useState } from "react";

const Synopsis = ({ synopsis }: { synopsis: string }) => {
  const [showAll, setShowAll] = useState(false);
  return (
    <p className="text-lg first-letter:text-7xl first-letter:text-primary">
      {synopsis.length >= SYNOPSIS_LENGTH ? (
        <>
          {showAll ? synopsis : synopsis.slice(0, SYNOPSIS_LENGTH) + "..."}
          <button
            className="pl-2 hover:text-primary hover:underline"
            onClick={() => {
              setShowAll((prev) => !prev);
            }}
          >
            {showAll ? "Show less" : "Show more"}
          </button>
        </>
      ) : (
        synopsis
      )}
    </p>
  );
};
export default Synopsis;
