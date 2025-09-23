-- DropForeignKey
ALTER TABLE "public"."AppUser" DROP CONSTRAINT "AppUser_churchId_fkey";

-- AlterTable
ALTER TABLE "public"."AppUser" ALTER COLUMN "churchId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."AppUser" ADD CONSTRAINT "AppUser_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."AppChurch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
