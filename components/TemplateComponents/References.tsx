import React from "react";
import { ReferencesData } from "@/app/editor/page";
import {
  Card,
  CardContent,
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
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const References = ({
  data,
  setdata,
}: {
  data: ReferencesData;
  setdata: React.Dispatch<React.SetStateAction<ReferencesData>>;
}) => {
  // const handleInputChange = (
  //   // cardIndex: number,
  //   field: keyof ReferencesData,
  //   value: string
  // ) => {

  // };
  const handleInputChange = (field: keyof ReferencesData, value: string) => {
    setdata((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  // const removeCard = (index: number) => {
  //   data.length === 1
  //     ? null
  //     : setdata(data.filter((item) => index !== item.index));
  //   data.forEach((item) => {
  //     if (item.index != 0) item.index = item.index - 1;
  //   });
  // };
  // const addCard = () => {
  //   setdata([
  //     ...data,
  //     { index: data.length + 1, name: "", position: "", company: "",phone:"" },
  //   ]);
  // };
  return (
    <>
      <div className="flex flex-wrap w-full items-center justify-center">
        {/* <Carousel className="w-[90%] mx-auto">
          <CarouselContent>
            {data.map((item) => (
              <CarouselItem className="basis-1/2" key={item.name}>
                <CardWrapper
                  handleInputChange={handleInputChange}
                  data={item}
                  // removeCard={removeCard}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel> */}
        <CardWrapper
                  handleInputChange={handleInputChange}
                  data={data}
                  // removeCard={removeCard}
                />
      </div>
      {/* <Button
        className="text-foreground ml-5 mt-2"
        onClick={addCard}
        variant={"link"}
      >
        Add More <Plus className="h-4" />
      </Button> */}
    </>
  );
};
const CardWrapper = ({
  data,
  handleInputChange,
}: // removeCard,
{
  data: ReferencesData;
  handleInputChange: (
    // index: number,
    field: keyof ReferencesData,
    value: string
  ) => void;
  // removeCard: (index: number) => void;
}) => {
  return (
    <Card className="lg:w-1/2">
      <CardHeader>
        <CardTitle>Add a Reference</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <Label htmlFor="name">Name</Label>
          <Input
            value={data.name}
            id="name"
            type="text"
            placeholder="eg. John Doe"
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <Label htmlFor="position">Position</Label>
          <Input
            value={data.position}
            id="position"
            type="text"
            placeholder="eg. CEO"
            onChange={(e) => handleInputChange("position", e.target.value)}
          />
          <Label htmlFor="company">Company</Label>
          <Input
            value={data.company}
            id="company"
            type="text"
            placeholder="eg. FocusHub.co"
            onChange={(e) => handleInputChange("company", e.target.value)}
          />
          <Label htmlFor="phone">Phone</Label>
          <Input
            value={data.phone}
            id="phone"
            type="text"
            placeholder="if any"
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
        </form>
      </CardContent>
      {/* <CardFooter>
        <Button
          variant={"outline"}
          className="text-foreground"
          onClick={() => removeCard(data.index)}
        >
          Remove
        </Button>
      </CardFooter> */}
    </Card>
  );
};
export default References;
