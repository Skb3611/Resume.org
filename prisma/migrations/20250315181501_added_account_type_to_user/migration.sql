-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('Basic', 'Premium', 'Professional');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accountType" "AccountType" NOT NULL DEFAULT 'Basic',
ADD COLUMN     "resumesCreated" INTEGER NOT NULL DEFAULT 0;
