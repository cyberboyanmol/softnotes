import React from "react";
import Heading from "./_components/Heading";
import Heroes from "./_components/Heroes";
import Footer from "./_components/footer";

const LandingPage = () => {
  return (
    <div className="min-h-full dark:bg-[#1F1F1F] flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
        <Heroes />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
