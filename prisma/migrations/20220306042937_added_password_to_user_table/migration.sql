/*
  Warnings:

  - Added the required column `firstName` to the `SurveyCompletion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SurveyCompletion` ADD COLUMN `firstName` VARCHAR(255) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `password` VARCHAR(255) NOT NULL;
