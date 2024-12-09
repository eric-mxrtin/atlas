import React from "react";
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-urbanist",
});

const Logo = () => {
  return (
    <div className="inline-flex flex-wrap">
      <a
        href="http://ericm.ca/"
        target="_blank"
        className={`${urbanist.variable} inline-flex font-urbanist font-medium gap-3 text-4xl md:px-4 px-2 items-center py-2 bg-zinc-900 rounded-md hover:bg-zinc-200 hover:text-zinc-700 duration-150`}
      >
        <div className="relative w-6 h-6 rounded-full bg-gradient-to-r from-blue-300 to-blue-600">
          <div className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400"></div>
        </div>{" "}
        <p>
          atlas
        </p>
      </a>
    </div>
  );
};

export default Logo;
