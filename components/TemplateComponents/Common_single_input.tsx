import React, { useState } from "react";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Common_Single_Input_Data } from "@/app/editor/page";

import { Plus } from "lucide-react";

const Common_Skills_Languages = ({
  data,
  setdata,
  title,
}: {
  data: Common_Single_Input_Data[];
  setdata: React.Dispatch<React.SetStateAction<Common_Single_Input_Data[]>>;
  title: string;
}) => {
  const addCard = () => {
    setdata([...data, { data: "", index: data.length + 1 }]);
  };
  const handleInputChange = (index: number, data: string) => {
    setdata((prevData) =>
      prevData.map((item) =>
        item.index === index ? { ...item, data: data } : item
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
    <>
      <div className="flex flex-wrap gap-2 justify-evenly">
        {data.map((item) => {
          return (
            <CardWrapper
              key={item.index}
              handleInputChange={handleInputChange}
              item={item}
              removeCard={removeCard}
              title={title}
            />
          );
        })}
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

export default Common_Skills_Languages;

const CardWrapper = ({
  handleInputChange,
  item,
  removeCard,
  title,
}: {
  handleInputChange: (index: number, value: string) => void;
  item: Common_Single_Input_Data;
  removeCard: (index: number) => void;
  title: string;
}) => {
  return (
    <Card className="w-[40%]">
      <CardHeader className="pb-2">
        <CardTitle>Add a {title}</CardTitle>
      </CardHeader>
      <CardContent className="py-2">
        <Input
          value={item.data}
          id={title}
          type="text"
          placeholder={(() => {
            switch (title) {
              case "Hobbies":
                return "eg. Reading, Writing, Coding";
              case "Skills":
                return "eg. Software Development";
              case "Languages":
                return "eg. English";
            }
          })()}
          onChange={(e) => handleInputChange(item.index, e.target.value)}
        />
      </CardContent>
      <CardFooter className="pb-2 flex justify-end">
        <Button
          variant={"outline"}
          className="text-foreground"
          onClick={() => removeCard(item.index)}
        >
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
};
