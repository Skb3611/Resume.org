"use client";
import {
  CheckCircle,
  ArrowRight,
  CreditCard,
  Sparkles,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {motion} from "framer-motion"
import { revalidatePath } from "next/cache";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order_id");
  const plan = searchParams.get("plan");
  const {data:session,update} = useSession()
useEffect(() => {
 (async()=>{
  if(session){
    await update({accountType:plan})
  }
 }
  )()
  let customUser = localStorage.getItem("custom_user")
  if(customUser){
    localStorage.removeItem("custom_user")
    const user = JSON.parse(customUser)
    console.log(plan)
    console.log(user)
    user.accountType = plan
    localStorage.setItem("custom_user",JSON.stringify(user));
  }
}, [])
  return (
    <div className="mt-10 min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-background/90 p-4 md:p-6">
      <motion.div
      initial={{opacity:0,scale:0.5}}
      animate={{opacity:1,scale:1}}
      transition={{duration:0.5}}
      className="max-w-xs md:max-w-md lg:max-w-xl w-full mx-auto">
        <div className="relative bg-card/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-border/50">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-3 md:p-4 rounded-full shadow-lg animate-scale-in">
              <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={2} />
              <div className="absolute -right-2 -top-2 pulse">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-yellow-300" />
              </div>
            </div>
          </div>

          <div className="text-center space-y-4 md:space-y-6 mt-6 md:mt-8">
            <div className="space-y-1 md:space-y-2">
              <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Payment Successful!
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Your Plan has been sucessfully upgraded to {plan}.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 md:gap-4">
              <div className="p-2 md:p-4 rounded-2xl bg-secondary/30 backdrop-blur-sm">
                <CreditCard className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 text-primary" />
                <span className="text-xs md:text-sm font-medium">Payment Verified</span>
              </div>
              <div className="p-2 md:p-4 rounded-2xl bg-secondary/30 backdrop-blur-sm">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 text-primary" />
                <span className="text-xs md:text-sm font-medium">Plan Upgraded</span>
              </div>
              <div className="p-2 md:p-4 rounded-2xl bg-secondary/30 backdrop-blur-sm">
                <Shield className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 text-primary" />
                <span className="text-xs md:text-sm font-medium">Secured</span>
              </div>
            </div>

            <div className="pt-4 md:pt-6">
              <Button
                onClick={() => {
                  router.refresh()
                  router.push("/dashboard")

                  }}
                className="w-full py-4 md:py-6 text-sm md:text-base font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
              >
                Continue to Dashboard
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
