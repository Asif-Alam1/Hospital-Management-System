-- CreateEnum
CREATE TYPE "status" AS ENUM ('pending', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Doctor', 'Patient');

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "status" "status" NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'Patient';

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
