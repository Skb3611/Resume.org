"use client";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { getCookies, clearCookies } from "@/lib/getcookies";
import { decodeToken } from "@/lib/jwt";
import { toast } from "react-toastify";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toastoptions } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";

interface Data {
  email: string;
  password: string;
  name: string;
}
const Connection = () => {
  const [data, setdata] = useState<Data>({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const { data: session } = useSession();
  // console.log(session);
  const [decoded, setdecoded] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  let token;
  useEffect(() => {
    (async () => {
      token = await getCookies();
      if (token) {
        let check = decodeToken(token?.value ?? "") as JwtPayload;

        check
          ? (async () => {
              if (check.exp && check.exp < new Date().getTime() / 1000) {
                toast.error("Invalid Token.Try again", toastoptions);
                await clearCookies();
                return;
              }
              toast.success("Logged in successfully", toastoptions);
              setdecoded(check);
            })()
          : toast.error("Invalid Token.Try again", toastoptions);
      }
    })();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    let res = await fetch("/api/customauth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let result = await res.json();
    // console.log(result);
    if (result.status == false)
      return toast.error(result.message, toastoptions);
    token = await getCookies();
    if (token) {
      let check = decodeToken(token?.value ?? "");
      check
        ? (() => {
            toast.success("Logged in successfully", toastoptions);
            setdecoded(check);
          })()
        : toast.error("Invalid Token.Try again", toastoptions);
    }
    setIsDialogOpen(false);
    setdata({ name: "", email: "", password: "" });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    let res = await fetch("/api/customauth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let result = await res.json();
    // console.log(result);
    if (result.status == false)
      return toast.error(result.message, toastoptions);
    else {
      token = await getCookies();
      if (token) {
        let check = decodeToken(token?.value ?? "");

        check
          ? (() => {
              toast.success("Logged in successfully", toastoptions);
              setdecoded(check);
            })()
          : toast.error("Invalid Token.Try again", toastoptions);
      }
    }
    setIsDialogOpen(false);
    setdata({ name: "", email: "", password: "" });
  };

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setdata({ ...data, [e.target.id]: e.target.value });
  };
  const handleSignout = async () => {
    if (session) signOut();
    else {
      let token = await clearCookies();
      setdecoded(null);
      setIsDialogOpen(false);
      toast.success("Logged out successfully", toastoptions);
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          {session || decoded ? (
            <Button variant={"link"} size={"icon"} className="p-0">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {session ? (
                    // <img
                    //   height={100}
                    //   width={100}
                    //   src={session.user?.image ?? ""}
                    //   alt="avatar"
                    //   className="w-full h-full rounded-full"
                    //   loading="lazy"
                    // />
                    <Avatar>
                      <AvatarImage src={session.user?.image ?? ""} />
                      <AvatarFallback>io</AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>io</AvatarFallback>
                    </Avatar>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 mt-1"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {(session && session.user?.name) ?? decoded.username}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {(session && session.user?.email) ?? decoded?.useremail}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Button
                      variant={"link"}
                      className="h-5 text-foreground"
                      onClick={() => router.push("/dashboard")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Button>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Button
                      variant={"link"}
                      className="h-5 text-foreground"
                      onClick={handleSignout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Button>
          ) : (
            <Button variant="outline">Login / Signup</Button>
          )}
        </DialogTrigger>
        {!(session || decoded) && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Login / Signup</DialogTitle>
              <DialogDescription>
                Login to your account or create a new one.
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Signup</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      value={data.email}
                      id="email"
                      type="email"
                      required
                      onChange={(e) => handlechange(e)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      value={data.password}
                      id="password"
                      type="password"
                      required
                      onChange={(e) => handlechange(e)}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Name</Label>
                    <Input
                      value={data.name}
                      id="name"
                      type="name"
                      required
                      onChange={(e) => handlechange(e)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Email</Label>
                    <Input
                      value={data.email}
                      id="email"
                      type="email"
                      required
                      onChange={(e) => handlechange(e)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Password</Label>
                    <Input
                      value={data.password}
                      id="password"
                      type="password"
                      required
                      onChange={(e) => handlechange(e)}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign Up
                  </Button>
                </form>
              </TabsContent>
              {/* Social Media Login Section */}
              <div className="mt-4 space-y-2">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center py-5"
                  onClick={() => signIn("google")}
                >
                  <Image
                    src="/logos/google.png"
                    alt="Google logo"
                    width={25}
                    height={25}
                    className="mr-2"
                  />
                  Continue with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center py-5"
                  onClick={() => signIn("twitter")}
                >
                  <Image
                    src="/logos/twitter.png"
                    alt="Twitter logo"
                    width={25}
                    height={25}
                    className="mr-2 "
                  />
                  Continue with Twitter
                </Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center py-5"
                  onClick={() => signIn("linkedin")}
                >
                  <Image
                    src="/logos/linkedin.png"
                    alt="LinkedIn logo"
                    width={25}
                    height={25}
                    className="mr-2"
                  />
                  Continue with LinkedIn
                </Button>
              </div>
            </Tabs>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default Connection;
