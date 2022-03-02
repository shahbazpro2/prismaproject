-- CreateTable
CREATE TABLE "Animation" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "Animation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Animation" ADD CONSTRAINT "Animation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animation" ADD CONSTRAINT "Animation_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
