/*
  Warnings:

  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileImage` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "profileImage" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;
