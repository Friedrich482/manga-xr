import { useEffect } from "react";
import useStore from "../zustand/store";
import { notFound } from "next/navigation";

const usePageFromUrl = (images: string[]) => {
  const { currentPageIndex, setCurrentPageIndex } = useStore((state) => ({
    currentPageIndex: state.currentPageIndex,
    setCurrentPageIndex: state.setCurrentPageIndex,
  }));
  const handleHashChange = () => {
    const pageIdMatch = window.location.hash.match(/#page-(\d+)/);
    if (pageIdMatch && pageIdMatch[1]) {
      const pageId = parseInt(pageIdMatch[1], 10);
      if (pageId > images.length || pageId <= 0) {
        notFound();
      }
      setCurrentPageIndex(pageId - 1);
    }
  };

  useEffect(() => {
    // Subscribe to hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Cleanup subscription on component unmount
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [currentPageIndex]);
};

export default usePageFromUrl;
