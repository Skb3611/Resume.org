"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getTemplates } from "@/lib/serveractions";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { delay } from "motion";
import { useRouter } from "next/navigation";

const categories = [
  "All",
  "Professional",
  "Creative",
  "Modern",
  "Simple",
  "Tech",
];

interface TemplateImagesData {
  id: number;
  name: string;
  thumbnail: string;
  description: string;
  category: string[];
}

const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.1, // Animates children one after another
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, },
  visible: { opacity: 1, y: 0, transition: { delay: 0.5} },
};

export default function TemplatesPage() {
  const router = useRouter();
  const [data, setData] = useState<TemplateImagesData[]>([]);
  const [Templates, setTemplates] = useState<TemplateImagesData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState<string>("All");

  useEffect(() => {
    (async () => {
      let images = await getTemplates();
      setData(images as TemplateImagesData[]);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (currentCategory === "All") {
      setTemplates([...data]);
    } else {
      setTemplates(
        data.filter((item) =>
          item.category.some((cat) => cat === currentCategory)
        )
      );
    }
  }, [data, currentCategory]);

  const showTemplates = (category: string) => {
    setCurrentCategory(category);
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 min-h-[89vh] mt-20">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" text-xl md:text-3xl font-bold mb-6 text-center"
      >
        Choose Your Resume Template
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5,delay:0.2 }}
      >
        <ScrollArea className="w-full whitespace-nowrap rounded-md border mb-8">
          <div className="flex flex-wrap sm:flex-nowrap justify-start sm:justify-center items-center w-full p-2 sm:p-4 gap-2 sm:gap-4 ">
            {categories.map((category) => (
              <Button
                onClick={() => showTemplates(category)}
                key={category}
                variant="outline"
                size={"lg"}
                className={`flex-shrink-0 focus:bg-primary w-[48%] sm:w-auto`}
              >
                {category}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </motion.div>

      {/* Force Reanimation on Category Change */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={currentCategory} // Key forces re-render when category changes
        className="grid grid-cols-2  lg:grid-cols-3 gap-3 md:gap-8 container lg:max-w-6xl mx-auto"
      >
        {!isLoading
          && Templates.map((item) => (
              <motion.div
              onClick={()=>router.push(`/editor?template=${item.id}`)}
                key={item.id}
                className="group relative aspect-[3/4] overflow-hidden rounded-lg shadow-md"
                variants={itemVariants}
              >
                <Image
                  fill
                  src={item?.thumbnail ?? ""}
                  alt={`${item?.id} template`}
                  className="w-full h-full object-fill "
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:flex flex-col items-center justify-center p-4 hidden">
                  <Button asChild variant="secondary" className="z-10">
                    <Link href={`/editor?template=${item?.id}`}>
                      Use This Template
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))
          
              }
      </motion.div>
    </div>
  );
}
