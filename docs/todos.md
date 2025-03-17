# TODOS:

- Backups para windows
- Luego mostrar cards de planes mensuales o anuales
- Generar subscripcion dependiendo del plan

que necesitamos:

- necesitamos que el admin le llegue una notification donde le diga lo que sucedio

- Mostrar cursos publicados y aprobados
- Mostrar cursos por categoria,
- mostrar cursos por nivel

- Mostrar clase
- Mostrar quiz

# PARA DESPUES:

- Al verificar tutor necesita iniciar sesion nuevamente para poder pedir la data nueva
- Creamos un vista para mostrar todas las notificaciones -> 30 min
- La fecha de nacimiento del perfil, se guarda de una manera en la bd y luego se muestra como de otra
- rejected_at (fecha/hora del rechazo para eliminar en 24h)


async correctOption(
  quizQuestionId: string,
  updateQuizQuestionOptionDto: UpdateQuizQuestionOptionDto,
) {
  await this.findQuestionOrThrow(quizQuestionId);
  await this.findOptionOrThrow(updateQuizQuestionOptionDto.optionId);

  try {
    // 1. Actualizar todas las opciones a false para la pregunta dada
    await this.prisma.quizQuestionOption.updateMany({
      where: { quizQuestionId: quizQuestionId },
      data: { isCorrect: false },
    });

    // 2. Actualizar la opción seleccionada a true
    await this.prisma.quizQuestionOption.update({
      where: { id: updateQuizQuestionOptionDto.optionId, quizQuestionId: quizQuestionId },
      data: { isCorrect: true },
    });

    return { message: 'Opción correcta actualizada!' };
  } catch (error) {
    console.error('Error al actualizar la opción correcta:', error);
    throw new InternalServerErrorException(
      'Error del servidor. Por favor intenta nuevamente.',
    );
  }
}


model Attachment {
  id    String @id @default(uuid())
  title String
  url   String @db.Text

  tutorId String
  tutor   Tutor  @relation(fields: [tutorId], references: [id])

  classes ClassAttachment[] // Relación muchos-a-muchos con Class

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([tutorId])
}

model Class {
  id          String  @id @default(uuid())
  title       String
  description String? @db.Text
  video       String? @db.Text

  lessonId String @unique
  lesson   Lesson @relation(fields: [lessonId], references: [id])

  attachments ClassAttachment[] // Relación muchos-a-muchos con Attachment

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// Tabla de unión para la relación muchos-a-muchos entre Class y Attachment
model ClassAttachment {
  id           String @id @default(uuid())
  classId      String
  class        Class @relation(fields: [classId], references: [id])
  attachmentId String
  attachment   Attachment @relation(fields: [attachmentId], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([classId, attachmentId]) // Evita duplicados
}




const { getRootProps, getInputProps, isDragActive } = useDropzone({
     onDrop: useCallback((acceptedFiles: File[]) => {
       const file = acceptedFiles[0];
       setSelectedFile(file);
       if (file.type.startsWith('image/')) {
         setPreview(URL.createObjectURL(file));
       } else {
         setPreview(null); // No hay vista previa para PDFs
       }
     }, []),
     accept: {
       'image/*': ['.png', '.jpg', '.jpeg'],
       'application/pdf': ['.pdf'],
     },
     maxSize: MAX_SIZE,
     onDropRejected: (fileRejections) => {
       fileRejections.forEach((rejection) => {
         if (rejection.errors.some((e) => e.code === "file-too-large")) {
           toast.error("El archivo es demasiado grande (máximo 5MB)");
         } else {
           toast.error("Formato de archivo no permitido");
         }
       });
     },
   });


{preview ? (
     selectedFile?.type.startsWith('image/') ? (
       <Image
         src={preview}
         alt="Preview"
         className="rounded-md border-3 border-gray-500"
       />
     ) : (
       <div className="flex flex-col items-center justify-center p-4">
         <FileIcon className="h-12 w-12 text-gray-600" />
         <p className="mt-2 text-sm">{selectedFile?.name}</p>
       </div>
     )
   ) : (
     <div className="grid aspect-video place-items-center rounded-lg bg-zinc-200 dark:bg-zinc-800">
       <ImageIcon className="h-9 w-9 text-gray-600" />
     </div>
   )}




const mutation = useMutation({
     mutationFn: async (formData: FormData) =>
       axios.post(`/api/courses/files/${courseId}/resources`, formData, {
         headers: { "Content-Type": "multipart/form-data" },
         onUploadProgress: (progressEvent) => {
           const percent = Math.round(
             (progressEvent.loaded * 100) / (progressEvent.total || 1)
           );
           setProgress(percent);
         },
       }),
     onSuccess: (response) => {
       if (response.status === 200 || response.status === 201) {
         const data = response.data;
         toast.success(data.message);
         setUploadStatus("done");
         setSelectedFile(undefined);
         queryClient.invalidateQueries({ queryKey: ["get_course", courseId] });
       }
     },
     onError: (error: AxiosError | Error) => {
       setUploadStatus("error");
       setProgress(0);
       const message =
         error instanceof AxiosError
           ? error.response?.data?.message || "Error al subir el archivo"
           : "Error desconocido";
       toast.error(message);
     },
   });



<p className="text-xs font-medium mt-2">
     Se permiten PNG, JPG, JPEG y PDF (Máx. 5MB).
   </p>
