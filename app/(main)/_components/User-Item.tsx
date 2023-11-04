"use client";
import React from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronsLeftRight } from "lucide-react";
import { SignOutButton, useUser } from "@clerk/clerk-react";
const UserItem = () => {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
        >
          <div className="gap-x-2 flex items-center max-w-[150px]">
            <Avatar className="w-5 h-5">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <span className="text-start font-medium  line-clamp-1">
              {user?.fullName}&apos;s SoftNotes
            </span>
          </div>
          <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-muted-foreground text-xs font-medium leading-none">
            {user?.emailAddresses[0].emailAddress}
          </p>
          <div className="flex items-center gap-x-2  ">
            <div className="rounded-full bg-secondary ">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
            </div>
            <div className="space-y-1 ">
              <p className="text-sm line-clamp-1">{user?.fullName}</p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="w-full text-muted-foreground cursor-pointer "
        >
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItem;
