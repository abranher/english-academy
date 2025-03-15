"use client";

import { useParams, useRouter } from "next/navigation";

import { Lesson } from "@/types/models";
import { LessonType } from "@/types/enums";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";

import { ClipboardList, FileVideo, Pencil } from "lucide-react";

export function ChapterLessonsList({
  items,
  onReorder,
}: {
  items: Lesson[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
}) {
  const [lessons, setLessons] = useState(items);

  const router = useRouter();
  const { courseId, chapterId } = useParams();

  useEffect(() => {
    setLessons(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    // Copia del array de lecciones
    const updatedLessons = Array.from(lessons);

    // Extrae y reinserta la lección movida
    const [movedLesson] = updatedLessons.splice(result.source.index, 1);
    updatedLessons.splice(result.destination.index, 0, movedLesson);

    // Actualiza el estado local
    setLessons(updatedLessons);

    // Prepara los datos para el reordenamiento
    const bulkUpdateData = updatedLessons.map((lesson, index) => ({
      id: lesson.id,
      position: index,
    }));

    // Llama a la función onReorder con los datos actualizados
    onReorder(bulkUpdateData);
  };

  const onEdit = (lesson: Lesson) => {
    if (lesson.type === LessonType.CLASS) {
      router.push(
        `/tutor/courses/${courseId}/chapters/${chapterId}/lessons/${lesson.id}/class/${lesson.class?.id}`
      );
    } else if (lesson.type === LessonType.QUIZ) {
      router.push(
        `/tutor/courses/${courseId}/chapters/${chapterId}/lessons/${lesson.id}/quiz/${lesson.quiz?.id}`
      );
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="lessons">
          {(provided) => (
            <section {...provided.droppableProps} ref={provided.innerRef}>
              {lessons.map((lesson, index) => (
                <Draggable
                  key={lesson.id}
                  draggableId={lesson.id}
                  index={index}
                >
                  {(provided) => (
                    <section
                      className="flex items-center gap-x-2 border rounded-md mb-4 text-sm bg-green-100 border-green-200 text-green-700"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      {/* Ícono de agarre */}
                      <article
                        className="px-2 py-3 border-r rounded-l-md transition border-r-green-200 hover:bg-green-200"
                        {...provided.dragHandleProps}
                      >
                        {lesson.type === LessonType.CLASS && (
                          <FileVideo className="h-5 w-5" />
                        )}

                        {lesson.type === LessonType.QUIZ && (
                          <ClipboardList className="h-5 w-5" />
                        )}
                      </article>

                      {lesson.type === LessonType.CLASS && (
                        <h3 className="font-bold">
                          Clase: {lesson.class?.title ?? "N/A"}
                        </h3>
                      )}
                      {lesson.type === LessonType.QUIZ && (
                        <h3 className="font-bold">
                          Quiz: {lesson.quiz?.title ?? "N/A"}
                        </h3>
                      )}

                      {/* Ícono de edición */}
                      <article className="ml-auto p-4 flex items-center gap-x-4">
                        <Pencil
                          onClick={() => onEdit(lesson)}
                          className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                        />
                      </article>
                    </section>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </section>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
