"use client";
import useStore from "@/hooks/store";
import HorizontalProgressBar from "./HorizontalProgressBar";
import VerticalProgressBar from "./VerticalProgressBar";

const ProgressBar = ({ images }: { images: string[] }) => {
  const { progressBarVisibility, progressBarDirection } = useStore((state) => ({
    isVisibleImagesArray: state.isVisibleImagesArray,
    progressBarVisibility: state.progressBarVisibility,
    setProgressBarVisibility: state.setProgressBarVisibility,
    progressBarDirection: state.progressBarDirection,
  }));
  return progressBarDirection === "Horizontal" ? (
    <HorizontalProgressBar images={images} />
  ) : (
    <VerticalProgressBar images={images} />
  );
};
export default ProgressBar;
