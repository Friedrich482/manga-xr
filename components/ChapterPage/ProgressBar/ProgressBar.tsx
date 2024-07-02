"use client";
import useStore from "@/hooks/store";
import HorizontalProgressBar from "./HorizontalProgressBar";
import VerticalProgressBar from "./VerticalProgressBar";

const ProgressBar = ({ images }: { images: string[] }) => {
  const { progressBarDirection } = useStore((state) => ({
    progressBarDirection: state.progressBarDirection,
  }));
  return progressBarDirection === "Horizontal" ? (
    <HorizontalProgressBar images={images} />
  ) : (
    <VerticalProgressBar images={images} />
  );
};
export default ProgressBar;
