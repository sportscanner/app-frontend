"use client"

import * as React from "react"
import { CalendarIcon } from 'lucide-react'
import { format, isBefore, startOfToday } from "date-fns"
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
}: React.HTMLAttributes<HTMLDivElement> & {
  date: DateRange | undefined
  onDateChange: (date: DateRange | undefined) => void
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [internalDate, setInternalDate] = React.useState<DateRange | undefined>(date)

  const handleSelect = (selectedDate: DateRange | undefined) => {
    // Always update internal state
    setInternalDate(selectedDate)
    
    // Only update parent state and close when we have both dates
    if (selectedDate?.from && selectedDate.to) {
      onDateChange(selectedDate)
      setIsOpen(false)
    }
  }

  const disabledDays = {
    before: startOfToday()
  }

  React.useEffect(() => {
    setInternalDate(date)
  }, [date])

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
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
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={internalDate?.from || new Date()}
            selected={internalDate}
            onSelect={handleSelect}
            numberOfMonths={1}
            disabled={disabledDays}
            className="rounded-md border"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export type { DateRange }

