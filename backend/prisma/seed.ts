import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import levels from './data/levels';
import prices from './data/prices';
import {
  cultureCategories,
  grammarCategories,
  listeningCategories,
  readingCategories,
  speakingCategories,
  vocabularyCategories,
  writingCategories,
} from './data/subcategories';

const prisma = new PrismaClient();

async function main() {
  const levelsResult = await prisma.level.createManyAndReturn({
    data: levels,
  });

  const pricesResult = await prisma.price.createManyAndReturn({
    data: prices,
  });

  // seed categories and subcategories

  await prisma.category.create({
    data: {
      title: 'Reading',
      description:
        'Develop your ability to understand texts written in English, from simple articles to complex academic texts.',
      subCategories: {
        createMany: {
          data: readingCategories,
        },
      },
    },
  });

  await prisma.category.create({
    data: {
      title: 'Writing',
      description:
        'Improve your ability to express yourself clearly and effectively in English, both in formal and informal situations.',
      subCategories: {
        createMany: {
          data: writingCategories,
        },
      },
    },
  });

  await prisma.category.create({
    data: {
      title: 'Listening',
      description:
        'Improve your English listening comprehension, from everyday conversations to formal speeches.',
      subCategories: {
        createMany: {
          data: listeningCategories,
        },
      },
    },
  });

  await prisma.category.create({
    data: {
      title: 'Speaking',
      description:
        'Practice your fluency and accuracy in speaking English, gaining confidence to communicate in different situations.',
      subCategories: {
        createMany: {
          data: speakingCategories,
        },
      },
    },
  });

  await prisma.category.create({
    data: {
      title: 'Grammar',
      description:
        'Learn and master English grammar rules to construct correct and precise sentences.',
      subCategories: {
        createMany: {
          data: grammarCategories,
        },
      },
    },
  });

  await prisma.category.create({
    data: {
      title: 'Vocabulary',
      description:
        'Expand your English vocabulary and learn to use new words in different contexts.',
      subCategories: {
        createMany: {
          data: vocabularyCategories,
        },
      },
    },
  });

  await prisma.category.create({
    data: {
      title: 'Culture',
      description:
        'Immerse yourself in the culture of English-speaking countries and learn about their customs, traditions, and values.',
      subCategories: {
        createMany: {
          data: cultureCategories,
        },
      },
    },
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

  const pedro = await prisma.user.create({
    data: {
      name: 'Pedro',
      lastName: 'Perez',
      email: 'pedro@gmail.com',
      username: 'pedro12',
      password: await hash('pedro123', 10),
      role: 'TUTOR',
      tutor: {
        create: {
          bio: 'soy un profesor',
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
    { pedro },
    { levels: levelsResult },
    { prices: pricesResult },
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
