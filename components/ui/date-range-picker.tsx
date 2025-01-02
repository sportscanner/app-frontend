"use client"

import * as React from "react"
import { CalendarIcon } from 'lucide-react'
import { format } from "date-fns"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

export function DateRangePicker({
  className,
  date,
  onDateChange,
  onOpenChange,
}: React.HTMLAttributes<HTMLDivElement> & {
  date: DateRange | undefined
  onDateChange: (date: DateRange | undefined) => void
  onOpenChange?: (open: boolean) => void
}) {
  const [internalDate, setInternalDate] = React.useState<DateRange | undefined>(date)

  // Remove useEffect to avoid infinite loops
  const handleDateSelect = (newDate: DateRange | undefined) => {
    if (
      newDate?.from !== internalDate?.from ||
      newDate?.to !== internalDate?.to
    ) {
      setInternalDate(newDate)
      onDateChange(newDate)
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            type="button"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !internalDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {internalDate?.from ? (
              internalDate.to ? (
                <>
                  {format(internalDate.from, "LLL dd, y")} -{" "}
                  {format(internalDate.to, "LLL dd, y")}
                </>
              ) : (
                format(internalDate.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={internalDate?.from}
            selected={internalDate}
            onSelect={handleDateSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
