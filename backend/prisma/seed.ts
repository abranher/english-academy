import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import levels from './data/levels';
import skills from './data/skills';

const prisma = new PrismaClient();

async function main() {
  const levelsResult = await prisma.level.createManyAndReturn({
    data: levels,
  });

  const skillsResult = await prisma.skill.createMany({
    data: skills,
  });

  const abran = await prisma.user.create({
    data: {
      name: 'Abraham',
      lastName: 'Hernández',
      email: 'abran@gmail.com',
      username: 'abranher',
      password: await hash('abran123', 10),
      role: 'ADMIN',
    },
  });

  const carlos = await prisma.user.create({
    data: {
      name: 'Carlos',
      lastName: 'Bolivar',
      email: 'carlos@gmail.com',
      username: 'carlos12',
      password: await hash('carlos123', 10),
      role: 'STUDENT',
      student: {
        create: {
          levelId: levelsResult[0].id,
        },
      },
    },
  });

  const multipleChoiceExercise = await prisma.multipleChoiceExercise.create({
    data: {
      question: 'Que significa esta palabra en español:',
      text: 'Dog',
    },
  });

  const multipleChoiceOption1 = await prisma.multipleChoiceOptions.create({
    data: {
      text: 'Perro',
      isCorrect: true,
      multipleChoiceExerciseId: multipleChoiceExercise.id,
    },
  });

  const multipleChoiceOption2 = await prisma.multipleChoiceOptions.create({
    data: {
      text: 'Gato',
      multipleChoiceExerciseId: multipleChoiceExercise.id,
    },
  });

  console.log(
    { abran },
    { carlos },
    { levels: levelsResult },
    { skills: skillsResult },
    { multipleChoiceExercise },
    { multipleChoiceOption1 },
    { multipleChoiceOption2 },
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
