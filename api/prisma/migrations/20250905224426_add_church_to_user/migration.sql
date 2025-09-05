/*
  Warnings:

  - Added the required column `churchId` to the `AppUser` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `role` on the `AppUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."AppUser" ADD COLUMN     "churchId" INTEGER NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."AppChurch" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AppChurch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."AppUser" ADD CONSTRAINT "AppUser_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."AppChurch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
