"use client"
import type React from "react"
import { motion } from "framer-motion"
import { Check, Star, TrendingUp, Award, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { UserInfoModal } from "@/components/payments/payment"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// Individual pricing plans
const pricingPlans = [
  {
    title: "Basic",
    description: "Perfect for beginners",
    price: 0,
    period: "month",
    features: [
      "5 resume templates",
      "Basic CV builder",
      "Download as PDF",
      "14-day revision history",
      "Email support",
      "Basic keyword optimization",
    ],
    gradient: "from-blue-100 to-indigo-100",
    icon: <TrendingUp size={20} className="text-blue-600" />,
    ctaText: "Get Started Free",
  },
  {
    title: "Premium",
    description: "Most popular choice",
    price: 199,
    period: "month",
    features: [
      "All Basic features",
      "30+ premium templates",
      "AI content suggestions",
      "Cover letter builder",
      "Multiple export formats",
      "30-day revision history",
      "Priority support",
    ],
    popular: true,
    gradient: "from-primary/30 to-indigo-100",
    icon: <Star size={20} className="text-primary" />,
    ctaText: "Choose Premium",
  },
  {
    title: "Professional",
    description: "For career experts",
    price: 299,
    period: "month",
    features: [
      "All Premium features",
      "Unlimited resumes",
      "Advanced AI writing assistant",
      "ATS optimization tools",
      "Custom domain for portfolio",
      "Resume analytics",
      "1-on-1 expert review",
      "24/7 priority support",
    ],
    gradient: "from-purple-100 to-fuchsia-100",
    icon: <Award size={20} className="text-purple-600" />,
    ctaText: "Choose Professional",
  },
]

interface GradientCardProps {
  title: string
  description: string
  price: number
  period: string
  features: string[]
  gradient: string
  popular?: boolean
  icon?: React.ReactNode
  ctaText: string
}

const GradientCard = ({
  title,
  description,
  price,
  period,
  features,
  gradient,
  popular,
  icon,
  ctaText,
}: GradientCardProps) => {
  const { data: session } = useSession()
  // const customUser = localStorage.getItem("custom_user");
  const router = useRouter()
  const pathname = usePathname()

  const handleModal = () => {
    if (session || (typeof window !== "undefined" && localStorage.getItem("custom_user"))) {
      if (title == "Basic") {
        router.push("/dashboard")
      } else {
        router.push("/pricing")
      }
    } else {
      toast.error("Please login to choose a plan")
    }
  }

  return (
    <motion.div
      className={cn("relative rounded-xl overflow-hidden h-full", "border shadow-lg dark:shadow-dark-soft")}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { delay: 0.2, duration: 0.2 },
      }}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br", gradient, "opacity-50 dark:opacity-30")}></div>

      <div className="relative p-4 sm:p-6 z-10 flex flex-col h-full">
        {popular && (
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-primary text-primary-foreground text-xs py-1 px-2 rounded-full font-medium">
            Most Popular
          </div>
        )}

        <div className="mb-3 sm:mb-4 flex items-center space-x-2 sm:space-x-3">
          <div className="bg-background dark:bg-background/80 rounded-full p-1.5 sm:p-2 shadow-md">{icon}</div>
          <div>
            <h3 className="font-bold text-lg sm:text-xl">{title}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>
          </div>
        </div>

        <div className="my-3 sm:my-5">
          <div className="flex items-baseline">
            <span className="text-3xl sm:text-4xl font-extrabold">₹{price}</span>
            <span className="text-xs sm:text-sm text-muted-foreground ml-2">/{period}</span>
          </div>
        </div>

        <div className="py-3 sm:py-4 border-t border-b border-muted mb-4 sm:mb-6">
          <ul className="space-y-2 sm:space-y-3 flex-grow">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start text-xs sm:text-sm">
                <Check size={16} className="mr-2 mt-0.5 text-primary shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto">
          {pathname !== "/pricing" || title == "Basic" ? (
            <Button
              className="w-full font-medium text-xs sm:text-sm"
              variant={popular ? "default" : "outline"}
              onClick={handleModal}
            >
              {ctaText} <ChevronRight size={14} className="ml-1 sm:ml-2" />
            </Button>
          ) : (
            <UserInfoModal
              trigger={
                <Button className="w-full font-medium text-xs sm:text-sm" variant={popular ? "default" : "outline"}>
                  {ctaText} <ChevronRight size={14} className="ml-1 sm:ml-2" />
                </Button>
              }
            />
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Main PricingAlternatives component
const PricingAlternatives = () => {
  return (
    <div className="container px-4 py-10 sm:py-16 md:py-24">
      <div className="w-full">
        <div className="text-center mb-8 sm:mb-16 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "5rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-block h-1 bg-primary rounded mb-4"
          />
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary dark:from-foreground dark:to-primary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Choose Your Plan
          </motion.h2>

          <motion.p
            className="text-muted-foreground mb-6 sm:mb-8 text-base sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Flexible options for every career stage
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {pricingPlans.map((plan, index) => (
            <GradientCard key={index} {...plan} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default PricingAlternatives

