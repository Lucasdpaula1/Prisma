/*
  Warnings:

  - You are about to drop the column `email` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `posts` table. All the data in the column will be lost.
  - Added the required column `UserId` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `address` ADD COLUMN `UserId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `posts` DROP COLUMN `email`,
    DROP COLUMN `name`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `text` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
