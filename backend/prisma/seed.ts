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

  console.log(
    { abran },
    { carlos },
    { levels: levelsResult },
    { skills: skillsResult },
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
