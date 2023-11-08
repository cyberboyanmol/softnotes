import React from "react";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});
const Logo = () => {
  return (
    <div className="hidden  md:flex items-center gap-x-2">
      <Image
        className="dark:hidden"
        alt="logo"
        src={"/logo.svg"}
        width={30}
        height={30}
      />
      <Image
        className="hidden dark:block"
        alt="logo"
        src={"/logo-dark.svg"}
        width={30}
        height={30}
      />
      <p className={cn("font-semibold", font.className)}>SoftNotes</p>
    </div>
  );
};

export default Logo;
