import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const church = await prisma.appChurch.create({
    data: {
      name: "Igreja Principal"
    }
  });

  await prisma.appUser.create({
    data: {
      name: "Admin",
      email: "admin@test.com",
      password: "$2b$10$mD1ySfxByhoOX3vq17WjcO66nHkYsVGK2vK0kuLAzm2DEskS43y6S",
      role: 1001,
      status: "A",
      churchId: church.id
    }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
