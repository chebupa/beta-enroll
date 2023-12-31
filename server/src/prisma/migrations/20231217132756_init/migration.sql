/*
  Warnings:

  - Added the required column `comment` to the `wait_list` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wait_list" ADD COLUMN     "comment" TEXT NOT NULL;
