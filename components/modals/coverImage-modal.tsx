"use client";

import { useState } from "react";
import { SingleImageDropzone } from "../file-upload";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { useModalStore } from "@/hooks/use-modal-store";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

export const CoverImageModal = () => {
  const coverImage = useModalStore();
  const open = coverImage.isOpen && coverImage.type === "coverImage";
  const { edgestore } = useEdgeStore();
  const params = useParams();
  const update = useMutation(api.documents.updateDocument);
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImage?.url,
        },
      });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });
      onClose();
    }
  };

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };
  return (
    <Dialog open={open} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center font-semibold text-lg">Cover Image</h2>
        </DialogHeader>
        <div>
          <SingleImageDropzone
            className="w-full outline-none "
            disabled={isSubmitting}
            value={file}
            onChange={onChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
