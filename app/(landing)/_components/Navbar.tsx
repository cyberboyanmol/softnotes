"use client";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import React from "react";
import Logo from "./logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Loader2Icon } from "lucide-react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();
  console.log(isAuthenticated);

  return (
    <div
      className={cn(
        "bg-background dark:bg-[#1F1F1F] z-50 top-0 flex fixed items-center w-full px-6 py-3  ",
        scrolled && "border-b  shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center  gap-x-2 ">
        {isLoading && (
          <p>
            <Spinner />
          </p>
        )}

        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton
              afterSignInUrl="/documents"
              afterSignUpUrl="/documents"
              mode="modal"
            >
              <Button variant={"ghost"} size={"sm"}>
                Login
              </Button>
            </SignInButton>
            <SignInButton
              afterSignInUrl="/documents"
              afterSignUpUrl="/documents"
              mode="modal"
            >
              <Button size={"sm"}>Get SoftNotes Free</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant={"ghost"} size={"sm"} asChild>
              <Link href={"/documents"}>Enter SoftNotes</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
