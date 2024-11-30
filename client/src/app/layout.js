import localFont from "next/font/local";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import { Urbanist } from "next/font/google";
import Head from "next/head";

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
      <Head>
        <meta name="description" content="A campus navigation tool for students at the University of Toronto." />
        <meta name="keywords" content="Toronto, university, campus, maps, buildings, libraries, mapbox" />
        <meta name="author" content="Eric Martin" />
        <meta property="og:title" content="atlas by eric martin" />
        <meta property="og:description" content="A campus navigation tool for students at the University of Toronto. Discover open buildings and libraries, their nearest subway stations, and their star ratings from Google. Made with Nextjs, React and Mapbox." />
      </Head>
      <body
        className={`${dmSans.variable} font-sans`}
        src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/ping.js"
      >
        {children}
      </body>
    </html>
  );
}
