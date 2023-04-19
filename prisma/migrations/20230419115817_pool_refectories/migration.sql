-- CreateTable
CREATE TABLE "Refectory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Pool" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" DATETIME NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "refectoryId" INTEGER NOT NULL,
    CONSTRAINT "Pool_refectoryId_fkey" FOREIGN KEY ("refectoryId") REFERENCES "Refectory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Refectory_name_key" ON "Refectory"("name");
