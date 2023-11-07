"use client";

import { useEffect, useState } from "react";
import { File } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import {
  CommandEmpty,
  CommandItem,
  CommandInput,
  CommandGroup,
  CommandDialog,
  CommandList,
} from "@/components/ui/command";
import { useSearchStore } from "@/hooks/use-search";
import { api } from "@/convex/_generated/api";

export const SearchCommand = () => {};
