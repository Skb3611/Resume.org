-- CreateTable
CREATE TABLE "_UserTemplates" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserTemplates_AB_unique" ON "_UserTemplates"("A", "B");

-- CreateIndex
CREATE INDEX "_UserTemplates_B_index" ON "_UserTemplates"("B");

-- AddForeignKey
ALTER TABLE "_UserTemplates" ADD CONSTRAINT "_UserTemplates_A_fkey" FOREIGN KEY ("A") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTemplates" ADD CONSTRAINT "_UserTemplates_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
