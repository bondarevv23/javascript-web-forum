/*
  Warnings:

  - You are about to drop the column `topicId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Topic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_topicId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "topicId",
ADD COLUMN     "tags" TEXT[];

-- DropTable
DROP TABLE "Topic";
