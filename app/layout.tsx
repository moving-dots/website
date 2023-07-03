import "./globals.css";
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
      <body className={workSans.className}>{children}</body>
    </html>
  );
}
