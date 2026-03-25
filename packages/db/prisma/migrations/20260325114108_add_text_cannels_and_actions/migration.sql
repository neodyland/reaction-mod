-- CreateEnum
CREATE TYPE "Action" AS ENUM ('DELETE', 'TIMEOUT');

-- AlterTable
ALTER TABLE "Server" ADD COLUMN     "action" "Action" NOT NULL DEFAULT 'DELETE';

-- CreateTable
CREATE TABLE "TextChannel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,

    CONSTRAINT "TextChannel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TextChannel" ADD CONSTRAINT "TextChannel_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
