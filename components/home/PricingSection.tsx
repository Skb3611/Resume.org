
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, TrendingUp, Award, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Individual pricing plans
const pricingPlans = [
  {
    title: "Basic",
    description: "Perfect for beginners",
    price: "$0",
    period: "month",
    features: [
      "5 resume templates",
      "Basic CV builder",
      "Download as PDF",
      "14-day revision history",
      "Email support",
      "Basic keyword optimization"
    ],
    gradient: "from-blue-100 to-indigo-100",
    icon: <TrendingUp size={20} className="text-blue-600" />,
    ctaText: "Get Started Free"
  },
  {
    title: "Premium",
    description: "Most popular choice",
    price: "$19",
    period: "month",
    features: [
      "All Basic features",
      "30+ premium templates",
      "AI content suggestions",
      "Cover letter builder",
      "Multiple export formats",
      "30-day revision history",
      "Priority support"
    ],
    popular: true,
    gradient: "from-primary/30 to-indigo-100",
    icon: <Star size={20} className="text-primary" />,
    ctaText: "Choose Premium"
  },
  {
    title: "Professional",
    description: "For career experts",
    price: "$29",
    period: "month",
    features: [
      "All Premium features",
      "Unlimited resumes",
      "Advanced AI writing assistant",
      "ATS optimization tools",
      "Custom domain for portfolio",
      "Resume analytics",
      "1-on-1 expert review",
      "24/7 priority support"
    ],
    gradient: "from-purple-100 to-fuchsia-100",
    icon: <Award size={20} className="text-purple-600" />,
    ctaText: "Choose Professional"
  }
];

interface GradientCardProps {
  title: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  gradient: string;
  popular?: boolean;
  icon?: React.ReactNode;
  ctaText: string;
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
  ctaText
}: GradientCardProps) => {
  const handleChoosePlan = () => {
    toast.success(`You've selected the ${title} plan`, {
      description: `Thank you for choosing our ${title} plan!`,
    });
  };

  return (
    <motion.div 
      className={cn(
        "relative rounded-xl overflow-hidden h-full",
        "border shadow-lg dark:shadow-dark-soft"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay:0.2 ,duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -5, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { delay:0.2 ,duration: 0.2 }
      }}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br", gradient, "opacity-50 dark:opacity-30")}></div>
      
      <div className="relative p-6 z-10 flex flex-col h-full">
        {popular && (
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs py-1 px-2 rounded-full font-medium">
            Most Popular
          </div>
        )}
        
        <div className="mb-4 flex items-center space-x-3">
          <div className="bg-background dark:bg-background/80 rounded-full p-2 shadow-md">
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-xl">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        
        <div className="my-5">
          <div className="flex items-baseline">
            <span className="text-4xl font-extrabold">{price}</span>
            <span className="text-sm text-muted-foreground ml-2">/{period}</span>
          </div>
        </div>
        
        <div className="py-4 border-t border-b border-muted mb-6">
          <ul className="space-y-3 flex-grow">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start text-sm">
                <Check size={16} className="mr-2 mt-0.5 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-auto">
          <Button
            className="w-full font-medium"
            variant={popular ? "default" : "outline"}
            onClick={handleChoosePlan}
          >
            {ctaText} <ChevronRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Main PricingAlternatives component
const PricingAlternatives = () => {
  return (
    <div className="container py-16 md:py-24">
      <div className="w-full">
        <div className="text-center mb-16 max-w-3xl mx-auto">
        <motion.span 
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "5rem" }}
              viewport={{ once: true }}
              transition={{ delay:0.2 ,duration: 0.8 }}
              className="inline-block h-1 bg-primary rounded mb-4"
            />
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary dark:from-foreground dark:to-primary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay:0.2 ,duration: 0.5 }}
          >
            Choose Your Plan
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground mb-8 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{once: true}}
            transition={{ delay:0.2 ,duration: 0.5}}
          >
            Flexible options for every career stage
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
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
  );
};

export default PricingAlternatives;