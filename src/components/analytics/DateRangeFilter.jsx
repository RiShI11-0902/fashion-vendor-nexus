import { useState } from "react";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const PRESETS = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
  { label: "All time", days: null },
];

const DateRangeFilter = ({ dateRange, onDateRangeChange }) => {
  const [activePreset, setActivePreset] = useState("All time");

  const handlePreset = (preset) => {
    setActivePreset(preset.label);
    if (preset.days === null) {
      onDateRangeChange({ from: null, to: null });
    } else {
      onDateRangeChange({
        from: startOfDay(subDays(new Date(), preset.days)),
        to: endOfDay(new Date()),
      });
    }
  };

  const handleCalendarSelect = (range) => {
    setActivePreset(null);
    onDateRangeChange({
      from: range?.from ? startOfDay(range.from) : null,
      to: range?.to ? endOfDay(range.to) : null,
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {PRESETS.map((preset) => (
        <Button
          key={preset.label}
          variant={activePreset === preset.label ? "default" : "secondary"}
          size="sm"
          className="text-xs h-8"
          onClick={() => handlePreset(preset)}
        >
          {preset.label}
        </Button>
      ))}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-8 text-xs justify-start",
              !dateRange?.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-1.5 h-3.5 w-3.5" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "MMM d")} – {format(dateRange.to, "MMM d, yyyy")}
                </>
              ) : (
                format(dateRange.from, "MMM d, yyyy")
              )
            ) : (
              "Custom range"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="range"
            selected={dateRange?.from ? { from: dateRange.from, to: dateRange.to } : undefined}
            onSelect={handleCalendarSelect}
            numberOfMonths={1}
            disabled={(date) => date > new Date()}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangeFilter;
