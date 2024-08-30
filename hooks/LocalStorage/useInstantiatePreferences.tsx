import { useEffect, useState } from "react";
import useStore from "../store";
import {
  chapterPagesDispositionSchema,
  gapOptionNameSchema,
  progressBarDirectionSchema,
  readingDirectionSchema,
} from "@/zod-schema/schema";
import { z } from "zod";
import useUserPreferences from "../Auth/useUserPreferences";
import getGapOptionValue from "@/utils/store-utils/getGapOptionValue";
import getInitialState from "@/utils/store-utils/getInitialState";

const useInstantiatePreferences = () => {
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
  const initialGapNameFromLocalStorage = getInitialState(
    gapOptionNameSchema,
    "gapOptionName",
    "No gap",
  );
  const { preferences } = useUserPreferences();
  //   get the initial state coming from the local storage in a useEffect to avoid hydration errors
  useEffect(() => {
    if (preferences) {
      const {
        progressBarDirection,
        progressBarVisibility,
        chapterPagesDisposition,
        readingDirection,
        gapOptionName: name,
      } = preferences;
      setProgressBarDirection(progressBarDirection);
      setProgressBarVisibility(progressBarVisibility);
      setChapterPagesDisposition(chapterPagesDisposition);
      setReadingDirection(readingDirection);
      setGapOption({
        name,
        value: getGapOptionValue(name),
      });
    } else {
      setProgressBarDirection(
        getInitialState(
          progressBarDirectionSchema,
          "progressBarDirection",
          "Horizontal",
        ),
      );

      setProgressBarVisibility(
        getInitialState(z.boolean(), "progressBarVisibility", true),
      );

      setChapterPagesDisposition(
        getInitialState(
          chapterPagesDispositionSchema,
          "chapterPagesDisposition",
          "Long Strip",
        ),
      );
      setReadingDirection(
        getInitialState(
          readingDirectionSchema,
          "readingDirection",
          "From left to right",
        ),
      );
      setGapOption({
        name: initialGapNameFromLocalStorage,
        value: getGapOptionValue(initialGapNameFromLocalStorage),
      });
    }
    setIsInitialized(true);
  }, [preferences?.chapterPagesDisposition]);

  return isInitialized;
};

export default useInstantiatePreferences;
