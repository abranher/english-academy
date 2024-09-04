"use client";

import { Chapter } from "@/types/models/Chapter";

interface ChaptersListProps {
  items: Chapter[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export default function ChaptersList({
  items,
  onEdit,
  onReorder,
}: ChaptersListProps) {
  return <div>ChaptersList</div>;
}
