"use client";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Layout, Zap, Award, Download, Edit, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getTemplates } from "@/lib/serveractions";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
// @ts-ignore
import WAVES from "vanta/dist/vanta.waves.min";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import type { Variants } from "motion/react";

interface TemplateImagesData {
  id: number;
  name: string;
  thumbnail: string;
  description: string;
  category: string[];
}

export default function Page() {
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
  const Router = useRouter();
  const [TemplateImages, setTemplateImages] = useState<TemplateImagesData[]>(
    []
  );
  const [IsLoading, setIsLoading] = useState(true);

  const componentRef = useRef<HTMLElement[] | null[]>([]);
  useEffect(() => {
    // Apply the Vanta Waves effect to each div in the ref array
    componentRef.current.forEach((div) => {
      if (div) {
        WAVES({
          el: div, // Apply Vanta Waves effect to each div
          THREE,
          color: "#e11d48", // Customize wave color
          shininess: 50, // Customize shininess
          waveHeight: 25, // Height of the waves
          waveSpeed: 1.5, // Speed of wave animation
          zoom: 1, // Zoom level
          backgroundColor: 0x000000,
          gyroControls: true, // Disable gyroscope controls
        });
      }
    });

    // Cleanup effect when component unmounts
    return () => {
      componentRef.current.forEach((div) => {
        if (div) {
          // Make sure to remove the effect when the component unmounts
          WAVES({ el: div }).destroy();
        }
      });
    };
  }, []);

  useEffect(() => {
    (async () => {
      let images = await getTemplates();
      setTemplateImages(images as TemplateImagesData[]);
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section
          ref={(el) => {
            componentRef.current[0] = el;
          }}
          className="h-[91vh] w-full py-8 sm:py-12 md:py-16 lg:py-24 xl:py-32 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800"
        >
          <div className="container mx-auto px-4 md:px-6 h-full">
            <div className="flex flex-col items-center space-y-4 text-center h-full justify-center">
              <div>
                <motion.h1
                  initial={{ opacity: 0,y:15,  scale: 0.9 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0,  scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter mb-3 sm:mb-5 text-white"
                >
                  Create Your Perfect Resume in Minutes
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 15, scale: 0.9  }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="mx-auto max-w-[700px] text-white text-sm sm:text-base md:text-lg xl:text-xl"
                >
                  Build a professional resume that stands out with our
                  easy-to-use builder and variety of expert-designed templates.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="space-y-2 sm:space-y-0 sm:space-x-4 my-1 flex flex-col items-center justify-center sm:flex-row"
              >
                <Button
                  onClick={() => Router.push("/templates")}
                  size="lg"
                  variant={"outline"}
                  className="w-full"
                >
                  Get Started for Free
                </Button>
                <Button
                  onClick={() => Router.push("/templates")}
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  View Templates
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="container mx-auto w-full py-20 bg-background dark:bg-background" id="features">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center mb-16 text-center">
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
              className="text-3xl md:text-5xl font-bold tracking-tighter"
            >
              Why Choose resume.org?
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-4 max-w-md text-gray-500"
            >
              We've reimagined the resume creation process to help you stand out
            </motion.p>
          </div>
          
          <motion.div 
            className="grid max-w-6xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
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
                  <motion.div 
                    className={`rounded-xl p-3 ${colorClass.split(' ')[0]}`}
                    whileHover={{ 
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                    }}
                  >
                    <feature.icon className={`h-6 w-6 ${colorClass.split(' ')[1]}`} />
                  </motion.div>
                  <h3 className="mt-4 text-xl font-medium">{feature.title}</h3>
                  <p className="mt-2 text-gray-500">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

        <section
          className="py-8 sm:py-12 md:py-16 lg:py-24 bg-gray-100 dark:bg-gray-800 w-full"
          id="templates"
        >
          <div className="container mx-auto px-4 md:px-6">
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center mb-8 sm:mb-12"
            >
              Our Templates
            </motion.h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 container lg:max-w-6xl mx-auto">
              {!IsLoading && TemplateImages != undefined
                ? TemplateImages.slice(0, 6)?.map((item, index) => (
                    <motion.div
                      onClick={() =>
                        Router.push(`/editor?template=${item?.id}`)
                      }
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      key={item.id}
                      className="group relative aspect-[3/4] overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
                    >
                      <Image
                        fill
                        src={item?.thumbnail ?? ""}
                        alt={`${item?.id} template`}
                        className="w-full h-full object-fill transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:flex flex-col items-center justify-center p-4 hidden">
                        <Button asChild variant="secondary" className="z-10">
                          <Link href={`/editor?template=${item?.id}`}>
                            Use this Template
                          </Link>
                        </Button>
                      </div>
                    </motion.div>
                  ))
                : Array(6)
                    .fill(0)
                    .map((_, index) => (
                      <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-md">
                      <Skeleton className="w-full h-full object-cover bg-foreground/10" />
                      </div>
                      // <motion.div
                      //   initial={{ opacity: 0, scale: 0.8 }}
                      //   whileInView={{ opacity: 1, scale: 1 }}
                      //   viewport={{ once: true }}
                      //   transition={{ duration: 0.4, delay: index * 0.2 }}
                      //   key={index}
                      //   className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-md"
                      // >
                      // </motion.div>
                    ))}
            </div>
            <div className="mt-8 sm:mt-12 text-center">
              <Button
                onClick={() => Router.push("/templates")}
                variant="outline"
                size="lg"
              >
                View All Templates
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center mb-8 sm:mb-12">
              Frequently Asked Questions
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full max-w-3xl mx-auto"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  How easy is it to use resume.org?
                </AccordionTrigger>
                <AccordionContent>
                  Our platform is designed to be user-friendly and intuitive.
                  You can create a professional resume in just a few minutes by
                  following our step-by-step process.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Can I download my resume in different formats?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, you can download your resume in PDF, Word, and plain text
                  formats. This allows you to have the right format for any
                  application requirement.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Are the resumes created on resume.org ATS-friendly?
                </AccordionTrigger>
                <AccordionContent>
                  All our templates are designed to be ATS (Applicant Tracking
                  System) friendly, ensuring that your resume can be easily read
                  and parsed by these systems.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  How often can I update my resume?
                </AccordionTrigger>
                <AccordionContent>
                  You can update your resume as often as you like. We encourage
                  users to keep their resumes up-to-date and tailor them for
                  specific job applications.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section
          ref={(el) => {
            componentRef.current[2] = el;
          }}
          className="w-full py-8 sm:py-12 md:py-16 lg:py-24 bg-primary text-primary-foreground"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <motion.h2
                  initial={{ opacity: 0, y: 25 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter"
                >
                  Ready to Build Your Perfect Resume?
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 25 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mx-auto max-w-[600px] text-primary-foreground/80 text-sm sm:text-base md:text-lg"
                >
                  Join thousands of job seekers who have successfully landed
                  their dream jobs with our resume builder.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="w-full max-w-sm space-y-2"
              >
                <div className="space-y-2 sm:space-y-0 sm:space-x-4">
                  <Button
                    onClick={() => Router.push("/templates")}
                    size="lg"
                    variant="secondary"
                    className="w-full sm:w-auto mb-2 sm:mb-0"
                  >
                    Get Started for Free
                  </Button>
                  <Button
                    onClick={() => Router.push("/templates")}
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    View Templates
                  </Button>
                </div>
                <p className="text-xs text-primary-foreground/60">
                  By signing up, you agree to our Terms and Privacy Policy.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

interface FeatureProps {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}

function FeatureCard({ icon: Icon, title, description, index }: FeatureProps) {
  return (
    <motion.div
      className="flex flex-col items-center text-center"
      initial="offscreen"
      viewport={{ once: true }}
      whileInView="onscreen"
      variants={featureVariants}
      custom={index}
    >
      <Icon className="h-10 w-10 sm:h-12 sm:w-12 mb-4 text-primary" />
      <h3 className="text-lg sm:text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </motion.div>
  );
}

const featureVariants: Variants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: (index) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.5,
      delay: index * 0.2,
    },
  }),
};

const cardVariants: Variants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 1,
    },
  },
};
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    }
  }
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    }
  }
};