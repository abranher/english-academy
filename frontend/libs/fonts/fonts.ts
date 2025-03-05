// import { Inter } from "next/font/google";
import localFont from "next/font/local";

// export const fontInter = Inter({ subsets: ["latin"] });

export const fontInter = localFont({
  src: [
    {
      path: "./static/Inter_18pt-Light.ttf",
      weight: "300",
    },
    {
      path: "./static/Inter_18pt-Regular.ttf",
      weight: "400",
    },
    {
      path: "./static/Inter_18pt-Medium.ttf",
      weight: "600",
    },
    {
      path: "./static/Inter_18pt-Bold.ttf",
      weight: "700",
    },
  ],
  display: "swap",
});
