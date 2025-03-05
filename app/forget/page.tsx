"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Loader2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { toastoptions } from "@/lib/utils";
import Link from "next/link";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.warning("Please enter your email", toastoptions);
      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format", toastoptions);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      let res = await fetch("/api/customauth/forgetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      let data = await res.json();
      console.log(data);

      data.success
        ? toast.success("Reset link sent", toastoptions)
        : toast.error(data.message, toastoptions);

      // Clear form
      setEmail("");
    } catch (error) {
      toast.error("Internal Server Error", toastoptions);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80dvh] flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md mx-auto mb-8">
        <Link href="/" className="inline-block">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Button>
        </Link>
      </div>

      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <Card className="w-full max-w-md mx-auto glass-card animate-fade-in">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-semibold tracking-tight">
                Reset password
              </CardTitle>
              <CardDescription>
                Enter your email address and we'll send you a link to reset your
                password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10 form-input-focus"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    autoFocus
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
                  <Mail className="mr-2 h-4 w-4" />
                )}
                {isSubmitting ? "Sending..." : "Send reset link"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
