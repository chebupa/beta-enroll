/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `wait_list` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone_number]` on the table `wait_list` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone_number` to the `wait_list` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wait_list" ADD COLUMN     "phone_number" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "wait_list_id_key" ON "wait_list"("id");

-- CreateIndex
CREATE UNIQUE INDEX "wait_list_phone_number_key" ON "wait_list"("phone_number");
