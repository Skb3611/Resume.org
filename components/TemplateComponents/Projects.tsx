import { ProjectsData } from "@/app/editor/page";
import React from "react";
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
import { Textarea } from "../ui/textarea";

const Projects = ({
  data,
  setdata,
}: {
  data: ProjectsData[];
  setdata: React.Dispatch<React.SetStateAction<ProjectsData[]>>;
}) => {
  const handleInputChange = (
    cardIndex: number,
    field: keyof ProjectsData,
    value: string
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
      { index: data.length + 1, title: "", description: "", technologies: "" },
    ]);
  };

  return (
    <>
      <div className="flex flex-wrap">
        <Carousel className="lg:w-[70%] w-[90%] mx-auto">
          <CarouselContent>
            {data.map((item) => (
              <CarouselItem  key={item.index}>
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
}: {
  data: ProjectsData;
  handleInputChange: (index: number, field: keyof ProjectsData, value: string) => void;
  removeCard: (index: number) => void;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Project</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
            <Label className="text-sm lg:text-base" htmlFor="title">Title</Label>
            <Input
            className="text-xs lg:text-sm"
              value={data.title}
              id="title"
              type="text"
              placeholder="eg. FocusHub.co"
              onChange={(e) =>
                handleInputChange(data.index, "title", e.target.value)
              }
            />
            <Label className="text-sm lg:text-base" htmlFor="description">Description</Label>
            <Textarea
            className="text-xs lg:text-sm"
              value={data.description}
              id="description"
              name="description"
              placeholder="What's project is about?"
              rows={3}
              onChange={(e) =>
                handleInputChange(data.index, "description", e.target.value)
              }
            />
            <Label className="text-sm lg:text-base" htmlFor="technologies">Technologies</Label>
            <Input
            className="text-xs lg:text-sm"
              value={data.technologies}
              id="technologies"
              type="text"
              placeholder="eg. HTML, CSS, JavaScript"
              onChange={(e) =>
                handleInputChange(data.index, "technologies", e.target.value)
              }
            />
            
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
export default Projects;
