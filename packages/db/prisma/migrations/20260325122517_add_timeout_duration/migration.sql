-- AlterTable
ALTER TABLE "Server" ADD COLUMN     "logChannelId" TEXT,
ADD COLUMN     "timeoutDuration" INTEGER DEFAULT 600;
