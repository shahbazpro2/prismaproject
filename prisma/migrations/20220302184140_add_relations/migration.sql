/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Animation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Animation_title_key" ON "Animation"("title");
