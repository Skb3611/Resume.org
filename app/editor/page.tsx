"use client";
export const dynamic = "force-dynamic";
import { Button } from "@/components/ui/button";
import PersonalDetails from "@/components/TemplateComponents/PersonalDetails";
import EducationDetails from "@/components/TemplateComponents/EducationDetails";
import Common_single_input from "@/components/TemplateComponents/Common_single_input";
import Experience from "@/components/TemplateComponents/Experience";
import CommonComp from "@/components/TemplateComponents/CommonComp";

import React, { useEffect, useRef, useState } from "react";
import {  useSearchParams } from "next/navigation";
import { getTemplateData } from "@/lib/serveractions";
import { ArrowRight, ArrowLeft, Save } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { String } from "aws-sdk/clients/codepipeline";

import Projects from "@/components/TemplateComponents/Projects";
import References from "@/components/TemplateComponents/References";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
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
  const printRef = useRef<HTMLDivElement>(null);
  const [Template, setTemplate] = useState<React.FC<any> | null>(null);
  const [isLoading, setisLoading] = useState(true);
  const params = useSearchParams();

  let router = useRouter();
 
  const handleDownloadPDF = async () => {
    try {
      if (printRef.current) {
        const canvas = await html2canvas(printRef.current, {
          scale: 2,
          useCORS: true,
        });
        const imgData = canvas.toDataURL("image/png");

        // Default PDF page width in mm
        const pdfWidth = 210; // A4 width in mm
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Scale height proportionally to the width

        // Create jsPDF instance with default width and dynamic height
        const pdf = new jsPDF({
          orientation: pdfHeight > pdfWidth ? "portrait" : "landscape",
          unit: "mm",
          format: [pdfWidth, pdfHeight], // Fixed width, dynamic height
        });

        // Add the image to the PDF
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

        // Generate a unique file name using timestamp
        const uniqueName = `resume_${new Date().getTime()}.pdf`;
        pdf.save(uniqueName);
      }
    } catch (error) {
      console.error("Error during PDF download:", error);
    }
  };

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
    func();
  }, []);
  useEffect(() => {
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
      setfinaldata(parsed);
    }

    return () => {};
  }, []);
  const [tabs, setTabs] = useState<String[]>([]);
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
  let handlesave = () => {
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
  };

  const [activeTab, setActiveTab] = useState("PersonalInformation");

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
  if (isLoading){

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 ">
            <div className="min-h-[87vh] ">
              <Card className="p-6 min-h-[87vh] flex flex-col justify-between">
                <Tabs value={activeTab} onValueChange={handleTabChange}>
                  <ScrollArea className="flex w-full h-full ">
                    <TabsList className="flex flex-nowrap w-full h-12 overflow-hidden py-2 justify-around">
                      {tabs.map((item) => {
                        return (
                          <TabsTrigger
                            key={item}
                            value={item}
                            className="py-1.5 px-4"
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
                <div className="flex justify-between mt-3">
                  <Button
                    onClick={handlePrev}
                    className="w-1/5 "
                    disabled={tabs.indexOf(activeTab) === 0}
                  >
                    <ArrowLeft className="mr-2" /> Previous
                  </Button>

                  <Button className="w-1/4 flex" onClick={handlesave}>
                    <Save className="mr-1 mb-1 w-6" />
                    Save Resume
                  </Button>
                  <Button className="w-1/4 flex" onClick={handleDownloadPDF}>
                    <Save className="mr-1 mb-1 w-6" />
                    Download PDF
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={tabs.indexOf(activeTab) === tabs.length - 1}
                    className="w-1/5"
                  >
                    Next <ArrowRight className="ml-2" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          <div className="bg-secondary dark:bg-card w-full p-4 rounded-lg shadow-lg  ">
            {Template &&
              (() => {
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

      ;
                    if (tabs.includes(tabKey)) {
                      // @ts-ignore
                      acc[key] = templateProps[key];
                    }
                    return acc;
                  },
                  {} as Record<string, any> // Ensures that the accumulator is typed correctly
                );

              
                return <Template ref={printRef} {...filteredProps} />;
              })()}
          </div>
        </div>
      </div>
  
    )
  );
}
