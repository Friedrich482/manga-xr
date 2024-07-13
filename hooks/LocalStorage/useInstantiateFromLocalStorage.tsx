import { useEffect, useState } from "react";
import useStore from "../store";
import {
  chapterPagesDispositionSchema,
  progressBarDirectionSchema,
  readingDirectionSchema,
} from "@/zod-schema/schema";
import getInitialStateOnCustomTypes from "@/utils/store-utils/getInitialStateOnCustomTypes";
import getInitialStateOnBoolean from "@/utils/store-utils/getInitialStateOnBoolean";
import { z } from "zod";

const useInstantiateFromLocalStorage = () => {
  const {
    setProgressBarDirection,
    setProgressBarVisibility,
    setChapterPagesDisposition,
    setReadingDirection,
  } = useStore((state) => ({
    setProgressBarDirection: state.setProgressBarDirection,
    setProgressBarVisibility: state.setProgressBarVisibility,
    setChapterPagesDisposition: state.setChapterPagesDisposition,
    setReadingDirection: state.setReadingDirection,
  }));
  const [isInitialized, setIsInitialized] = useState(false);
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
    setIsInitialized(true);
  }, []);
  return isInitialized;
};

export default useInstantiateFromLocalStorage;
