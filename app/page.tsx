"use client";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Layout, Zap, Award, Download, Edit, Share2 } from "lucide-react";
import Image from "next/image";
import { getTemplates } from "@/lib/serveractions";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
interface TemplateImagesData {
  id: number;
  name: string;
  thumbnail: string;
  description: string;
  category: string[];
}
export default function Page() {
  const Router = useRouter();
  const [TemplateImages, setTemplateImages] = useState<TemplateImagesData[]>(
    []
  );
  const [IsLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      let images = await getTemplates();
      console.log(images);
      setTemplateImages(images as TemplateImagesData[]);
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Create Your Perfect Resume in Minutes
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Build a professional resume that stands out with our
                  easy-to-use builder and variety of expert-designed templates.
                </p>
              </div>
              <div className="space-x-4">
                <Button onClick={() => Router.push("/templates")} size="lg">
                  Get Started for Free
                </Button>
                <Button
                  onClick={() => Router.push("/templates")}
                  variant="outline"
                  size="lg"
                >
                  View Templates
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32" id="features">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Why Choose resume.org?
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <Layout className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Variety of Templates</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Choose from a wide range of professionally designed templates
                  to suit your style and industry.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Zap className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our intuitive builder makes creating a standout resume quick
                  and effortless.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Award className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">ATS-Friendly</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Ensure your resume passes Applicant Tracking Systems with our
                  optimized formats.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Download className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">
                  Multiple Download Formats
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Download your resume in PDF, Word, or plain text formats to
                  suit any application requirement.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Edit className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Real-time Editing</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  See changes to your resume in real-time as you edit, ensuring
                  perfect formatting every time.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Share2 className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Easy Sharing</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Share your resume directly with employers or on social media
                  platforms with a single click.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className=" py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 w-full"
          id="templates"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Our Templates
            </h2>
            <div className="grid gap-y-6 gap-x-0 sm:grid-cols-2 lg:grid-cols-3 place-items-center w-[80%] mx-auto ">
              {!IsLoading
                ? TemplateImages.slice(0, 6)?.map((item) => (
                    <div
                      key={item?.id}
                      className="relative group overflow-hidden rounded-lg shadow-lg h-[60vh] w-72"
                    >
                      <Image
                        fill
                        src={item?.thumbnail ?? ""}
                        alt={`Template ${item.id}`}
                        className="  object-fill transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          onClick={() =>
                            Router.push("/editor?template=" + item?.id)
                          }
                          variant="secondary"
                        >
                          Use This Template
                        </Button>
                      </div>
                    </div>
                  ))
                : Array(6)
                    .fill(0)
                    .map((item) => {
                      return (
                        <div
                          key={Math.random()}
                          className="relative group overflow-hidden rounded-lg shadow-lg h-[60vh] w-72"
                        >
                          <Skeleton className="h-full w-full bg-foreground/10" />
                        </div>
                      );
                    })}
            </div>
            <div className="mt-12 text-center">
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

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
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

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Build Your Perfect Resume?
                </h2>
                <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
                  Join thousands of job seekers who have successfully landed
                  their dream jobs with our resume builder.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="space-x-4">
                  <Button
                    onClick={() => Router.push("/templates")}
                    size="lg"
                    variant="secondary"
                  >
                    Get Started for Free
                  </Button>
                  <Button
                    onClick={() => Router.push("/templates")}
                    variant="secondary"
                    size="lg"
                  >
                    View Templates
                  </Button>
                </div>
                <p className="text-xs text-primary-foreground/60">
                  By signing up, you agree to our Terms and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
