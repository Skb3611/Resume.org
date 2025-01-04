-- CreateTable
CREATE TABLE "Template" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateMetaData" (
    "id" SERIAL NOT NULL,
    "templateId" INTEGER NOT NULL,
    "ContactInformation" BOOLEAN NOT NULL,
    "Education" BOOLEAN NOT NULL,
    "Skills" BOOLEAN NOT NULL,
    "Experience" BOOLEAN NOT NULL,
    "Projects" BOOLEAN NOT NULL,
    "Certifications" BOOLEAN NOT NULL,
    "Awards" BOOLEAN NOT NULL,
    "Languages" BOOLEAN NOT NULL,
    "Hobbies" BOOLEAN NOT NULL,

    CONSTRAINT "TemplateMetaData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TemplateMetaData" ADD CONSTRAINT "TemplateMetaData_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
