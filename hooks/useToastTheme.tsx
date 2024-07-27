import { useTheme } from "next-themes";

const useToastTheme = () => {
  const { resolvedTheme } = useTheme();
  const toastOptions = {
    style:
      resolvedTheme === "light"
        ? {
            background: "#000000",
            color: "#ffffff",
          }
        : {},
  };

  return toastOptions;
};
export default useToastTheme;
