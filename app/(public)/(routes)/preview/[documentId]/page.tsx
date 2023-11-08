"use client";
import { useParams } from "next/navigation";
import React, { useMemo } from "react";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { Toolbar } from "@/components/toolbar";
import CoverImage from "@/components/cover-image";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const PreviewDocumentPage = ({ params }: DocumentIdPageProps) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );
  const document = useQuery(api.documents.getDocumentById, {
    documentId: params.documentId,
  });

  const update = useMutation(api.documents.updateDocument);

  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content,
    });
  };
  if (document === undefined) {
    return (
      <div>
        <CoverImage.Skeleton />
        <div className=" md:max-w-3xl lg:max-w-4xl mx-auto mt-10 ">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-14 w-[50%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <>Not found</>;
  }

  return (
    <div className="pb-40 min-h-full dark:bg-[#1F1F1F]  ">
      <CoverImage preview url={document.coverImage} />
      <div className="md:max-w-3xl  lg:max-w-4xl mx-auto ">
        <Toolbar preview initialData={document} />
        <Editor
          onChange={onChange}
          editable={false}
          initialContent={document.content}
        />
      </div>
    </div>
  );
};

export default PreviewDocumentPage;
