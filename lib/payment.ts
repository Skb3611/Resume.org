"use server"
import { UserInfo } from "@/components/payments/payment";
import { Cashfree, CreateOrderRequest } from "cashfree-pg";
Cashfree.XClientId = process.env.XClientId;
Cashfree.XClientSecret = process.env.XClientSecret;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
import { prisma } from "./prisma"
import { AccountType } from "@prisma/client";


export const initializePayment = async (userInfo: UserInfo) => {
    const order_id = "order_" + Math.random().toString(36).substring(2, 15);
    const req: CreateOrderRequest = {
        order_id: order_id,
        order_amount: userInfo.plan == "Premium" ? 199 : 299,
        order_currency: "INR",
        customer_details: {
            customer_id: userInfo.user_id,
            customer_email: userInfo.email,
            customer_name: userInfo.name,
            customer_phone: userInfo.phone,
        },
        
        order_meta: {
            return_url: process.env.NEXT_PUBLIC_URL,
            // notify_url: "https://example.com/notify",
        }
    }
    try {
        const order = await Cashfree.PGCreateOrder("2023-08-01", req);
        console.log(order.data);
        const paymentorder = await prisma.payment.create({
            data: {
                userId: userInfo.user_id,
                amount: userInfo.plan == "Premium" ? 199 : 299,
                status: "PENDING",
                paymentSessionId: order.data.payment_session_id!,
                orderId: order_id,
            }
        })
        return order.data;
    }
    catch (err) {
        console.log(err);
    }
}

export const verifyPayment = async (order_id: string) => {
    try {
        const payment = await Cashfree.PGOrderFetchPayments("2023-08-01", order_id);
        console.log(payment.data,order_id);
        if (payment.data && payment.data[0].payment_status == "SUCCESS") {
            const plan = payment.data[0].order_amount == 199 ? "PREMIUM" : "PROFESSIONAL";
            await prisma.$transaction(async (tx) => {
                await tx.payment.update({
                    where: { orderId: order_id },
                    data: {
                        status: "SUCCESS",
                        user: {
                            update:{
                                accountType: plan == "PREMIUM" ? AccountType.Premium : AccountType.Professional,
                                planStartedAt: new Date(),
                                planExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                            }
                        }
                    },
                    
                })
            })
            return {
                success: true,
                message: "Payment successful",
                plan: plan,
            }
        }
        return {
            success: false,
            message: "Payment failed",
            plan: null,
        }

    } catch (e) {
        console.log(e)
        return {
            success: false,
            message: "Some error occurred",
            plan: null,
        }
    }
}
