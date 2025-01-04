import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { PersonalData } from "@/app/editor/page";
export default function data({
  data,
  setdata,
}: {
  data: PersonalData;
  setdata: React.Dispatch<React.SetStateAction<PersonalData>>;
}) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
        placeholder="eg. John Doe"
          id="name"
          name="name"
          value={data?.name || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="role">Role</Label>
        <Input
        placeholder="eg. Journalist, Editor"
          id="role"
          name="role"
          value={data?.role || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="aboutme">About me</Label>
        <Textarea
        placeholder="eg. I am a journalist passionate about uncovering the truth and producing high-quality content."
          onChange={handleChange}
          value={data?.aboutme || ""}
          name="aboutme"
          rows={3}
        ></Textarea>
      </div>
      <div>
        <Label htmlFor="phone">Phone number</Label>
        <Input
          placeholder="eg. +1 (555) 555-5555"
          type="tel"
          id="phone"
          name="phone"
          value={data?.phone || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          placeholder="eg. john@example.com"
          type="email"
          id="email"
          name="email"
          value={data?.email || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="location">City, Country</Label>
        <Input
          placeholder="eg. New York, USA"
          id="address"
          name="address"
          value={data?.address || ""}
          onChange={handleChange}
        />
      </div>
    </>
  );
}
