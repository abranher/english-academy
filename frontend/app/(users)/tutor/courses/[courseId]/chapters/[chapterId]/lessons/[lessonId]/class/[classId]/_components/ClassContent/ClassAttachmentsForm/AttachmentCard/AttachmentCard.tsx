"use client";

import { Attachment } from "@/types/models";
import { truncateString } from "@/libs/format";
import { assetAttachments } from "@/libs/asset";

import { Card, CardDescription } from "@/components/shadcn/ui/card";
import { ImageIcon, FileIcon, X } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";

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
    <>
      <Card className="p-2 flex justify-between items-center gap-1 w-full">
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
            <CardDescription>
              {truncateString(attachment.title, "lg")}
            </CardDescription>
          </section>
        </a>

        <Button size="sm" variant="outline">
          <X className="h-4 w-4" />
        </Button>
      </Card>
    </>
  );
}
