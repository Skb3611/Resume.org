"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Shield,
  CheckCircle,
  XCircle,
  Loader2,
  ArrowRight,
  RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { verifyPayment } from "@/lib/payment";
import { motion } from "framer-motion";

// Create a custom event for credit updates

export default function PaymentVerify() {
  const searchParams = useSearchParams();
  const order_id = searchParams.get("order_id");
 
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (order_id) {
        const payment = await verifyPayment(order_id);
        console.log(payment);
        if(payment.success){
          router.push("/payment/success?order_id="+order_id+"&plan="+payment.plan)
        }
        else{
          router.push("/payment/failed?order_id="+order_id+"&error="+payment.message)
        }
      }
    })();
  }, [order_id]);


    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-background/90">
        <motion.div 
        initial={{ opacity: 0, scale:0.5 }}
        animate={{ opacity: 1, scale:1 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4 sm:space-y-6 max-w-xs sm:max-w-sm md:max-w-md mx-auto px-4 ">
          <div className="relative">
            <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto">
              <div className="w-full h-full border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center animate-scale-in">
              <Shield className="w-6 sm:w-8 h-6 sm:h-8 text-primary/50" />
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Verifying Your Payment
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Please wait while we confirm your transaction. This will only take
              a moment.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div className="p-2 sm:p-4 rounded-2xl bg-secondary/30 backdrop-blur-sm">
              <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 text-primary animate-spin" />
              <span className="text-xs sm:text-sm font-medium">Checking</span>
            </div>
            <div className="p-4 rounded-2xl bg-secondary/30 backdrop-blur-sm">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 text-primary" />
              <span className="text-xs sm:text-sm font-medium">Securing</span>
            </div>
            <div className="p-4 rounded-2xl bg-secondary/30 backdrop-blur-sm">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 text-primary" />
              <span className="text-xs sm:text-sm font-medium">Confirming</span>
            </div>
          </div>
        </motion.div>
      </div>
    );


  }