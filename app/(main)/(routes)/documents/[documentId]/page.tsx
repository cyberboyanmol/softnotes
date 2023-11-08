"use client";
import { useParams } from "next/navigation";
import React from "react";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { Toolbar } from "@/components/toolbar";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentPage = ({ params }: DocumentIdPageProps) => {
  const document = useQuery(api.documents.getDocumentById, {
    documentId: params.documentId,
  });

  if (document === undefined) {
    return <>loading...</>;
  }

  if (document === null) {
    return <>Not found</>;
  }

  return (
    <div className="pb-40">
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto ">
        <Toolbar />
      </div>
    </div>
  );
};

export default DocumentPage;
