"use client";

import { Attachment, ClassAttachment } from "@/types/models";
import { truncateString } from "@/libs/format";
import { assetAttachments } from "@/libs/asset";

import { DeleteAttachment } from "./DeleteAttachment";

import { Card, CardDescription } from "@/components/shadcn/ui/card";
import { ImageIcon, FileIcon, X } from "lucide-react";

export function AttachmentCard({
  classAttachment,
}: {
  classAttachment: ClassAttachment & { attachment: Attachment };
}) {
  const getFileExtension = (url: string) => {
    return url.split(".").pop()?.toLowerCase();
  };

  const fileExtension = getFileExtension(classAttachment.attachment.url);

  const isImage =
    fileExtension === "png" ||
    fileExtension === "jpg" ||
    fileExtension === "jpeg";

  return (
    <>
      <Card className="p-2 flex justify-between items-center gap-1 w-full">
        <a
          href={assetAttachments(classAttachment.attachment.url)}
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
              {truncateString(classAttachment.attachment.title, "lg")}
            </CardDescription>
          </section>
        </a>

        <DeleteAttachment
          classAttachmentId={classAttachment.id}
          attachment={classAttachment.attachment}
        />
      </Card>
    </>
  );
}
