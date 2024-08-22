import { ToastThemeType } from "@/zod-schema/schema";
import { useTheme } from "next-themes";

const useToastTheme = (duration?: number): ToastThemeType => {
  const { resolvedTheme } = useTheme();
  const toastOptions = {
    style:
      resolvedTheme === "light"
        ? {
            background: "rgb(15,15, 15)",
            color: "#ffffff",
          }
        : {
            background: "rgb(247, 247, 247)",
            color: "#000000",
          },
    duration,
  };

  return toastOptions;
};
export default useToastTheme;
