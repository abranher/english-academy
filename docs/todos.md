# TODOS:

- Backups para windows
- Luego mostrar cards de planes mensuales o anuales
- Generar subscripcion dependiendo del plan

- Verificar los cursos

que necesitamos:

- necesitamos que el admin le llegue una notification donde le diga lo que sucedio
- el admin ya ve el curso pero seria bueno agregarle algun boton que le permita
  volver a su pagina de admin

- Crear el quiz
- Mostrar clase
- Mostrar quiz

# PARA DESPUES:

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
