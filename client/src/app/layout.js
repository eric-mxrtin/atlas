import localFont from "next/font/local";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import { Urbanist } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans",
});

export const metadata = {
  title: "atlas - eric martin",
  description: "view availability of uoft campus locations. made by eric martin.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} font-sans`}
        src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/ping.js"
      >
        {children}
      </body>
    </html>
  );
}
