/*
  Warnings:

  - Added the required column `denominationId` to the `Church` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Church` ADD COLUMN `denominationId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Denomination` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `denominationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Denomination` ADD CONSTRAINT `Denomination_denominationId_fkey` FOREIGN KEY (`denominationId`) REFERENCES `Denomination`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Church` ADD CONSTRAINT `Church_denominationId_fkey` FOREIGN KEY (`denominationId`) REFERENCES `Denomination`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
