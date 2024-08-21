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
import useUserPreferences from "../Auth/useUserPreferences";
import getGapOptionValue from "@/utils/store-utils/getGapOptionValue";

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
  const initialGapNameFromLocalStorage = getInitialStateOnCustomTypes(
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
        name: initialGapNameFromLocalStorage,
        value: getGapOptionValue(initialGapNameFromLocalStorage),
      });
    }
    setIsInitialized(true);
  }, [preferences?.chapterPagesDisposition]);

  return isInitialized;
};

export default useInstantiatePreferences;
