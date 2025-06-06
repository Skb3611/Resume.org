"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
export const dynamic = "force-dynamic";
import { Button } from "@/components/ui/button";
import PersonalDetails from "@/components/TemplateComponents/PersonalDetails";
import EducationDetails from "@/components/TemplateComponents/EducationDetails";
import Common_single_input from "@/components/TemplateComponents/Common_single_input";
import Experience from "@/components/TemplateComponents/Experience";
import CommonComp from "@/components/TemplateComponents/CommonComp";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  checkAccountLimit,
  createTemplate,
  getTemplateData,
  getUserTemplateData,
  updateTemplate,
} from "@/lib/serveractions";
import { ArrowRight, ArrowLeft, Save, Download, Bookmark } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactDOM from "react-dom/client";
import Projects from "@/components/TemplateComponents/Projects";
import References from "@/components/TemplateComponents/References";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { handleDownloadPDF } from "@/lib/utils";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Session } from "inspector/promises";
import Link from "next/link";
import Image from "next/image";
export interface PersonalData {
  name: string;
  role: string;
  aboutme: string;
  phone: string;
  email: string;
  address: string;
}

export interface EducationData {
  index: number;
  degree: string;
  location: string;
  university: string;
  date: Date | null | undefined;
}
export interface Common_Single_Input_Data {
  data: string;
  index: number;
}
export type SkillsData = Common_Single_Input_Data;
export type LanguagesData = Common_Single_Input_Data;
export type HobbiesData = Common_Single_Input_Data;
export interface ExperienceData {
  index: number;
  company: string;
  position: string;
  summary: string;
  startdate: Date | null | undefined;
  enddate: Date | null | undefined;
}
export interface CommonData {
  index: number;
  company: string;
  title: string;
  date: Date | null | undefined;
}
export type AwardsData = CommonData;
export type CertificationData = CommonData;

export interface ProjectsData {
  index: number;
  title: string;
  description: string;
  technologies: string;
}
export interface ReferencesData {
  name: string;
  position: string;
  company: string;
  phone: string;
}

