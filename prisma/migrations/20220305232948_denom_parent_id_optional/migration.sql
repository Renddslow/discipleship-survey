-- DropForeignKey
ALTER TABLE `Denomination` DROP FOREIGN KEY `Denomination_denominationId_fkey`;

-- AlterTable
ALTER TABLE `Denomination` MODIFY `denominationId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Denomination` ADD CONSTRAINT `Denomination_denominationId_fkey` FOREIGN KEY (`denominationId`) REFERENCES `Denomination`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
