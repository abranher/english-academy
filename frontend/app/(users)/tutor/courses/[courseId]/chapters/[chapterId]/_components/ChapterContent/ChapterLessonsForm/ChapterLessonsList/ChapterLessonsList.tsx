"use client";

import { useEffect, useState } from "react";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { ClipboardList, FileVideo, Pencil } from "lucide-react";
import { Lesson } from "@/types/models/Lesson";
import { LessonType } from "@/types/enums";
import { useParams, useRouter } from "next/navigation";

interface LessonsListProps {
  items: Lesson[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
}

export function ChapterLessonsList({ items, onReorder }: LessonsListProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [lessons, setLessons] = useState(items);

  const router = useRouter();
  const { courseId, chapterId } = useParams();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setLessons(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(lessons);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedLessons = items.slice(startIndex, endIndex + 1);

    setLessons(items);

    const bulkUpdateData = updatedLessons.map((lesson) => ({
      id: lesson.id,
      position: items.findIndex((item) => item.id === lesson.id),
    }));

    onReorder(bulkUpdateData);
  };

  const onEdit = (id: string, lessonType: string, lesson: Lesson) => {
    if (lessonType === LessonType.CLASS) {
      router.push(
        `/tutor/courses/${courseId}/chapters/${chapterId}/lessons/${id}/class`
      );
    } else if (lessonType === LessonType.QUIZ) {
      router.push(
        `/tutor/courses/${courseId}/chapters/${chapterId}/lessons/${id}/quiz/${lesson.quiz?.id}`
      );
    }
  };

  if (!isMounted) return null;

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="lessons">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {lessons.map((lesson, index) => (
                <Draggable
                  key={lesson.id}
                  draggableId={lesson.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="flex items-center gap-x-2 bg-zinc-200 border-zinc-200 border text-zinc-700 rounded-md mb-4 text-sm"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div
                        className="flex gap-3 px-2 py-3 border-r border-r-zinc-200 hover:bg-zinc-300 rounded-l-md transition"
                        {...provided.dragHandleProps}
                      >
                        {lesson.type === LessonType.CLASS && (
                          <FileVideo className="h-5 w-5" />
                        )}

                        {lesson.type === LessonType.QUIZ && (
                          <ClipboardList className="h-5 w-5" />
                        )}
                      </div>
                      {lesson.type === LessonType.CLASS &&
                        `Clase: ${lesson.class?.title ?? "N/A"}`}
                      {lesson.type === LessonType.QUIZ &&
                        `Quiz: ${lesson.quiz?.title ?? "N/A"}`}

                      <div className="ml-auto p-4 flex items-center gap-x-4">
                        <Pencil
                          onClick={() => onEdit(lesson.id, lesson.type, lesson)}
                          className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
