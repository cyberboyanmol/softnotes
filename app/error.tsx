"use client";

import Image from "next/image";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const Error = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src={"/error.png"}
        alt="error"
        className="dark:hidden"
        height={"300"}
        width={"300"}
      />
      <Image
        src={"/error-dark.png"}
        alt="error"
        className="hidden dark:block"
        height={"300"}
        width={"300"}
      />
      <h2> SomeThing Went Wrong!!</h2>
      <Button asChild>
        <Link href={"/"}>Go Back</Link>
      </Button>
    </div>
  );
};

export default Error;
