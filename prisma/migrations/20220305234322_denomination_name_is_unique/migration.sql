/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Denomination` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Denomination` MODIFY `name` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Denomination_name_key` ON `Denomination`(`name`);
