/*
  Warnings:

  - You are about to drop the column `refectoryId` on the `Pool` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_PoolToRefectory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PoolToRefectory_A_fkey" FOREIGN KEY ("A") REFERENCES "Pool" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PoolToRefectory_B_fkey" FOREIGN KEY ("B") REFERENCES "Refectory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pool" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" DATETIME NOT NULL,
    "dueDate" DATETIME NOT NULL
);
INSERT INTO "new_Pool" ("createdAt", "date", "dueDate", "id") SELECT "createdAt", "date", "dueDate", "id" FROM "Pool";
DROP TABLE "Pool";
ALTER TABLE "new_Pool" RENAME TO "Pool";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_PoolToRefectory_AB_unique" ON "_PoolToRefectory"("A", "B");

-- CreateIndex
CREATE INDEX "_PoolToRefectory_B_index" ON "_PoolToRefectory"("B");
