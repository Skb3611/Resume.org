/*
  Warnings:

  - You are about to drop the column `Skill` on the `TemplateMetaData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TemplateMetaData" DROP COLUMN "Skill",
ADD COLUMN     "Skills" BOOLEAN;
