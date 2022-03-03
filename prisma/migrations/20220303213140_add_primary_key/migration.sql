/*
  Warnings:

  - The primary key for the `TagOnAnimation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TagOnAnimation` table. All the data in the column will be lost.
  - Made the column `animationId` on table `TagOnAnimation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tagId` on table `TagOnAnimation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "TagOnAnimation" DROP CONSTRAINT "TagOnAnimation_animationId_fkey";

-- DropForeignKey
ALTER TABLE "TagOnAnimation" DROP CONSTRAINT "TagOnAnimation_tagId_fkey";

-- AlterTable
ALTER TABLE "TagOnAnimation" DROP CONSTRAINT "TagOnAnimation_pkey",
DROP COLUMN "id",
ALTER COLUMN "animationId" SET NOT NULL,
ALTER COLUMN "tagId" SET NOT NULL,
ADD CONSTRAINT "TagOnAnimation_pkey" PRIMARY KEY ("animationId", "tagId");

-- AddForeignKey
ALTER TABLE "TagOnAnimation" ADD CONSTRAINT "TagOnAnimation_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagOnAnimation" ADD CONSTRAINT "TagOnAnimation_animationId_fkey" FOREIGN KEY ("animationId") REFERENCES "Animation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
