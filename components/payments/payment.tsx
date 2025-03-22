"use client";
// @ts-ignore
import { load } from "@cashfreepayments/cashfree-js";
import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { initializePayment, verifyPayment } from "@/lib/payment";
import { useRouter } from "next/navigation";

export interface UserInfo {
  name: string;
  email: string;
  phone: string;
  plan: string;
  user_id: string;
}

export function UserInfoModal({ trigger }: { trigger?: React.ReactNode }) {
  const { data: session, status } = useSession();
  let cashfree: any;
  var init = async () => {
    cashfree = await load({
      mode: "sandbox",
    });
  };
  init();
  useEffect(() => {
    const customUser = localStorage.getItem("custom_user");
    if (customUser) {
      const user = JSON.parse(customUser);
      setUserInfo({
        name: user.name,
        email: user.email,
        phone: user.phone,
        plan: "",
        user_id: user.id,
      });
    }
    if (session) {
      setUserInfo({
        name: session?.user?.name!,
        email: session?.user?.email!,
        phone: "",
        plan: "",
        user_id: (session?.user as { id: string }).id,
      });
    }
    console.log(userInfo);
  }, [session]);

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    phone: "",
    plan: "",
    user_id: "",
  });
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
    console.log(userInfo);
  };

  const handleConfirm = async () => {
    const customUser = localStorage.getItem("custom_user");
    let user;
    if (customUser) {
      user = JSON.parse(customUser!);
    }
    if (userInfo.name && userInfo.email && userInfo.phone && userInfo.plan) {
      if (session) {
        if (
          (session?.user as { accountType: string })?.accountType ==
          userInfo.plan
        ) {
          toast.error("You are already a member of this plan", {
            description: "Select another plan",
          });
          return;
        } else if (
          (session?.user as { accountType: string })?.accountType ==
            "Professional" &&
          userInfo.plan == "Premium"
        ) {
          toast.error("Can't Select this plan", {
            description: "You already have a higher plan",
          });
          return;
        }
      }
      if (user) {
        if (user.accountType == userInfo.plan) {
          toast.error("You are already a member of this plan", {
            description: "Select another plan",
          });
          return;
        } else if (
          user.accountType == "Professional" &&
          userInfo.plan == "Premium"
        ) {
          toast.error("Can't Select this plan", {
            description: "You already have a higher plan",
          });
          return;
        }
      }
      setOpen(false);
      toast.success("Initializing Payment...");
      // console.log(userInfo);
      let order = await initializePayment(userInfo);
      try {
        let checkoutOptions = {
          paymentSessionId: order?.payment_session_id,
          redirectTarget: "_modal",
        };
        cashfree.checkout(checkoutOptions).then(async (result: any) => {
          if (result.error) {
            // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
            console.log(
              "User has closed the popup or there is some payment error, Check for Payment Status"
            );
            console.log(result.error);
            toast.error("Payment Failed or Cancelled");
            router.push("/payment/failed");
          }
          if (result.redirect) {
            // This will be true when the payment redirection page couldnt be opened in the same window
            // This is an exceptional case only when the page is opened inside an inAppBrowser
            // In this case the customer will be redirected to return url once payment is completed
            console.log("Payment will be redirected");
          }
          if (result.paymentDetails) {
            // This will be called whenever the payment is completed irrespective of transaction status
            router.push("/payment/verify?order_id=" + order?.order_id!);
          }
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      toast.error("Please fill all the fields");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Your Information</DialogTitle>
          <DialogDescription>
            Please verify your information before proceeding to payment.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              className="col-span-3"
              placeholder="John Doe"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={userInfo.email}
              onChange={handleChange}
              className="col-span-3"
              placeholder="john.doe@example.com"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={userInfo.phone}
              onChange={handleChange}
              className="col-span-3"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4 w-full">
            <Label htmlFor="plan" className="text-right ">
              Plan
            </Label>
            <Select
              onValueChange={(value) =>
                setUserInfo({ ...userInfo, plan: value })
              }
            >
              <SelectTrigger className="w-full col-span-3">
                <SelectValue placeholder={userInfo.plan || "Select a Plan"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select a Plan</SelectLabel>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Proceed to Payment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
