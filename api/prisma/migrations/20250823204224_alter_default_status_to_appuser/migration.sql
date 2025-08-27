-- AlterTable
ALTER TABLE "public"."AppUser" ALTER COLUMN "status" SET DEFAULT 'P';

-- Atualiza registros antigos que estavam como PENDING
UPDATE "AppUser"
SET "status" = 'P'
WHERE "status" = 'PENDING';
