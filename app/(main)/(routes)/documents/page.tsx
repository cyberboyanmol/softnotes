"use client";
import Image from "next/image";
import React from "react";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const DocumentPage = () => {
  const { user } = useUser();

  const create = useMutation(api.documents.create);

  const onCreateDocument = () => {
    const promise = create({
      title: "Untitled",
    });
    toast.promise(promise, {
      loading: "Creating a new Note",
      success: "New Note Created",
      error: "Failed to create new Note.",
    });
  };
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src={"/empty.png"}
        height={300}
        width={300}
        className="dark:hidden"
        alt="empty_image"
      />
      <Image
        src={"/empty-dark.png"}
        height={300}
        width={300}
        className="hidden dark:block"
        alt="empty_image"
      />
      <h2 className="text-lg font-medium ">
        {" "}
        Welcome to {user?.firstName}&apos;s SoftNotes
      </h2>
      <Button onClick={onCreateDocument}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentPage;
