# TODOS:

- Backups para windows
- Luego mostrar cards de planes mensuales o anuales
- Generar subscripcion dependiendo del plan

- Verificar los cursos

- listar los cursos en el lado del tutor: -> 30 min

que necesitamos:

- necesitamos que el admin le llegue una notification donde le diga lo que sucedio
- necesitamos que al admin se le de una lista de los cursos
- lista dividida en review status
- necesitamos que el admin pueda ver el curso
- necesitamos que el tutor pueda dar un feedback a eso envio
- necesitamos ademas que se le de un select donde se le muestre la decision que tomo
- necesitamos que se marque la fecha el cual el tutor hizo la revision
- necesitamos que al tutor le llegue esa notification del status de su envio del curso

Tutor:

- Crear seccion para mostrar el historial de reviews

Admin:

- Crear seccion para ver el review
- Añadir un campo para poner feedback al curso y colocar un boton que diga "Finalizar revision"
- Colocar la decicion con el radio group

- Crear el quiz
- Mostrar clase
- Mostrar quiz

# PARA DESPUES:

- Creamos un vista para mostrar todas las notificaciones -> 30 min
- La fecha de nacimiento del perfil, se guarda de una manera en la bd y luego se muestra como de otra
- rejected_at (fecha/hora del rechazo para eliminar en 24h)



model Attachment {
  id          String   @id @default(uuid())
  name        String
  url         String   @db.Text
  tutorId     String
  tutor       Tutor    @relation(fields: [tutorId], references: [id])
  courses     Course[] @relation(references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([tutorId])
}

model Course {
  id             String               @id @default(uuid())
  title          String               @db.Text
  subtitle       String?              @db.Text
  description    String?              @db.Text
  image          String?              @db.Text
  trailer        String?              @db.Text
  reviewStatus   CourseReviewStatus   @default(DRAFT)
  platformStatus CoursePlatformStatus @default(DRAFT)

  tutorId String
  tutor   Tutor  @relation(fields: [tutorId], references: [id])

  priceId String?
  price   Price?  @relation(fields: [priceId], references: [id])

  levelId String?
  level   Level?  @relation(fields: [levelId], references: [id])

  categoryId String?
  category   Category? @relation(fields: [categoryId], references: [id])

  subcategoryId String?
  subcategory   SubCategory? @relation(fields: [subcategoryId], references: [id])

  attachments Attachment[] @relation(references: [id])
  chapters    Chapter[]
  purchases   Purchase[]
  reviews     CourseReview[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}