import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useModalStore } from "@/hooks/use-modal-store";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "./ui/skeleton";

interface CoverImageProps {
  url?: string;
  preview?: string;
}

const CoverImage = ({ url, preview }: CoverImageProps) => {
  const { edgestore } = useEdgeStore();
  const coverImage = useModalStore();
  const params = useParams();
  const remove = useMutation(api.documents.removeCoverImage);

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({ url: url as string });
    }
    const promise = remove({
      id: params.documentId as Id<"documents">,
    });
    toast.promise(promise, {
      loading: "Removing cover image..",
      success: "Cover image remove successfully!",
      error: "Failed to remove cover image..",
    });
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && (
        <Image src={url} alt="coverImage" fill className="object-cover" />
      )}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => coverImage.onReplace(url, "coverImage")}
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change Cover
          </Button>
          <Button
            onClick={onRemove}
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
          >
            <X className="h-4 w-4 mr-2" />
            Remove Cover
          </Button>
        </div>
      )}
    </div>
  );
};

export default CoverImage;

CoverImage.Skeleton = function CoverImageSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};
