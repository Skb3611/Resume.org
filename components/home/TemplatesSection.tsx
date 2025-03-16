import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { headingVariants } from "@/lib/motion-variants";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getTemplates } from "@/lib/serveractions";
interface TemplateImagesData {
  id: number;
  name: string;
  thumbnail: string;
  description: string;
  category: string[];
}
const TemplatesSection = () => {
  const Router = useRouter();
  const [TemplateImages, setTemplateImages] = useState<TemplateImagesData[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchTemplates = async () => {
      const templates = await getTemplates();
      setTemplateImages(templates as TemplateImagesData[]);
      setIsLoading(false);
    };
    fetchTemplates();
  }, []);

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
              Our Templates
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-sm lg:text-base mt-4 max-w-md text-gray-500"
            >
              Choose from a wide range of professionally designed templates to suit your style and industry.
            </motion.p>
          </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 container lg:max-w-6xl mx-auto">
        {(!isLoading && TemplateImages != undefined)
          ? TemplateImages.slice(0, 6)?.map((item, index) => (
              <motion.div
                onClick={() => Router.push(`/editor?template=${item?.id}`)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                key={item.id}
                className="group relative aspect-[3/4] overflow-hidden rounded-lg shadow-md"
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  fill
                  src={item?.thumbnail ?? ""}
                  alt={`${item?.id} template`}
                  className="w-full h-full object-fill"
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
                // <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-md">
                //   <Skeleton className="w-full h-full object-cover bg-foreground/10" />
                // </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  key={index}
                  className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-md"
                >
                </motion.div>
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
  );
};

export default TemplatesSection;
