-- CreateTable
CREATE TABLE "Rating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "points" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "details" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "mintId" INTEGER NOT NULL,
    CONSTRAINT "Rating_mintId_fkey" FOREIGN KEY ("mintId") REFERENCES "Mint" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
