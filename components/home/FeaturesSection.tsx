import React from 'react'
import { Layout, Zap, Award, Download, Edit, Share2 } from "lucide-react";
import { motion } from "motion/react"
import { containerVariants, headingVariants, itemVariants } from "@/lib/motion-variants";
const features = [
    {
      icon: Layout,
      title: "Variety of Templates",
      description:
        "Choose from a wide range of professionally designed templates to suit your style and industry.",
    },
    {
      icon: Zap,
      title: "Easy to Use",
      description:
        "Our intuitive builder makes creating a standout resume quick and effortless.",
    },
    {
      icon: Award,
      title: "ATS-Friendly",
      description:
        "Ensure your resume passes Applicant Tracking Systems with our optimized formats.",
    },
    {
      icon: Download,
      title: "Multiple Download Formats",
      description:
        "Download your resume in PDF, Word, or plain text formats to suit any application requirement.",
    },
    {
      icon: Edit,
      title: "Real-time Editing",
      description:
        "See changes to your resume in real-time as you edit, ensuring perfect formatting every time.",
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description:
        "Share your resume directly with employers or on social media platforms with a single click.",
    },
  ];
const FeaturesSection = () => {
  return (
    <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center lg:mb-16 mb-8 text-center">
            <motion.span 
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "5rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="inline-block h-1 bg-primary rounded mb-6"
            />
            
            <motion.h2 
              variants={headingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:text-3xl text-2xl md:text-5xl font-bold tracking-tighter"
            >
              Why Choose resume.org?
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-sm lg:text-base mt-4 max-w-md text-gray-500"
            >
              We've reimagined the resume creation process to help you stand out
            </motion.p>
          </div>
          
          <motion.div 
            className="grid max-w-6xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 md:gap-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => {
              const colors = [
                'bg-blue-50 text-blue-600', 
                'bg-amber-50 text-amber-600', 
                'bg-emerald-50 text-emerald-600',
                'bg-violet-50 text-violet-600',
                'bg-rose-50 text-rose-600',
                'bg-cyan-50 text-cyan-600'
              ];
              const colorClass = colors[index % colors.length];
              
              return (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  className="flex flex-col items-start p-6 rounded-lg backdrop-blur-lg bg-foreground/5 shadow-sm shadow-foreground/25  "
                >
                  <div className="flex items-center justify-center gap-5 mb-2 md:flex-col md:items-start md:gap-2 md:mb-0">

                  <motion.div 
                    className={`rounded-xl p-3 ${colorClass.split(' ')[0]}`}
                    whileHover={{ 
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                    }}
                    >
                    <feature.icon className={`h-6 w-6 ${colorClass.split(' ')[1]}`} />
                    
                  </motion.div>
                  <h3 className=" lg:text-xl font-medium block">{feature.title}</h3>

                    </div>
                  <p className="mt-2 text-sm lg:text-base text-gray-500">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
  )
}

export default FeaturesSection

