"use client";

import { Attachment } from "@/types/models";
import { truncateString } from "@/libs/format";
import { assetAttachments } from "@/libs/asset";

import { DeleteAttachment } from "./DeleteAttachment";

import { Card, CardDescription } from "@/components/shadcn/ui/card";
import { ImageIcon, FileIcon } from "lucide-react";

export function AttachmentCard({
  attachment,
  userId,
}: {
  attachment: Attachment;
  userId: string;
}) {
  const getFileExtension = (url: string) => {
    return url.split(".").pop()?.toLowerCase();
  };

  const fileExtension = getFileExtension(attachment.url);

  const isImage =
    fileExtension === "png" ||
    fileExtension === "jpg" ||
    fileExtension === "jpeg";

  return (
    <Card className="p-2 w-60 flex justify-between items-center gap-1">
      <a
        href={assetAttachments(attachment.url)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <section className="flex items-center gap-2 justify-between">
          {isImage ? (
            <ImageIcon className="text-gray-500" />
          ) : (
            <FileIcon className="text-gray-500" />
          )}
          <CardDescription>{truncateString(attachment.title)}</CardDescription>
        </section>
      </a>

      <DeleteAttachment attachment={attachment} userId={userId} />
    </Card>
  );
}
