-- AlterTable
ALTER TABLE `Question` MODIFY `shortcode` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `QuestionCategory` MODIFY `description` VARCHAR(255) NOT NULL DEFAULT '';
