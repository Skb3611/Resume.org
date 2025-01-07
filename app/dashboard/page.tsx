"use client";
// @ts-ignore
import WAVES from "vanta/dist/vanta.waves.min";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import {
  Bell,
  FileText,
  Edit,
  Trash2,
  Star,
  Clock,
  LogOut,
  Settings as SettingsIcon,
  Menu,
  X,
  User,
  FileSpreadsheet,
  Layout,
  History,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Textarea } from "@/components/ui/textarea";
import { getSession, useSession } from "next-auth/react";
import { get } from "http";
import Image from "next/image";
import { getLargerProfileImage } from "@/lib/utils";

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
  const [activeTab, setActiveTab] = useState("profile");
  const componentRef = useRef(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

    // Cleanup effect when component unmounts
    return () => {
      // @ts-ignore
      effectInstance?.destroy();
    };
  }, [activeTab]);

  useEffect(() => {
    if (session) {
      setuser(session?.user);
    } else {
      let a = localStorage.getItem("custom_user");
      if (a) {
        setuser(JSON.parse(a));
      }
    }
  }, [session]);

  const handleProfileUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Implement profile update logic here
    console.log("Profile updated");
  };

  const handlePasswordChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Implement password change logic here
    console.log("Password changed");
  };

  const handleDeleteResume = (id: number) => {
    // Implement resume deletion logic here
    console.log(`Deleting resume with id: ${id}`);
  };
  function getProvider(url: string) {
    if (url) {
      if (url.includes("google")) {
        return (
          <img
            src="logos/google.png"
            alt="Google"
            className="w-10 h-10"
          />
        );
      } else if (url.includes("pbs.twimg.com")) {
        return (
          <img
            src="logos/twitter.png"
            alt="Twitter"
            className="w-10 h-10"
          />
        );
      } else if (url.includes("media-exp1.licdn.com")) {
        return (
          <img
            src="logos/linkedin.png"
            alt="LinkedIn"
            className="w-10 h-10 "
          />
        );
      } else {
        return <p>Custom_auth</p>;
      }
    }
  }
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <section>
            <div
              ref={componentRef}
              className="header h-[30dvh] bg-white relative"
            >
              <Avatar className="w-52 h-52 rounded-full absolute -bottom-24 left-8 object-cover outline-white outline outline-offset-2">
                <AvatarImage
                  src={getLargerProfileImage(user?.image, 400)}
                  alt="user-image"
                />
                <AvatarFallback>
                  {/* <AvatarImage src={user?.image} alt="user-image" className="w-52 h-52 rounded-full absolute -bottom-24 left-8 object-cover" /> */}{" "}
                  io
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="max-w-6xl m-auto">
              <div className="info mt-28  flex justify-between items-center">
                <div className="w-1/2">
                  <h1 className="text-3xl font-semibold w-full">{user?.name}</h1>
                  <p className="text-lg text-muted-foreground">{user?.email ?? "No email"}</p>
                </div>
                <div className="flex justify-around w-full">
                  <Card className="w-1/3">
                    <CardHeader>
                      <CardTitle className="text-center mb-2">
                        Provider Type
                      </CardTitle>
                      <CardDescription className=" m-auto">
                        {session ? getProvider(user?.image) : "Custom Auth"}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="w-1/3">
                    <CardHeader>
                      <CardTitle className="text-center mb-2">
                        Resumes Created
                      </CardTitle>
                      <CardDescription className=" m-auto text-3xl">
                        0
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>
              <div className="resumes mt-10">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Resumes</CardTitle>
                    <CardDescription>
                      View and manage your saved resumes
                    </CardDescription>
                    <CardContent className="flex flex-wrap justify-around gap-5">
                      {Array(3) 
                        .fill(0)
                        .map((_, index) => {
                          return (
                            <Card key={index} className="w-full sm:w-1/3 lg:w-1/4 p-4 h-[50vh]">
                              <CardHeader>
                                <CardTitle>ABC</CardTitle>
                              </CardHeader>
                              <CardContent className="relative h-[80%] ">
                                <Image fill src={"https://pub-8915c2ad1d8147cc9ae47d1905b82505.r2.dev/Templates/Template1/preview.jpg"} alt={""} className="object-contain"></Image>
                              </CardContent> 
                            </Card>
                          );
                        })}
                    </CardContent>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </section>
        );
      case "resumes":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Saved Resumes</CardTitle>
              <CardDescription>
                View and manage your saved resumes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savedResumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0"
                  >
                    <div>
                      <h3 className="text-sm font-medium">{resume.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Last edited: {resume.lastEdited}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteResume(resume.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      case "templates":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Resume Templates</CardTitle>
              <CardDescription>
                Quick access to your favorite templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {resumeTemplates.map((template) => (
                  <Card key={template.id}>
                    <CardHeader>
                      <CardTitle>{template.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-muted"></div>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                      >
                        Preview
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                      >
                        <Star className="h-4 w-4 mr-1" />
                        Favorite
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      case "settings":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Change Password</h3>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">
                      Confirm New Password
                    </Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button type="submit">Change Password</Button>
                </form>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">
                  Notification Preferences
                </h3>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="email-notifications" />
                  <Label htmlFor="email-notifications">
                    Receive email notifications
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case "history":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Activity History</CardTitle>
              <CardDescription>Recent actions on your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {historyLog.map((log, index) => (
                  <div key={index} className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{log.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {log.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
            variant={activeTab === "resumes" ? "default" : "ghost"}
            className="py-5 w-full justify-start text-lg font-medium"
            onClick={() => setActiveTab("resumes")}
          >
            <FileSpreadsheet className="mr-3 h-5 w-5" />
            Resumes
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
          <Button
            variant={activeTab === "history" ? "default" : "ghost"}
            className="py-5 w-full justify-start text-lg font-medium"
            onClick={() => setActiveTab("history")}
          >
            <History className="mr-3 h-5 w-5" />
            History
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
        <main className="flex-1 overflow-y-auto">
          <div className=" mx-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}
