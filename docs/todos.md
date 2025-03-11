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

import { useInitialTestStore } from "@/services/store/initial-test";

const calculateProgress = (
  correctAnswer: number,
  totalAnswer: number
): number => {
  if (totalAnswer === 0) return 0;
  const percentage = (correctAnswer / totalAnswer) * 100;
  return Math.round(percentage);
};

interface ScoringSystem {
  A1: number;
  A2: number;
  B1: number;
  B2: number;
  C1: number;
  C2: number;
}

interface Results {
  A1: string;
  A2: string;
  B1: string;
  B2: string;
  C1: string;
  C2: string;
}

const scoringSystem: ScoringSystem = {
  A1: 0,
  A2: 30,
  B1: 60,
  B2: 90,
  C1: 120,
  C2: 150,
};

const results: Results = {
  A1: "Nivel A1: Principiante",
  A2: "Nivel A2: Elemental",
  B1: "Nivel B1: Intermedio",
  B2: "Nivel B2: Intermedio Alto",
  C1: "Nivel C1: Avanzado",
  C2: "Nivel C2: Maestría",
};

export const useInitialTestData = () => {
  const exercises = useInitialTestStore((state) => state.exercises);

  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;
  let totalPoints = 0;

  exercises.forEach((exercise) => {
    const { userSelectedAnswer, correctAnswer, points } = exercise;
    if (userSelectedAnswer == null) unanswered++;
    else if (userSelectedAnswer === correctAnswer) {
      correct++;
      totalPoints += points;
    } else incorrect++;
  });

  const progress = calculateProgress(correct, exercises.length);

  const calculateLevel = (points: number): { level: string; description: string } => {
    let currentLevel = "A1";
    let currentDescription = results["A1"];

    for (const level in scoringSystem) {
      if (points >= scoringSystem[level]) {
        currentLevel = level;
        currentDescription = results[level];
      } else {
        break;
      }
    }

    return { level: currentLevel, description: currentDescription };
  };

  const levelInfo = calculateLevel(totalPoints);

  return {
    exercises,
    correct,
    incorrect,
    unanswered,
    progress,
    totalPoints,
    level: levelInfo.level,
    levelDescription: levelInfo.description,
  };
};
