"use client";

import { Attachment } from "@/types/models";
import { truncateString } from "@/libs/format";

import { Card, CardDescription } from "@/components/shadcn/ui/card";
import { ImageIcon } from "lucide-react";
import { DeleteAttachment } from "./DeleteAttachment";

export function AttachmentCard({
  attachment,
  userId,
}: {
  attachment: Attachment;
  userId: string;
}) {
  return (
    <>
      <Card className="p-2 w-60 flex flex-col items-center gap-2">
        <section className="p-1 flex justify-between items-center gap-1 w-full">
          <section className="flex items-center gap-2 justify-between">
            <ImageIcon className="text-gray-500" />
            <CardDescription>
              {truncateString(attachment.title)}
            </CardDescription>
          </section>

          <DeleteAttachment attachment={attachment} userId={userId} />
        </section>
      </Card>
    </>
  );
}
