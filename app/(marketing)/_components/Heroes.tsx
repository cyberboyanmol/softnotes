import Image from "next/image";
import React from "react";

const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center">
        <div className=" relative w-[350px] h-[100px] sm:w-[400px] sm:h-[200px] md:w-[800px] md:h-[300px] ">
          <Image
            fill
            className="object-contain dark:hidden"
            alt="heroes_image"
            src="/heroes.webp"
          />
          <Image
            fill
            className="object-contain  hidden dark:block"
            alt="heroes_image"
            src="/heroes-dark.webp"
          />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
