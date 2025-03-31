import localFont from "next/font/local";

export const IRANSansX = localFont({
    src: [
      {
        path: "../assets/fonts/IRANSansX-Regular.woff",
        weight: "400",
        style: "normal"
      },
      {
        path: "../assets/fonts/IRANSansX-Bold.woff",
        weight: "700",
        style: "normal"
      }
    ],
    variable: "--font-IRANSansX"
  });