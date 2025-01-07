/*
  Warnings:

  - You are about to drop the `_UserTemplates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserTemplates" DROP CONSTRAINT "_UserTemplates_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserTemplates" DROP CONSTRAINT "_UserTemplates_B_fkey";

-- DropTable
DROP TABLE "_UserTemplates";

-- CreateTable
CREATE TABLE "UserTemplateRecord" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "templateId" INTEGER NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserTemplateRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserTemplateRecord" ADD CONSTRAINT "UserTemplateRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTemplateRecord" ADD CONSTRAINT "UserTemplateRecord_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