export default function ResumeBuilder() {
  let root: ReactDOM.Root | null = null;
  const printRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [Template, setTemplate] = useState<React.FC<any> | null>(null);
  const [isLoading, setisLoading] = useState(true);
  const params = useSearchParams();
  let { data: session, status } = useSession();
  let router = useRouter();
  const [tabs, setTabs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [personaldata, setpersonaldata] = useState<PersonalData>({
    name: "",
    role: "",
    aboutme: "",
    phone: "",
    email: "",
    address: "",
  });
  const [educationdata, seteducationdata] = useState<EducationData[]>([
    { index: 0, date: null, degree: "", location: "", university: "" },
  ]);
  const [SkillsData, setSkillsData] = useState<SkillsData[]>([
    { data: "", index: 0 },
  ]);
  const [languagesdata, setlanguagesdata] = useState<LanguagesData[]>([
    { data: "", index: 0 },
  ]);
  const [experiencedata, setexperiencedata] = useState<ExperienceData[]>([
    {
      index: 0,
      company: "",
      position: "",
      summary: "",
      startdate: null,
      enddate: null,
    },
  ]);
  const [awards, setawards] = useState<AwardsData[]>([
    { index: 0, company: "", title: "", date: null },
  ]);
  const [certifications, setcertifications] = useState<CertificationData[]>([
    { index: 0, company: "", title: "", date: null },
  ]);
  const [projects, setprojects] = useState<ProjectsData[]>([
    {
      index: 0,
      title: "",
      description: "",
      technologies: "",
    },
  ]);
  const [hobbies, sethobbies] = useState<HobbiesData[]>([
    { data: "", index: 0 },
  ]);
  const [references, setreferences] = useState<ReferencesData>({
    name: "",
    position: "",
    company: "",
    phone: "",
  });
  const [finaldata, setfinaldata] = useState({});
  const [user, setuser] = useState<any>(null);

  const func = async () => {
    let id = params.get("template");
    if (!id) router.push("/templates");
    let templateData = await getTemplateData(parseInt(id ?? ""));
    try {
      const templateModule = await import(
        `@/components/Templates/Template${id}/Template`
      );
      setTemplate(() => templateModule.default); // Dynamically setting the Template component
      if (templateData) {
        let arr = [];
        for (const key in templateData) {
          templateData[key] == true ? arr.push(key) : null;
        }
        setTabs([...arr]);
      }
    } catch (error) {
      console.error("Error loading template:", error);
      router.push("/templates");
    } finally {
      setisLoading(false);
    }
  };
  useEffect(() => {
    console.log(session);
    let custom_user = JSON.parse(localStorage.getItem("custom_user")!);
    if (custom_user) {
      setuser(custom_user);
      return;
    }
    if (status === "authenticated") {
      console.log("authenticated");
      setuser(session?.user);
      return;
    }
  }, [session, status]);
  useEffect(() => {
    (async () => {
      // console.log(session, status);
      if (!user) return;
      let isAccountLimit = await checkAccountLimit(
        user?.id,
        parseInt(params.get("template") as string)
      );
      if (!isAccountLimit?.status) {
        toast.error(isAccountLimit?.message, {
          description: "Please upgrade your account to create more resumes",
          duration: 5000,
        });
        router.push("/#pricing");
        return;
      }
      let isTemplateCreated = await createTemplate(
        parseInt(params.get("template") as string),
        user?.id,
        finaldata
      );
      if (!isTemplateCreated) {
        let data = await getUserTemplateData(
          parseInt(params.get("template") as string),
          user?.id
        );
        // console.log(data);
        if (data?.data && Object.keys(data.data).length !== 0) {
          localStorage.setItem("resume", JSON.stringify(data?.data));
        }
      }
      const resume = localStorage.getItem("resume");
      if (resume) {
        const parsed = JSON.parse(resume);
        setpersonaldata(parsed);
        seteducationdata(parsed?.Education);
        setSkillsData(parsed?.Skills);
        setexperiencedata(parsed?.Experience);
        setProgress(parsed?.progress);
        setlanguagesdata(parsed?.Languages);
        setprojects(parsed?.Projects);
        sethobbies(parsed?.Hobbies);
        setreferences(parsed?.References);
        setcertifications(parsed?.Certifications);
        setawards(parsed?.Awards);
        // setfinaldata(parsed);
      }
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      if (!user) return;

      if (status === "authenticated") {
        await updateTemplate(
          parseInt(params.get("template") as string),
          user?.id,
          finaldata
        );
      }
    })();
  }, [finaldata]);
  useEffect(() => {
    if (!user) return;
    func();
  }, [user]);

  let handlesave = async () => {
    setfinaldata({
      ...personaldata,
      Education: educationdata,
      Skills: SkillsData,
      Experience: experiencedata,
      Languages: languagesdata,
      Projects: projects,
      Hobbies: hobbies,
      References: references,
      Certifications: certifications,
      Awards: awards,
    });
    localStorage.setItem(
      "resume",
      JSON.stringify({
        ...personaldata,
        Education: educationdata,
        Skills: SkillsData,
        Experience: experiencedata,
        Languages: languagesdata,
        Projects: projects,
        Hobbies: hobbies,
        References: references,
        Certifications: certifications,
        Awards: awards,
      })
    );
    let bool = updateTemplate(
      parseInt(params.get("template") as string),
      (session?.user as { id?: string }).id ?? "",
      finaldata
    );
    if (bool)
      toast.promise(bool, {
        loading: "Saving...",
        success: "Saved successfully",
        error: "Error saving",
      });
  };

  const [activeTab, setActiveTab] = useState<string>("PersonalInformation");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleNext = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };
  const renderTemplate = () => {
    const templateProps = {
      PersonalInformationData: {
        name: personaldata.name,
        role: personaldata.role,
        aboutme: personaldata.aboutme,
        phone: personaldata.phone,
        email: personaldata.email,
        address: personaldata.address,
      },
      EducationData: educationdata,
      SkillsData: SkillsData,
      ExperienceData: experiencedata,
      LanguagesData: languagesdata,
      ProjectsData: projects,
      HobbiesData: hobbies,
      ReferencesData: references,
      CertificationsData: certifications,
      AwardsData: awards,
    };

    const filteredProps: Record<string, any> = Object.keys(
      templateProps
    ).reduce(
      (acc, key) => {
        // Remove 'Data' suffix from the key and compare it with the tabs
        const tabKey = key.replace("Data", ""); // This gives you 'PersonalInformation', 'Education', etc.

        if (tabs.includes(tabKey)) {
          // @ts-ignore
          acc[key] = templateProps[key];
        }
        return acc;
      },
      {} as Record<string, any> // Ensures that the accumulator is typed correctly
    );

    return Template && <Template ref={printRef} {...filteredProps} />;
  };

  const handleDownload = () => {
    console.log("aaaaaaaaaaaaaaaa");
    try {
      console.log(ref.current);
      if (printRef.current) {
        handleDownloadPDF(printRef);
      }
      if (ref.current) {
        // Only render if Template is available
        if (Template) {
          // Create root if it doesn't exist
          if (!root) {
            root = ReactDOM.createRoot(ref.current); // Create root for the container
          }

          // Use the existing root to render the component dynamically
          root.render(renderTemplate());
          // Trigger the download after rendering completes
          setTimeout(() => {
            handleDownloadPDF(printRef); // Now generate the PDF after render
          }, 500); // 500ms for worst-case rendering time
        }
      }
    } catch (error) {
      console.error("Error during PDF download:", error);
    }
  };
  const renderComponent = () => {
    return tabs.map((tab) => {
      switch (tab) {
        case "PersonalInformation":
          return (
            <TabsContent
              key="PersonalInformation"
              value="PersonalInformation"
              className="mt-6"
            >
              <PersonalDetails data={personaldata} setdata={setpersonaldata} />
            </TabsContent>
          );
        case "Education":
          return (
            <TabsContent key="Education" value="Education" className="mt-6">
              <EducationDetails
                data={educationdata}
                setdata={seteducationdata}
              />
            </TabsContent>
          );
        case "Skills":
          return (
            <TabsContent key="Skills" value="Skills" className="mt-6">
              <Common_single_input
                data={SkillsData}
                setdata={setSkillsData}
                title="Skills"
              />
            </TabsContent>
          );
        case "Languages":
          return (
            <TabsContent key="Languages" value="Languages" className="mt-6">
              <Common_single_input
                data={languagesdata}
                setdata={setlanguagesdata}
                title="Languages"
              />
            </TabsContent>
          );
        case "Experience":
          return (
            <TabsContent key="Experience" value="Experience" className="mt-6">
              <Experience data={experiencedata} setdata={setexperiencedata} />
            </TabsContent>
          );
        case "Awards":
          return (
            <TabsContent key="Awards" value="Awards" className="mt-6">
              <CommonComp title="Awards" data={awards} setdata={setawards} />
            </TabsContent>
          );
        case "Certifications":
          return (
            <TabsContent
              key="Certifications"
              value="Certifications"
              className="mt-6"
            >
              <CommonComp
                title="Certifications"
                data={certifications}
                setdata={setcertifications}
              />
            </TabsContent>
          );
        case "Projects":
          return (
            <TabsContent key="Projects" value="Projects" className="mt-6">
              <Projects data={projects} setdata={setprojects} />
            </TabsContent>
          );
        case "References":
          return (
            <TabsContent key="References" value="References" className="mt-6">
              <References data={references} setdata={setreferences} />
            </TabsContent>
          );
        case "Hobbies":
          return (
            <TabsContent key="Hobbies" value="Hobbies" className="mt-6">
              <Common_single_input
                data={hobbies}
                setdata={sethobbies}
                title="Hobbies"
              />
            </TabsContent>
          );
      }
    });
  };
  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 ">
            <div className="min-h-[87vh] ">
              <Skeleton className="p-6 min-h-[87vh] bg-secondary dark:bg-card"></Skeleton>
            </div>
          </div>

          <Skeleton className="bg-secondary dark:bg-card w-full p-4 rounded-lg shadow-lg  "></Skeleton>
        </div>
      </div>
    );
  }
  return (
    !isLoading && (
      <div className="container mx-auto p-4">
        <header className="flex items-center justify-between mb-5">
          <div className="logo">
            <Link className="flex items-center justify-center" href="/">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Image
                  src="https://resume-org.vercel.app/favicon.ico"
                  alt="logo"
                  width={25}
                  height={25}
                  className="dark:invert h-4 w-4 sm:h-auto sm:w-auto"
                  
                />
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className=" text-xs sm:text-2xl font-bold"
              >
                esume.org
              </motion.span>
            </Link>
          </div>
          <div className="button flex items-center gap-2 justify-center">
            <Button
              variant="outline"
              className="text-xs px-2 py-1 md:text-sm md:px-4 md:py-2"
              onClick={() => router.push("/")}
            >
              
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">
                Return Home</span>
              <span className="sm:hidden">Home</span>
            </Button>
            <Button
              className="text-xs px-2 py-1 md:text-sm md:px-4 md:py-2"
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </Button>
          </div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 "
          >
            <div className="min-h-[87vh] ">
              <Card className="md:p-6 p-4 min-h-[87vh] flex flex-col justify-between">
                <Tabs value={activeTab} onValueChange={handleTabChange}>
                  <ScrollArea className="flex w-full h-full ">
                    <TabsList className="flex flex-nowrap w-full h-10 md:h-12 overflow-hidden md:py-2 py-1 justify-around">
                      {tabs.map((item) => {
                        return (
                          <TabsTrigger
                            key={item}
                            value={item}
                            className="py-1.5 px-4 text-xs md:text-sm"
                          >
                            {item}
                          </TabsTrigger>
                        );
                      })}
                    </TabsList>
                    <ScrollBar orientation="horizontal" className="h-[5px]" />
                  </ScrollArea>
                  {renderComponent()}
                </Tabs>
                <div className="grid grid-cols-2 lg:grid-cols-4  justify-between gap-2  mt-3">
                  <Button
                    onClick={handlePrev}
                    className=" hidden lg:flex px-2 xl:px-4"
                    disabled={tabs.indexOf(activeTab) === 0}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    <span className="hidden md:inline text-xs xl:text-sm ">
                      Previous
                    </span>
                  </Button>

                  <Button className="flex px-2 xl:px-4" onClick={handlesave}>
                    <Bookmark className="mr-1 mb-1 h-4 w-4" />
                    <span className="text-xs xl:text-sm">Save</span>
                  </Button>
                  <Button
                    className="flex px-2 xl:px-4"
                    onClick={handleDownload}
                  >
                    <Download className="mr-1 mb-1 h-4 w-4" />
                    <span className="text-xs xl:text-sm">Download</span>
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={tabs.indexOf(activeTab) === tabs.length - 1}
                    className=" hidden lg:flex px-2 xl:px-4"
                  >
                    <span className="hidden md:inline text-xs xl:text-sm ">
                      Next
                    </span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-secondary dark:bg-card w-full p-4 rounded-lg shadow-lg md:block hidden  "
          >
            {Template && renderTemplate()}
          </motion.div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="w-full">View Resume</Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[100dvh] w-[100dvw]">
                <div className="bg-secondary dark:bg-card w-full  rounded-lg shadow-lg h-full overflow-auto py-2 grid place-items-center ">
                  {Template && renderTemplate()}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div
          ref={ref}
          className="w-[450px] absolute -top-[9999px] -left-[9999px] h-full lg:hidden"
        ></div>
      </div>
    )
  );
}
