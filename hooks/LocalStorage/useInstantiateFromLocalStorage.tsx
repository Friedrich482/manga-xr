import { useEffect, useState } from "react";
import useStore from "../store";
import {
  chapterPagesDispositionSchema,
  gapOptionNameSchema,
  progressBarDirectionSchema,
  readingDirectionSchema,
} from "@/zod-schema/schema";
import getInitialStateOnCustomTypes from "@/utils/store-utils/getInitialStateOnCustomTypes";
import getInitialStateOnBoolean from "@/utils/store-utils/getInitialStateOnBoolean";
import { z } from "zod";
import { gapOptions } from "@/lib/constants";

const useInstantiateFromLocalStorage = () => {
  const {
    setProgressBarDirection,
    setProgressBarVisibility,
    setChapterPagesDisposition,
    setReadingDirection,
    setGapOption,
  } = useStore((state) => ({
    setProgressBarDirection: state.setProgressBarDirection,
    setProgressBarVisibility: state.setProgressBarVisibility,
    setChapterPagesDisposition: state.setChapterPagesDisposition,
    setReadingDirection: state.setReadingDirection,
    setGapOption: state.setGapOption,
  }));
  const [isInitialized, setIsInitialized] = useState(false);
  const initialGapName = getInitialStateOnCustomTypes(
    gapOptionNameSchema,
    "gapOptionName",
    "No gap",
  );
  //   get the initial state coming from the local storage in a useEffect to avoid hydration errors
  useEffect(() => {
    setProgressBarDirection(
      getInitialStateOnCustomTypes(
        progressBarDirectionSchema,
        "progressBarDirection",
        "Horizontal",
      ),
    );

    setProgressBarVisibility(
      getInitialStateOnBoolean(z.boolean(), "progressBarVisibility", true),
    );

    setChapterPagesDisposition(
      getInitialStateOnCustomTypes(
        chapterPagesDispositionSchema,
        "chapterPagesDisposition",
        "Long Strip",
      ),
    );
    setReadingDirection(
      getInitialStateOnCustomTypes(
        readingDirectionSchema,
        "readingDirection",
        "From left to right",
      ),
    );
    setGapOption({
      name: initialGapName,
      value: gapOptions.filter((option) => option.name === initialGapName)[0]
        .value,
    });
    setIsInitialized(true);
  }, []);
  return isInitialized;
};

export default useInstantiateFromLocalStorage;
