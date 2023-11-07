"use client";

import { use, useEffect, useState } from "react";
import { File, FileIcon } from "lucide-react";
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
import { useModalStore } from "@/hooks/use-modal-store";
import { api } from "@/convex/_generated/api";

export const SearchCommand = () => {
  const { user } = useUser();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const documents = useQuery(api.documents.getSearch);
  const { toggle, isOpen, onClose, onOpen, type } = useModalStore();

  const openSearch = isOpen && type === "search";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle("search");
      }
    };

    document.addEventListener("keydown", down);
    return () => {
      document.removeEventListener("keydown", down);
    };
  }, [toggle]);

  const onSelect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
    onClose();
  };
  if (!isMounted) {
    return null;
  }
  return (
    <CommandDialog open={openSearch} onOpenChange={onClose}>
      <CommandInput placeholder={`Search ${user?.fullName}'s`} />
      <CommandList>
        <CommandEmpty> No results found.</CommandEmpty>
        <CommandGroup heading="Documents">
          {documents?.map((doc) => (
            <CommandItem
              key={doc._id}
              value={`${doc._id}-${doc.title}`}
              onSelect={onSelect}
              title={doc.title}
            >
              {doc.icon ? (
                <p className="mr-2 text-[18px]">{doc.icon}</p>
              ) : (
                <FileIcon className="mr-2 h-4 w-4" />
              )}
              <span>{doc.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
