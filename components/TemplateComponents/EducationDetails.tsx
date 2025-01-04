"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EducationData } from "@/app/editor/page";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { DatePicker } from "../DatePicker";

const EducationDetails = ({
  data,
  setdata,
}: {
  data: EducationData[];
  setdata: React.Dispatch<React.SetStateAction<EducationData[]>>;

}) => {
  

  const addCard = () => {
    setdata([...data, { index: data.length, date: null, degree: "", location: "",university:"" }]);
  };
  const handleInputChange = (
    cardIndex: number,
    field: keyof EducationData,
    value: string | Date
  ) => {
    setdata((prevData) =>
      prevData.map((item) =>
        item.index === cardIndex ? { ...item, [field]: value } : item
      )
    );
  };
  const removeCard = (index: number) => {
    if (data.length === 1) return;
    setdata(data.filter((item) => index !== item.index));
    data.forEach(item=>{
      if(item.index!=0) item.index=item.index-1;
    })
  };
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Carousel className="w-[90%] mx-auto">
          <CarouselContent>
            {data.map((item) => (
              <CarouselItem className="basis-1/2" key={item.index}>
                <CardWrapper
                  handleInputChange={handleInputChange}
                  data={item}
                  removeCard={removeCard}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      
        <Button className="text-foreground ml-5 mt-2" onClick={addCard} variant={"link"} >
        Add More <Plus className="h-4" /> 
        </Button>
      
    </div>
  );
};

export default EducationDetails;

const CardWrapper = ({
  data,
  handleInputChange,
  removeCard
}: {
  data: EducationData;
  handleInputChange: (
    index: number,
    field: keyof EducationData,
    value: string | Date
  ) => void;
  removeCard: (index: number) => void;
}) => {
  return (
    <Card className="p-4">
      <CardContent className="pb-2">
        <div className="mb-2">
          <Label htmlFor="degree">Degree</Label>
          <Input
            id="degree"
            name="degree"
            value={data.degree}
            onChange={(e) =>
              handleInputChange(data.index, "degree", e.target.value)
            }
          />
        </div>
        <div className="mb-2 flex flex-col gap-2">
          <Label htmlFor="date">Year of Completion</Label>
          <DatePicker handleInputChange={handleInputChange} data={data} />
        </div>
        <div className="mb-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={data.location}
            onChange={(e) =>
              handleInputChange(data.index, "location", e.target.value)
            }
          />
        </div>
        <div className="mb-2">
          <Label htmlFor="University">University</Label>
          <Input
            id="university"
            name="university"
            value={data.university}
            onChange={(e) =>
              handleInputChange(data.index, "university", e.target.value)
            }
          />
        </div>
      </CardContent>
      <CardFooter className="p-0 flex justify-end">
        <Button variant={"outline"} className="text-foreground" onClick={()=>removeCard(data.index)} >
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
};


