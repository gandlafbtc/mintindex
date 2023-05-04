/*
  Warnings:

  - Added the required column `date` to the `Mint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank` to the `Mint` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mint" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "rank" INTEGER NOT NULL
);
INSERT INTO "new_Mint" ("id", "url") SELECT "id", "url" FROM "Mint";
DROP TABLE "Mint";
ALTER TABLE "new_Mint" RENAME TO "Mint";
CREATE UNIQUE INDEX "Mint_url_key" ON "Mint"("url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
