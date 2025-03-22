"use client"
import { XCircle, AlertCircle, ArrowLeft, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {motion} from "framer-motion"

export default function PaymentCancelEnhanced() {
 const router = useRouter()
  return (
    <div className="mt-10 min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-background/90 p-4 md:p-6">
      <motion.div
      initial={{opacity:0,scale:0.5}}
      animate={{opacity:1,scale:1}}
      transition={{duration:0.5}}
        className="max-w-xs  md:max-w-md lg:max-w-xl w-full mx-auto"
      >
        <div className="relative bg-card/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-border/50">
          <div className="absolute -top-10 md:-top-12 left-1/2 -translate-x-1/2">
            <div
              className="relative bg-gradient-to-br from-red-500 to-rose-600 p-3 md:p-4 rounded-full shadow-lg"
            >
              <XCircle className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={2} />
              <div
                className="absolute -right-2 -top-2 pulse"
              >
                <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-yellow-300" />
              </div>
            </div>
          </div>

          <div className="text-center space-y-4 md:space-y-6 mt-6 md:mt-8">
            <div className="space-y-1 md:space-y-2">
              <h1
                className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent animate-fade-in"
              >
                Payment Cancelled
              </h1>
              <p
                className="text-sm md:text-base text-muted-foreground "
              >
                Your payment was not completed. No charges were made.
              </p>
            </div>

            <div
              className="grid grid-cols-2 gap-2 md:gap-4 animate-fade-in"
            >
              <div className="p-2 md:p-4 rounded-2xl bg-secondary/30 backdrop-blur-sm">
                <XCircle className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 md:mb-2 text-red-500" />
                <span className="text-xs md:text-sm font-medium">
                  Payment Not Processed
                </span>
              </div>
              <div className="p-2 md:p-4 rounded-2xl bg-secondary/30 backdrop-blur-sm">
                <AlertCircle className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 md:mb-2 text-yellow-500" />
                <span className="text-xs md:text-sm font-medium">No Charges Made</span>
              </div>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 pt-4 md:pt-6"
            >
              <Button
                onClick={() => router.push("/pricing")}
                variant="outline"
                className="w-full py-3 md:py-6 text-sm md:text-base font-medium hover:bg-secondary/80 transition-all duration-300 cursor-pointer"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Pricing
              </Button>
              <Button
                onClick={() => router.push("/pricing")}
                className="w-full py-3 md:py-6 text-sm md:text-base font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
              >
                Try Again
                <RefreshCcw className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
