-- CreateTable
CREATE TABLE "Mint" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "rank" INTEGER NOT NULL,

    CONSTRAINT "Mint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Uptime" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "isUp" BOOLEAN NOT NULL,
    "mintId" INTEGER NOT NULL,

    CONSTRAINT "Uptime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "points" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "details" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "mintId" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashuToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "CashuToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mint_url_key" ON "Mint"("url");

-- AddForeignKey
ALTER TABLE "Uptime" ADD CONSTRAINT "Uptime_mintId_fkey" FOREIGN KEY ("mintId") REFERENCES "Mint"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_mintId_fkey" FOREIGN KEY ("mintId") REFERENCES "Mint"("id") ON DELETE CASCADE ON UPDATE CASCADE;
