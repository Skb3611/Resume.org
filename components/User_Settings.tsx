"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Lock, Camera } from "lucide-react";
import { useSession } from "next-auth/react";
import { set } from "date-fns";
import { clearCookies, updateUserDetails, updateUserPassword } from "@/lib/serveractions";
import { getLargerProfileImage, toastoptions } from "@/lib/utils";
import { toast } from "react-toastify";
import { strict } from "assert";
import { decodeToken } from "@/lib/jwt";
import { motion } from "framer-motion";
import { duration } from "html2canvas/dist/types/css/property-descriptors/duration";

export default function AccountSettings() {
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setuser] = useState<any>(null);
  const { data: session,update} = useSession();
  const [passObj, setpassObj] = useState({
    currentPassword:"",
    newPassword:"",
    confirmPassword:""
  })
  useEffect(() => {
    console.log("_________user effect________");
    if (session) {
      // console.log(session)
      setuser(session?.user);
     
    } else {
      let a = localStorage.getItem("custom_user");
      if (a) {
        setuser(JSON.parse(a));
      
      }
    }
  }, [session]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update logic here
    let bool = updateUserDetails(user.id, user.name, user.email, user.image??"");
    // console.log(user)
    if (bool)
      toast.promise(
        bool,
        {
          pending: "Updating...",
          success: "Updated successfully",
          error: "Error updating",
        },
        toastoptions
      );
      if((typeof(await bool)) == "string"){
        let token =  decodeToken(await bool as string)
        if(token) {
          await clearCookies()
          document.cookie = `token=${ await bool};path=/;`
          localStorage.setItem("custom_user",JSON.stringify(token))
          setTimeout(() => {
            window.location.reload();
          }, 1000); 
        }
      }
   
  
    await update()
    if ((await bool) == true) 
      setTimeout(() => {
    window.location.reload();
      }, 1000);
  };

  const handlePasswordChange = async(e: React.FormEvent) => {
    e.preventDefault();
    if(passObj.newPassword=="" || passObj.confirmPassword=="") return toast.error("Please fill all the fields")
    if(passObj.newPassword!=passObj.confirmPassword) return toast.error("New Password and Confirm Password do not match")
    let bool = updateUserPassword(user.id,passObj.currentPassword,passObj.newPassword);
  console.log("bool",await bool)
      toast.promise(
        bool,
        {
          pending: "Updating...",
          success: "Updated successfully",
          error: "Error updating",
        },
        toastoptions
      ); 
      if ((await bool)==true) 
        setTimeout(() => {
        window.location.reload();
        }, 1000);
    console.log("Password changed");
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setuser({ ...user, image: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
    className="w-full"
    initial={{ opacity: 0, y:50 }}
    animate={{ opacity: 1, y:0 }}
    transition={{duration: 0.5}}
    >

    <Card className="w-full mt-12 max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <form onSubmit={handleUpdateProfile} className="space-y-4 ">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                  <Avatar className="h-24 w-24 cursor-pointer">
                    <AvatarImage src={
                      (()=>{
                        if(user?.image.includes(process.env.NEXT_PUBLIC_API_URL!)){
                          return getLargerProfileImage(user?.image)
                        }
                        else return user?.image 
                      })()
                    } alt="User" />
                    <AvatarFallback>
                      {user?.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={handleAvatarClick}
                    >
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                    />
                </div>
                <div className="w-full space-y-2">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      value={user?.name}
                      onChange={(e) =>
                        setuser({ ...user, name: e.target.value })
                      }
                      className="flex-1"
                      />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={user?.email}
                      onChange={(e) =>
                        setuser({ ...user, email: e.target.value })
                      }
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit">Update Profile</Button>
              </div>
            </form>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <Lock className="h-5 w-5 mr-2 text-muted-foreground" />
                Change Password
              </h3>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" placeholder="If using any Provider, leave blank" onChange={(e)=>{setpassObj({...passObj,currentPassword:e.target.value})}}/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" onChange={(e)=>{setpassObj({...passObj,newPassword:e.target.value})}}/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" onChange={(e)=>{setpassObj({...passObj,confirmPassword:e.target.value})}}/>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Change Password</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
                      </motion.div>
  );
}
