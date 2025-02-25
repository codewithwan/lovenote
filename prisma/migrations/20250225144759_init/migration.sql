-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "greeting" TEXT NOT NULL,
    "mainMessage" TEXT NOT NULL,
    "chatMessage" TEXT NOT NULL,
    "wishTitle" TEXT NOT NULL,
    "wishText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Message_slug_key" ON "Message"("slug");
