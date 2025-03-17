"use client";

import { useState } from "react";
import { Attachment } from "@/types/models";
import { useDebounce } from "@/hooks/useDebounce";

import { CreateAttachment } from "./CreateAttachment";
import { AttachmentCard } from "./AttachmentCard";

import { CardDescription } from "@/components/shadcn/ui/card";
import { Input } from "@/components/shadcn/ui/input";
import { FolderOpen } from "lucide-react";

function filterArrayByText(
  items: Attachment[],
  searchText: string
): Attachment[] {
  const lowerCaseSearchText = searchText.toLowerCase();
  return items.filter((item) =>
    item.title.toLowerCase().includes(lowerCaseSearchText)
  );
}

export function AttachmentsList({
  attachments,
  userId,
}: {
  attachments: Attachment[] | [];
  userId: string;
}) {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  const filteredAttachments = filterArrayByText(
    attachments,
    debouncedSearchText
  );

  return (
    <>
      <section className="flex">
        <article className="w-1/2">
          <Input
            placeholder="Buscar..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </article>
        <article className="w-1/2 flex justify-end">
          <CreateAttachment userId={userId} />
        </article>
      </section>

      <section className="mt-4 flex justify-center sm:justify-start flex-wrap gap-4">
        {attachments.length === 0 ? (
          <CardDescription className="text-lg w-full">
            <p className="flex justify-center flex-col items-center">
              <FolderOpen className="w-20 h-20" />
              Aun no tienes recursos.
            </p>
          </CardDescription>
        ) : (
          filteredAttachments.map((attachment) => (
            <AttachmentCard
              key={attachment.id}
              attachment={attachment}
              userId={userId}
            />
          ))
        )}
      </section>
    </>
  );
}
