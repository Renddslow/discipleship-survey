/*
  Warnings:

  - You are about to drop the `SurveyQuestionOption` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `shortcode` to the `SurveyQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `SurveyQuestionOption` DROP FOREIGN KEY `SurveyQuestionOption_surveyQuestionId_fkey`;

-- AlterTable
ALTER TABLE `Church` ADD COLUMN `shortName` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `SurveyQuestion` ADD COLUMN `shortcode` VARCHAR(50) NOT NULL;

-- DropTable
DROP TABLE `SurveyQuestionOption`;

-- CreateTable
CREATE TABLE `Flag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SurveyFlags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `surveyId` INTEGER NOT NULL,
    `flagId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SurveyFlags` ADD CONSTRAINT `SurveyFlags_surveyId_fkey` FOREIGN KEY (`surveyId`) REFERENCES `Survey`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SurveyFlags` ADD CONSTRAINT `SurveyFlags_flagId_fkey` FOREIGN KEY (`flagId`) REFERENCES `Flag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
