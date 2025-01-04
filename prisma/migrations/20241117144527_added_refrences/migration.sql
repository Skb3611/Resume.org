/*
  Warnings:

  - Added the required column `References` to the `TemplateMetaData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TemplateMetaData" ADD COLUMN     "References" BOOLEAN NOT NULL;
