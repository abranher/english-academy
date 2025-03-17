"use client";

import { Attachment } from "@/types/models";
import { truncateString } from "@/libs/format";

import { Button } from "@/components/shadcn/ui/button";
import { Card, CardDescription } from "@/components/shadcn/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { ImageIcon, MoreVertical, Trash } from "lucide-react";

export function AttachmentsList({ attachment }: { attachment: Attachment }) {
  return (
    <>
      <Card className="p-2 w-56 flex flex-col items-center gap-2">
        <section className="p-1 flex justify-between items-center gap-2 w-full">
          <section className="flex items-center gap-2 justify-between">
            <ImageIcon className="text-gray-500" />
            <CardDescription>
              {truncateString(attachment.title)}
            </CardDescription>
          </section>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="p-0 h-6" variant="ghost">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Trash className="h-4 w-4 mr-2" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>

        <section className="flex justify-center items-center w-52 aspect-video rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <ImageIcon className="text-gray-500" />
        </section>
      </Card>
    </>
  );
}
