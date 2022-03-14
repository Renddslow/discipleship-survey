/*
  Warnings:

  - A unique constraint covering the columns `[shortcode]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Question_shortcode_key` ON `Question`(`shortcode`);
