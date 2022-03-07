-- AlterTable
ALTER TABLE `SurveyQuestion` ADD COLUMN `sequence` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `SurveyQuestionOption` ADD COLUMN `sequence` INTEGER NOT NULL DEFAULT 0;
