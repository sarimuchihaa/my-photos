import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create dummy photos
  const photo1 = await prisma.photo.create({
    data: {
      url: 'https://example.com/photo1.jpg',
      comments: {
        create: [
          { text: 'Nice photo!' },
          { text: 'Love this shot!' },
        ],
      },
    },
  });

  const photo2 = await prisma.photo.create({
    data: {
      url: 'https://example.com/photo2.jpg',
      comments: {
        create: [
          { text: 'Amazing colors!' },
          { text: 'Great composition!' },
        ],
      },
    },
  });

  console.log('Dummy data has been added!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });