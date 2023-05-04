/*
  Warnings:

  - A unique constraint covering the columns `[pollId,userId]` on the table `Answer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Answer_pollId_userId_key" ON "Answer"("pollId", "userId");
