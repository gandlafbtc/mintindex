-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Uptime" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "isUp" BOOLEAN NOT NULL,
    "mintId" INTEGER NOT NULL,
    CONSTRAINT "Uptime_mintId_fkey" FOREIGN KEY ("mintId") REFERENCES "Mint" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Uptime" ("date", "id", "isUp", "mintId") SELECT "date", "id", "isUp", "mintId" FROM "Uptime";
DROP TABLE "Uptime";
ALTER TABLE "new_Uptime" RENAME TO "Uptime";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
