import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TMUA Interactive Review | AceAdmissions",
  description: "Step-by-step interactive walkthroughs for TMUA mathematics questions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
