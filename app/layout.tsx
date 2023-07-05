import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Work_Sans } from "next/font/google";

const workSans = Work_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Moving Dots",
  description: "Moving dots on the internet.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={workSans.className}>{children}</body>
      <Analytics />
    </html>
  );
}
