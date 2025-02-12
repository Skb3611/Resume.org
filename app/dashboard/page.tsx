"use client";
// @ts-ignore
import WAVES from "vanta/dist/vanta.waves.min";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import {
  Edit,
  Trash2,
  Star,
  Clock,
  Settings as SettingsIcon,
  Menu,
  User,
  FileSpreadsheet,
  Layout,
  History,
  Download,
  FileEdit,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { getLargerProfileImage, handleDownloadPDF } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import ReactDOM from "react-dom/client";
import TemplatesPage from "../templates/page";
import UserSettings from "@/components/User_Settings";
import { getUserTemplates } from "@/lib/serveractions";

const resumeTemplates = [
  { id: "professional", name: "Professional" },
  { id: "creative", name: "Creative" },
  { id: "simple", name: "Simple" },
  { id: "modern", name: "Modern" },
];

const savedResumes = [
  { id: 1, name: "Software Engineer Resume", lastEdited: "2 days ago" },
  { id: 2, name: "Product Manager Resume", lastEdited: "1 week ago" },
  { id: 3, name: "Data Analyst Resume", lastEdited: "3 weeks ago" },
];

const historyLog = [
  { action: "Edited Software Engineer Resume", timestamp: "2 days ago" },
  { action: "Changed template to Modern", timestamp: "1 week ago" },
  { action: "Downloaded Product Manager Resume", timestamp: "2 weeks ago" },
  { action: "Created Data Analyst Resume", timestamp: "3 weeks ago" },
];

export default function UserDashboard() {
  const { data: session } = useSession();
  const [user, setuser] = useState<any>(null);
  console.log(user)
  const [activeTab, setActiveTab] = useState("profile");
  const componentRef = useRef(null);
  const [Templates, setTemplates] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const printRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  let root: ReactDOM.Root | null = null;
  useEffect(() => {
    // Apply the Vanta Waves effect to each div in the ref array
    let effectInstance: any;
    if (componentRef.current) {
      effectInstance = WAVES({
        el: componentRef.current, // Apply Vanta Waves effect to each div
        THREE,
        color: "#e11d48", // Customize wave color
        shininess: 50, // Customize shininess
        waveHeight: 25, // Height of the waves
        waveSpeed: 1.5, // Speed of wave animation
        zoom: 1, // Zoom level
        backgroundColor: 0x000000,
      });
    }
    return () => {
      // @ts-ignore
      effectInstance?.destroy();
    };
  }, [activeTab]);

  useEffect(() => {
    console.log("_________user effect________");
    if (session) {
      setuser(session?.user);
    } else {
      let a = localStorage.getItem("custom_user");
      if (a) {
        setuser(JSON.parse(a));
      }
    }
  }, [session]);

  useEffect(() => {
    console.log("_________templates effect________");
    if (user?.id) {
      (async () => {
        let templates = await getUserTemplates(user?.id ?? "");
        console.log(templates);
        setTemplates(templates);
      })();
    }
    setIsLoading(false);
  }, [user]);

  const handleDownload = async (template: any) => {
    try {
      // Dynamically import the template component
      const TemplateModule = await import(
        `@/components/Templates/Template${template.templateId}/Template`
      );
      const Template = TemplateModule.default; // Get the template component

      // Prepare the props for the template
      const templateProps = prepareTemplateProps(template.data);

      // Ensure ref.current is available
      if (ref.current) {
        // Only render if Template is available
        if (Template) {
          // Create root if it doesn't exist
          if (!root) {
            root = ReactDOM.createRoot(ref.current); // Create root for the container
          }

          // Use the existing root to render the component dynamically
          root.render(<Template ref={printRef} {...templateProps} />);
          if (printRef.current) {
            printRef.current.style.position = "absolute";
            printRef.current.style.top = "-9999px"; // Move the element far off-screen
            printRef.current.style.left = "-9999px"; // Ensure it doesn't affect the page layout
            printRef.current.style.visibility = "hidden"; // Hide it from the page view
          }
          // Trigger the download after rendering completes
          setTimeout(() => {
            handleDownloadPDF(printRef); // Now generate the PDF after render
          }, 500); // 500ms for worst-case rendering time
        }
      }
    } catch (error) {
      console.error("Error during template rendering or download:", error);
    }
  };
  const getProvider=(provider:string) => {
    switch(provider){
      case "google":
        return <Image  height={40} width={40} src="/logos/google.png" alt="Google"/>;
      case "twitter":
        return <Image height={40} width={40} src="/logos/twitter.png" alt="Twitter"/>;
      case "linkedin":
        return <Image  height={40} width={40}src="/logos/linkedin.png" alt="Linkedin"/>;
      default:
        return "Custom Auth "
  }
}
  
  /**
   * Dynamically maps template data to Template props.
   * Ensures that only available data is passed to the Template component.
   */
  const prepareTemplateProps = (data: Record<string, any>) => {
    const templateProps: Record<string, any> = {};

    // Check and map available fields to the expected props
    if (
      data.name ||
      data.role ||
      data.aboutme ||
      data.phone ||
      data.email ||
      data.address
    ) {
      templateProps.PersonalInformationData = {
        name: data.name || "",
        role: data.role || "",
        aboutme: data.aboutme || "",
        phone: data.phone || "",
        email: data.email || "",
        address: data.address || "",
      };
    }

    if (data.Education?.length) {
      templateProps.EducationData = data.Education;
    }

    if (data.Skills?.length) {
      templateProps.SkillsData = data.Skills;
    }

    if (data.Experience?.length) {
      templateProps.ExperienceData = data.Experience;
    }

    if (data.Languages?.length) {
      templateProps.LanguagesData = data.Languages;
    }

    if (data.Projects?.length) {
      templateProps.ProjectsData = data.Projects;
    }

    if (data.Hobbies?.length) {
      templateProps.HobbiesData = data.Hobbies;
    }

    if (data.References) {
      templateProps.ReferencesData = data.References;
    }

    if (data.Certifications?.length) {
      templateProps.CertificationsData = data.Certifications;
    }

    if (data.Awards?.length) {
      templateProps.AwardsData = data.Awards;
    }

    return templateProps;
  };

 

  

 
  
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <>
            <section className="">
              <div
                ref={componentRef}
                className="header h-[30dvh] bg-white relative"
              >
                <Avatar className="w-52 h-52 rounded-full absolute -bottom-24 left-8 object-cover outline-foreground outline outline-offset-1 bg-black bg-background">
                  <AvatarImage
                    src={getLargerProfileImage(user?.image, 400)}
                    alt="user-image"
                  />
                  <AvatarFallback>
                    {/* <AvatarImage src={user?.image} alt="user-image" className="w-52 h-52 rounded-full absolute -bottom-24 left-8 object-cover" /> */}{" "}
                    {user?.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="max-w-6xl m-auto">
                <div className="info mt-28  flex justify-between items-center">
                  <div className="w-1/2">
                    <h1 className="text-3xl font-semibold w-full">
                      {!isLoading ? (
                        user?.name
                      ) : (
                        <Skeleton className="w-2/4 h-8 rounded-md bg-muted my-2" />
                      )}
                    </h1>
                    <div className="text-lg text-muted-foreground">
                      {!isLoading ? (
                        user?.email ?? "No email"
                      ) : (
                        <Skeleton className="w-3/4 h-5 rounded-md bg-muted my-2" />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-around w-full">
                    <Card className="w-1/3">
                      <CardHeader>
                        <CardTitle className="text-center mb-2">
                          Provider Type
                        </CardTitle>
                        <CardDescription className=" m-auto">
                          {user ? getProvider(user?.provider as string):"Loading..."}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    <Card className="w-1/3">
                      <CardHeader>
                        <CardTitle className="text-center mb-2">
                          Resumes Created
                        </CardTitle>
                        <CardDescription className=" m-auto text-3xl">
                          {Templates.length}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
                <div className="resumes my-10">
                  <Card>
                    <CardHeader>
                      <CardTitle>Saved Resumes</CardTitle>
                      <CardDescription>
                        View and manage your saved resumes
                      </CardDescription>
                    </CardHeader>
                    <CardContent key={"Resumes"} className="flex flex-wrap justify-between gap-5">
                      {!isLoading && Templates.length == 0 ? (
                        <div key="NoResumes">No resumes</div>
                      ) : (
                        Templates.map((item: any) => {
                          return (
                            <Card
                              key={item.id}
                              className="w-full sm:w-1/3 lg:w-[30%] p-4 h-[60dvh]"
                            >
                              <CardContent className="relative h-[40vh] ">
                                <Image
                                  fill
                                  src={`${process.env.NEXT_PUBLIC_PUBLIC_ACCESS_URL}Templates/Template${item.templateId}/preview.jpg`}
                                  alt={""}
                                  className="object-contain h-full w-full"
                                ></Image>
                              </CardContent>
                              <CardFooter className="mt-1 flex-col justify-between gap-2">
                                <div>
                                  <p className="text-center">
                                    Created at:{" "}
                                    {item.createdAt.toLocaleString("en-US", {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    })}
                                  </p>
                                  <p className="text-center">
                                    Last updated:{" "}
                                    {item.updatedAt.toLocaleString("en-US", {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    })}
                                  </p>
                                </div>
                                <div className="space-x-4">
                                  <Button onClick={() => handleDownload(item)}>
                                    <Download />
                                  </Button>
                                  <Button>
                                    <FileEdit
                                      onClick={() =>
                                        router.push(
                                          `editor?template=${item.templateId}`
                                        )
                                      }
                                    />
                                  </Button>
                                </div>
                              </CardFooter>
                            </Card>
                          );
                        })
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
            <div
              ref={ref}
              className="w-[700px] absolute -top-[9999px] -left-[9999px]"
            >
              abc
            </div>
          </>
        );

      case "templates":
        return (
          <div className="max-w-6xl m-auto my-5">
            <TemplatesPage />
          </div>
        );
      case "settings":
        return (
          <div className="max-w-6xl m-auto my-5">
            <UserSettings />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[82vh] bg-background">
      {/* Sidebar for larger screens */}
      <aside className="hidden md:flex w-64 flex-col bg-background border-r">
        <nav className="flex-1 space-y-3 p-4">
          <Button
            variant={activeTab === "profile" ? "default" : "ghost"}
            className="py-5 w-full justify-start text-lg font-medium"
            onClick={() => setActiveTab("profile")}
          >
            <User className="mr-3 h-5 w-5" />
            Profile
          </Button>

          <Button
            variant={activeTab === "templates" ? "default" : "ghost"}
            className="py-5 w-full justify-start text-lg font-medium"
            onClick={() => setActiveTab("templates")}
          >
            <Layout className="mr-3 h-5 w-5" />
            Templates
          </Button>
          <Button
            variant={activeTab === "settings" ? "default" : "ghost"}
            className="py-5 w-full justify-start text-lg font-medium"
            onClick={() => setActiveTab("settings")}
          >
            <SettingsIcon className="mr-3 h-5 w-5" />
            Settings
          </Button>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between md:hidden">
            <div className="flex items-center">
              <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <SheetHeader>
                    <SheetTitle>Resume Builder</SheetTitle>
                    <SheetDescription>Navigation</SheetDescription>
                  </SheetHeader>
                  <nav className="flex flex-col space-y-2 mt-4">
                    <Button
                      variant={activeTab === "profile" ? "default" : "ghost"}
                      className="w-full justify-start text-lg font-medium"
                      onClick={() => {
                        setActiveTab("profile");
                        setIsSidebarOpen(false);
                      }}
                    >
                      <User className="mr-3 h-5 w-5" />
                      Profile
                    </Button>
                    <Button
                      variant={activeTab === "resumes" ? "default" : "ghost"}
                      className="w-full justify-start text-lg font-medium"
                      onClick={() => {
                        setActiveTab("resumes");
                        setIsSidebarOpen(false);
                      }}
                    >
                      <FileSpreadsheet className="mr-3 h-5 w-5" />
                      Resumes
                    </Button>
                    <Button
                      variant={activeTab === "templates" ? "default" : "ghost"}
                      className="w-full justify-start text-lg font-medium"
                      onClick={() => {
                        setActiveTab("templates");
                        setIsSidebarOpen(false);
                      }}
                    >
                      <Layout className="mr-3 h-5 w-5" />
                      Templates
                    </Button>
                    <Button
                      variant={activeTab === "settings" ? "default" : "ghost"}
                      className="w-full justify-start text-lg font-medium"
                      onClick={() => {
                        setActiveTab("settings");
                        setIsSidebarOpen(false);
                      }}
                    >
                      <SettingsIcon className="mr-3 h-5 w-5" />
                      Settings
                    </Button>
                    <Button
                      variant={activeTab === "history" ? "default" : "ghost"}
                      className="w-full justify-start text-lg font-medium"
                      onClick={() => {
                        setActiveTab("history");
                        setIsSidebarOpen(false);
                      }}
                    >
                      <History className="mr-3 h-5 w-5" />
                      History
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
              <h1 className="text-2xl font-semibold text-gray-900 ml-2 md:hidden">
                Resume Builder
              </h1>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <ScrollArea className="flex-1 overflow-y-auto">
          <div className=" mx-auto">{renderContent()}</div>
        </ScrollArea>
      </div>
    </div>
  );
}
