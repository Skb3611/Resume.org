import { CommonData, EducationData} from "@/app/editor/page";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns"
import { cn } from "@/lib/utils";

type DatePickerProps = CommonData| EducationData;
export function DatePicker({
    handleInputChange,
    data,
  }: {
    handleInputChange: (
      index: number,
      field: keyof DatePickerProps,
      value: string | Date
    ) => void;
    data: DatePickerProps;
  }) {
    const setDateFunc = (date: Date | undefined) => {
      handleInputChange(data.index, "date", date || "");
    };
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !data.date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {data.date ? format(data.date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={data.date || undefined}
            onSelect={setDateFunc}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  }