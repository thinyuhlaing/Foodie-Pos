import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        light: {
          bg: "#FCFAF6",
          text: "#060709",
          color: "#F3EEE7",
          cancleB: "#FCE2B5",
          createB: "#6ABE46",
        },
        dark: {
          bg: "#FCFAF6",
          text: "#060709",
          color: "#F3EEE7",
          cancleB: "#FCE2B5",
          createB: "#6ABE46",
        },
      },
    },
  },
  plugins: [],
};
export default config;
/* bg-[#FBF6EE] text-[#060709]  cancleB-bg-[#FCE2B5]  createB-bg-[#6ABE46]*/
