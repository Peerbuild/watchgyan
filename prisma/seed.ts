import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  //create some predefined categories for blog posts
  await prisma.category.createMany({
    data: [
      { name: "Featured Posts" },
      { name: "Curated Picks" },
      { name: "Latest Global Stories" },
    ],
  });

  console.log("Seeded categories");
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
