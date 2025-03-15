"use client";

import { Chapter } from "@/types/models/Chapter";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";

export function CourseChaptersList({
  items,
  onEdit,
  onReorder,
}: {
  items: Chapter[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}) {
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    // Copia del array de capítulos
    const updatedChapters = Array.from(chapters);

    // Extrae y reinserta el capítulo movido
    const [movedChapter] = updatedChapters.splice(result.source.index, 1);
    updatedChapters.splice(result.destination.index, 0, movedChapter);

    // Actualiza el estado local
    setChapters(updatedChapters);

    // Prepara los datos para el reordenamiento
    const bulkUpdateData = updatedChapters.map((chapter, index) => ({
      id: chapter.id,
      position: index,
    }));

    // Llama a la función onReorder con los datos actualizados
    onReorder(bulkUpdateData);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="chapters">
          {(provided) => (
            <section {...provided.droppableProps} ref={provided.innerRef}>
              {chapters.map((chapter, index) => (
                <Draggable
                  key={chapter.id}
                  draggableId={chapter.id}
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
                        <Grip className="h-5 w-5" />
                      </article>

                      {/* Título del capítulo */}
                      <h3 className="font-bold">{chapter.title}</h3>

                      {/* Ícono de edición */}
                      <article className="ml-auto p-4 flex items-center gap-x-4">
                        <Pencil
                          onClick={() => onEdit(chapter.id)}
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
