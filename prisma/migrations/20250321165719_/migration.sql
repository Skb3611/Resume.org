/*
  Warnings:

  - A unique constraint covering the columns `[paymentSessionId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Payment_paymentSessionId_key" ON "Payment"("paymentSessionId");
