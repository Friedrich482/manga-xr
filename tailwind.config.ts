import { withUt } from "uploadthing/tw";

export default withUt({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "default-white": "rgb(247, 247, 247)",
        "default-black": "rgb(15,15, 15)",
        primary: "rgb(185, 28, 28)", // text-red-700
      },
      screens: {
        "large-nav": "860px",
        "small-nav": "620px",
        "very-small-nav": "510px",
        "chapters-breakpoint": "370px",
        "options-menu-breakpoint-1": "385px",
        "options-menu-breakpoint-2": "520px",
      },
    },
  },
  darkMode: "class",
  plugins: [],
});
