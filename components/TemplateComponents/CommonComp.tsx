import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DatePicker } from "../DatePicker";
import { CommonData } from "@/app/editor/page";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

const Component = ({
  data,
  setdata,
  title,
}: {
  data: CommonData[];
  setdata: React.Dispatch<React.SetStateAction<CommonData[]>>;
  title: string;
}) => {
  const handleInputChange = (
    cardIndex: number,
    field: keyof CommonData,
    value: string | Date
  ) => {
    setdata((prevData) =>
      prevData.map((item) =>
        item.index === cardIndex ? { ...item, [field]: value } : item
      )
    );
  };
  const removeCard = (index: number) => {
    data.length === 1
      ? null
      : setdata(data.filter((item) => index !== item.index));
      data.forEach(item=>{
        if(item.index!=0) item.index=item.index-1;
      })
  };
  const addCard = () => {
    setdata([
      ...data,
      { index: data.length + 1, company: "", title: "", date: null },
    ]);
  };

  return (
    <>
      <div className="flex flex-wrap">
        <Carousel className="w-[90%] mx-auto">
          <CarouselContent>
            {data.map((item) => (
              <CarouselItem className="basis-1/2" key={item.index}>
                <CardWrapper
                  title={title}
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
      <Button
        className="text-foreground ml-5 mt-2"
        onClick={addCard}
        variant={"link"}
      >
        Add More <Plus className="h-4" />
      </Button>
    </>
  );
};

const CardWrapper = ({
  data,
  handleInputChange,
  removeCard,
  title,
}: {
  data: CommonData;
  handleInputChange: (
    index: number,
    field: keyof CommonData,
    value: string | Date
  ) => void;
  removeCard: (index: number) => void;
  title: string;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add {title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <Label htmlFor="company">Company Name</Label>
          <Input
            value={data.company}
            id="company"
            type="text"
            placeholder="eg. FocusHub.co"
            onChange={(e) =>
              handleInputChange(data.index, "company", e.target.value)
            }
          />
          <Label htmlFor="title">Title</Label>
          <Input
            value={data.title}
            id="title"
            type="text"
            placeholder="eg. Best Web Designer"
            onChange={(e) =>
              handleInputChange(data.index, "title", e.target.value)
            }
          />
          <Label htmlFor="date">Date</Label>
          <DatePicker handleInputChange={handleInputChange} data={data} />
        </form>
      </CardContent>
      <CardFooter>
        <Button
          variant={"outline"}
          className="text-foreground"
          onClick={() => removeCard(data.index)}
        >
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Component;
