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
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={workSans.className}>
        {children}
        {modal}
      </body>
      <Analytics />
    </html>
  );
}
