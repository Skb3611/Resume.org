/*
  Warnings:

  - A unique constraint covering the columns `[userId,templateId]` on the table `UserTemplateRecord` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserTemplateRecord_userId_templateId_key" ON "UserTemplateRecord"("userId", "templateId");
