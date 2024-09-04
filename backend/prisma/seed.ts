import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import levels from './data/levels';
import skills from './data/skills';

const prisma = new PrismaClient();

async function main() {
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

  const levelsResult = await prisma.level.createMany({
    data: levels,
  });

  const skillsResult = await prisma.skill.createMany({
    data: skills,
  });

  console.log({ abran }, { levels: levelsResult }, { skills: skillsResult });
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
