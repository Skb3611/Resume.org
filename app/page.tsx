"use client";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
// @ts-ignore
import WAVES from "vanta/dist/vanta.waves.min";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import PricingSection from "@/components/home/PricingSection";
import TemplatesSection from "@/components/home/TemplatesSection";
import FeaturesSection from "@/components/home/FeaturesSection";


export default function Page() {
  const Router = useRouter();
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



  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section
          ref={(el) => {
            componentRef.current[0] = el;
          }}
          className="h-screen w-full py-8 sm:py-12 md:py-16 lg:py-24 xl:py-32 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800"
        >
          <div className="container mx-auto px-4 md:px-6 h-full">
            <div className="flex flex-col items-center space-y-4 text-center h-full justify-center">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 15, scale: 0.9 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter mb-3 sm:mb-5 text-white"
                >
                  Create Your Perfect Resume in Minutes
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 15, scale: 0.9 }}
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

        <section
          className="relative container mx-auto w-full lg:py-20 py-10"
          id="features"
        >


          <FeaturesSection />
        </section>

        <section
        
          className="relative py-8 sm:py-12 md:py-16 lg:py-24 bg-secondary dark:bg-background w-full"
          id="templates"
        >
          <TemplatesSection />
        </section>

        <section className="w-full py-8 " id="pricing"
        
        >
          <div className="relative container mx-auto px-4 md:px-6 max-w-7xl">
            <PricingSection />
          </div>
        </section>

        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-24 bg-secondary dark:bg-background"
        
        >
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
