"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getTemplates } from "@/lib/serveractions";
import { Skeleton } from "@/components/ui/skeleton";
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
export default function TemplatesPage() {
  const [data, setdata] = useState<TemplateImagesData[]>([]);
  const [Templates, setTemplates] = useState<TemplateImagesData[]>([]);
  const [Isloading, setIsloading] = useState(true);
  useEffect(() => {
    (async () => {
      let images = await getTemplates();
      setdata(images as TemplateImagesData[]);
      setIsloading(false);
    })();
  }, []);
  useEffect(() => {
    setTemplates([...data])
  }, [data])
  
  const showTEmplates = (cateory: string) => {

    setTemplates(
      data.filter((item) => 
        item.category.some((cat) => cat === cateory)
    ));
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Choose Your Resume Template
      </h1>

      <ScrollArea className="w-full whitespace-nowrap rounded-md border mb-8">
        <div className="flex justify-center items-center w-full space-x-4 p-4">
          {categories.map((category) => (
            <Button
              onClick={() => showTEmplates(category)}
              key={category}
              variant="outline"
              size={"lg"}
              className={`flex-shrink-0 focus:bg-primary`}
            >
              {category}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container lg:max-w-6xl mx-auto">
        {!Isloading
          ? Templates.map((item) => (
              <div
                key={item?.id}
                className="group relative aspect-[3/4] overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
              >
                <Image
                  fill
                  src={item?.thumbnail ?? ""}
                  alt={`${item?.id} template`}
                  className="w-full h-full object-fill transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                  <Button asChild variant="secondary" className="z-10">
                    <Link href={`/editor?template=${item?.id}`}>Use This Template</Link>
                  </Button>
                </div>
              </div>
            ))
          : Array(6)
              .fill(0)
              .map((item) => {
                return (
                  <div
                    key={item.key}
                    className="group relative aspect-[3/4] overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
                  >
                    <Skeleton className="w-full h-full object-fill transition-transform  group-hover:scale-105 bg-foreground/10" />
                  </div>
                );
              })}
      </div>
    </div>
  );
}
