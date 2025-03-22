"use client";
// @ts-ignore
import WAVES from "vanta/dist/vanta.waves.min";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import {
  SettingsIcon,
  Menu,
  User,
  FileSpreadsheet,
  Layout,
  History,
  Download,
  FileEdit,
  Home,
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
import { motion } from "framer-motion";

export default function UserDashboard() {
  const { data: session,update } = useSession();
  const [user, setuser] = useState<any>(null);
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
        gyroControls: true,
      });
    }
    return () => {
      // @ts-ignore
      effectInstance?.destroy();
    };
  }, [activeTab]);

  useEffect(() => {
    if (session) {
      setuser(session?.user);
    } else {
      const a = localStorage.getItem("custom_user");
      if (a) {
        setuser(JSON.parse(a));
      }
    }
  }, [session]);

  useEffect(() => {
    if (user?.id) {
      (async () => {
        const templates = await getUserTemplates(user?.id ?? "");
        setTemplates(templates);
      })();
    }
    setIsLoading(false);
  }, [user]);

  const handleDownload = async (template: any) => {
    console.log(template);
    try {
      // Dynamically import the template component
      const TemplateModule = await import(
        `@/components/Templates/Template${template.templateId}/Template`
      );
      const Template = TemplateModule.default; // Get the template component

      // Prepare the props for the template
      const templateProps = prepareTemplateProps(template.data);
      console.log(ref.current);
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
  const getProvider = (provider: string) => {
    switch (provider) {
      case "google":
        return (
          <Image height={40} width={40} src="/logos/google.png" alt="Google" />
        );
      case "twitter":
        return (
          <Image
            height={40}
            width={40}
            src="/logos/twitter.png"
            alt="Twitter"
          />
        );
      case "linkedin":
        return (
          <Image
            height={40}
            width={40}
            src="/logos/linkedin.png"
            alt="Linkedin"
          />
        );
      default:
        return "Custom Auth ";
    }
  };

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
          <section className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              ref={componentRef}
              className="header h-[30dvh] md:h-[40dvh] bg-white relative"
            >
              <Avatar className="w-32 h-32 md:w-52 md:h-52 2xl:h-60 2xl:w-60 rounded-full absolute -bottom-16 md:-bottom-24 left-4 md:left-8 2xl:left-40 object-cover outline-foreground outline outline-offset-1 bg-black bg-background">
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
            </motion.div>
            <div className="max-w-6xl 2xl:max-w-[80%] mx-auto sm:px-6 lg:px-8">
              <div className="info mt-20 md:mt-28 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <div className="w-full md:w-1/2">
                  {!isLoading ? (
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl md:text-3xl font-semibold w-full"
                    >
                      {user?.name}
                    </motion.h1>
                  ) : (
                    <Skeleton className="w-2/4 h-8 rounded-md bg-muted my-2" />
                  )}
                  <div className="text-base md:text-lg text-muted-foreground">
                    {!isLoading ? (
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        {user?.email ?? "No email"}
                      </motion.h2>
                    ) : (
                      <Skeleton className="w-3/4 h-5 rounded-md bg-muted my-2" />
                    )}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-around w-full space-y-4 md:space-y-0 md:space-x-4">
                  <Card className="w-full md:w-1/3">
                    <CardHeader>
                      <CardTitle className="text-center mb-2">
                        Provider Name
                      </CardTitle>
                      <CardDescription className="m-auto">
                        {user
                          ? getProvider(user?.provider as string)
                          : "Loading..."}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="w-full md:w-1/3">
                    <CardHeader>
                      <CardTitle className="text-center mb-2">
                        Account Type
                      </CardTitle>
                      <CardDescription className=" m-auto text-xl">
                        {user ? user?.accountType : "Loading..."}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="w-full md:w-1/3">
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
                  <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {!isLoading && Templates.length == 0 ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        key="NoResumes"
                      >
                        No resumes
                      </motion.div>
                    ) : (
                      Templates.map((item: any, index: number) => {
                        return (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.05 * index }}
                          >
                            <Card key={item.id} className="p-4 h-[60dvh]">
                              <CardContent className="relative h-[40vh] ">
                                <Image
                                  fill
                                  src={`${process.env.NEXT_PUBLIC_PUBLIC_ACCESS_URL}Templates/Template${item.templateId}/preview.jpg`}
                                  alt={""}
                                  className="object-contain h-full w-full"
                                ></Image>
                              </CardContent>
                              <CardFooter className="mt-1 flex-col justify-between gap-2 px-0">
                                <div>
                                  <p className="text-xs text-start">
                                    Created at:{" "}
                                    {item.createdAt.toLocaleString("en-US", {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    })}
                                  </p>
                                  <p className="text-xs text-start">
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
                          </motion.div>
                        );
                      })
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        );

      case "templates":
        return (
          <div className="mt-5">
            <TemplatesPage />
          </div>
        );
      case "settings":
        return (
          <div className="max-w-6xl mx-auto md:px-4 sm:px-6 lg:px-8 my-5 flex justify-center items-center">
            <UserSettings />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <aside className="hidden lg:flex w-56 2xl:w-64 flex-shrink-0 bg-background border-r max-h-screen">
        <nav className="flex-1 space-y-3 p-4">
          <Button
            variant={activeTab === "home" ? "default" : "ghost"}
            className="py-5 w-full justify-start text-lg font-medium"
            onClick={() => router.push("/")}
          >
            <Home className="mr-3 h-5 w-5" />
            Home
          </Button>
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

      <div className="flex-1 flex flex-col overflow-hidden max-h-screen">
        <ScrollArea className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <header className=" shadow-sm absolute z-10 lg:hidden w-full">
            <div className="sm:px-6 p-2 flex items-center justify-between">
              <div className="flex items-center">
                <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="lg:hidden bg-foreground/50 dark:bg-background/50 focus:bg-foreground/50"
                    >
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
                        variant={activeTab === "home" ? "default" : "ghost"}
                        className="py-5 w-full justify-start text-lg font-medium"
                        onClick={() => {
                          router.push("/");
                          setIsSidebarOpen(false);
                        }}
                      >
                        <Home className="mr-3 h-5 w-5" />
                        Home
                      </Button>
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
                        variant={
                          activeTab === "templates" ? "default" : "ghost"
                        }
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
                    </nav>
                  </SheetContent>
                </Sheet>
                <h1 className="text-xl md:text-2xl font-medium dark:text-white ml-2 lg:hidden">
                  {activeTab[0].toUpperCase() + activeTab.slice(1)} Tab
                </h1>
              </div>
            </div>
          </header>
          <div className="max-w-3xl md:max-w-6xl xl:max-w-7xl 2xl:max-w-full mx-auto ">
            {renderContent()}
          </div>
        </ScrollArea>
      </div>
      <div
        ref={ref}
        className="w-[700px] absolute -top-[9999px] -left-[9999px]"
      >
        abc
      </div>
    </div>
  );
}
