/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'Admin';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAdmin";
