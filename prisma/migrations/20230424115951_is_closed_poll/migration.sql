-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Poll" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dateStart" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" DATETIME,
    "winner" INTEGER NOT NULL,
    "isClosed" BOOLEAN DEFAULT false
);
INSERT INTO "new_Poll" ("dateStart", "dueDate", "id", "winner") SELECT "dateStart", "dueDate", "id", "winner" FROM "Poll";
DROP TABLE "Poll";
ALTER TABLE "new_Poll" RENAME TO "Poll";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
