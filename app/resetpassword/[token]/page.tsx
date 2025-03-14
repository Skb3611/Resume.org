"use client"
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import Link from "next/link";


const PasswordReset = ({params}:{params:{token:string}}) => {
 
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPassword || !confirmPassword) {
      toast.warning("Please fill in all fields",{description:"Please fill in all fields"});
      return;
    }

  
    
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match",{description:"Passwords do not match"});
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // In a real application, you would send the new password to your API
      // along with a token from the URL that verifies this is a legitimate reset
      let res = await fetch(`/api/customauth/resetpassword`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword, token: params.token }),
      })

      let data = await res.json()
      if(data.status !== 200){
        toast.warning(data.message)
        return
      }
      else toast.success("Password updated successfully");
      
      // Redirect to login page after successful password reset
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.warning("Internal Server Error",{description:"Please try again later"});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80dvh] flex flex-col items-center justify-center p-4 md:p-8">
      <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto mb-8">
        <Link href="/" className="inline-block">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Button>
        </Link>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <form onSubmit={handleSubmit}>
          <Card className="w-full glass-card">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-semibold tracking-tight">Reset your password</CardTitle>
              <CardDescription>
                Enter your new password below.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 form-input-focus"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoFocus
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 form-input-focus"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full transition-all duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Lock className="mr-2 h-4 w-4" />
                )}
                {isSubmitting ? "Updating..." : "Reset Password"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </motion.div>
      
     
    </div>
  );
};

export default PasswordReset;