/*
  Warnings:

  - You are about to drop the column `surveyQuestionId` on the `SurveyAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `SurveyQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `sequence` on the `SurveyQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `shortcode` on the `SurveyQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `SurveyQuestion` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `SurveyQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionId` to the `SurveyQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surveyId` to the `SurveyQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SurveyQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedById` to the `SurveyQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `SurveyAnswer` DROP FOREIGN KEY `SurveyAnswer_surveyQuestionId_fkey`;

-- DropForeignKey
ALTER TABLE `SurveyQuestion` DROP FOREIGN KEY `SurveyQuestion_questionCategoryId_fkey`;

-- AlterTable
ALTER TABLE `SurveyAnswer` DROP COLUMN `surveyQuestionId`;

-- AlterTable
ALTER TABLE `SurveyQuestion` DROP COLUMN `label`,
    DROP COLUMN `sequence`,
    DROP COLUMN `shortcode`,
    DROP COLUMN `type`,
    ADD COLUMN `createdById` INTEGER NOT NULL,
    ADD COLUMN `include` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `questionId` INTEGER NOT NULL,
    ADD COLUMN `surveyId` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `updatedById` INTEGER NOT NULL,
    MODIFY `questionCategoryId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shortcode` VARCHAR(50) NOT NULL,
    `label` TEXT NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `sequence` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `questionCategoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_questionCategoryId_fkey` FOREIGN KEY (`questionCategoryId`) REFERENCES `QuestionCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SurveyQuestion` ADD CONSTRAINT `SurveyQuestion_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SurveyQuestion` ADD CONSTRAINT `SurveyQuestion_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SurveyQuestion` ADD CONSTRAINT `SurveyQuestion_surveyId_fkey` FOREIGN KEY (`surveyId`) REFERENCES `Survey`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SurveyQuestion` ADD CONSTRAINT `SurveyQuestion_questionCategoryId_fkey` FOREIGN KEY (`questionCategoryId`) REFERENCES `QuestionCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SurveyQuestion` ADD CONSTRAINT `SurveyQuestion_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
