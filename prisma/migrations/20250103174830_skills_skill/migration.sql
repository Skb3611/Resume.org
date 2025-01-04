/*
  Warnings:

  - You are about to drop the column `Skills` on the `TemplateMetaData` table. All the data in the column will be lost.
  - Added the required column `Skill` to the `TemplateMetaData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TemplateMetaData" DROP COLUMN "Skills",
ADD COLUMN     "Skill" BOOLEAN NOT NULL;
