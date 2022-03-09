/*
  Warnings:

  - Added the required column `questionCategoryId` to the `SurveyQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SurveyQuestion` ADD COLUMN `questionCategoryId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `QuestionCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `questionCategoryId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `QuestionCategory` ADD CONSTRAINT `QuestionCategory_questionCategoryId_fkey` FOREIGN KEY (`questionCategoryId`) REFERENCES `QuestionCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SurveyQuestion` ADD CONSTRAINT `SurveyQuestion_questionCategoryId_fkey` FOREIGN KEY (`questionCategoryId`) REFERENCES `QuestionCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
