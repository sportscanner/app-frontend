'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Sun, Cloud, Moon, InfoIcon, Star, Globe } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { DateRange, DateRangePicker } from "@/components/ui/date-range-picker"
import { cn } from "@/lib/utils"
import { format, addDays } from "date-fns"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAppState } from '@/lib/state'

interface SearchConfig {
  selectedTimeSlots: string[]
  dateRange: {
    from: Date
    to: Date
  }
  consecutiveSlots: string
  allLocations: boolean
}

interface BadmintonBookingFormProps {
  initialConfig?: SearchConfig
  onClose?: () => void
  className?: string
  showCancel?: boolean
}

const timeSlots = [
  {
    id: 'morning',
    label: 'Morning',
    time: '6AM - 12PM',
    icon: Sun
  },
  {
    id: 'afternoon',
    label: 'Afternoon',
    time: '12PM - 6PM',
    icon: Cloud
  },
  {
    id: 'evening',
    label: 'Evening',
    time: '6PM - 10PM',
    icon: Moon
  }
] as const

type TimeSlot = typeof timeSlots[number]['id']

export default function BadmintonBookingForm({ initialConfig, onClose, className, showCancel }: BadmintonBookingFormProps) {
  const router = useRouter()
  const { state, setState } = useAppState()
  const [isLoading, setIsLoading] = useState(false)
  const [consecutiveSlots, setConsecutiveSlots] = useState(state.consecutiveSlots || initialConfig?.consecutiveSlots || "4")
  const [date, setDate] = useState<DateRange | undefined>(state.dateRange || initialConfig?.dateRange || {
    from: new Date(),
    to: addDays(new Date(), 6)
  })
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>(
    (state.selectedTimeSlots as TimeSlot[] || initialConfig?.selectedTimeSlots as TimeSlot[] || [])
  )
  const [allLocations, setAllLocations] = useState(state.allLocations || initialConfig?.allLocations || false)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDateChange = useCallback((newDate: DateRange | undefined) => {
    setDate(newDate);
    setState(prev => ({ ...prev, dateRange: newDate }));
  }, [setState]);

  const handleConsecutiveSlotsChange = useCallback((value: string) => {
    setConsecutiveSlots(value);
    setState(prev => ({ ...prev, consecutiveSlots: value }));
  }, [setState]);

  const handleAllLocationsChange = useCallback((value: boolean) => {
    setAllLocations(value);
    setState(prev => ({ ...prev, allLocations: value }));
  }, [setState]);

  const toggleTimeSlot = useCallback((slot: TimeSlot) => {
    setSelectedTimeSlots(current => {
      const newSlots = current.includes(slot)
        ? current.filter(s => s !== slot)
        : [...current, slot];
      setState(prev => ({ ...prev, selectedTimeSlots: newSlots }));
      return newSlots;
    });
  }, [setState]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isDatePickerOpen) {
      return
    }

    setIsLoading(true)

    try {
      const searchParams = new URLSearchParams({
        from: date?.from ? format(date.from, 'yyyy-MM-dd') : '',
        to: date?.to ? format(date.to, 'yyyy-MM-dd') : '',
        timeSlots: selectedTimeSlots.join(','),
        consecutiveSlots: consecutiveSlots,
        allLocations: allLocations.toString()
      })

      const response = await fetch(`https://d09ff97b80294d78b53b49ddd9d13c9b.api.mockbin.io/?${searchParams.toString()}`)
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      console.log('API Response:', data);

      if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
        throw new Error('Invalid or empty response from server');
      }

      if (!data.success || !data.resultId) {
        throw new Error(data.message || 'Unexpected response format from server');
      }

      // Store the entire response in sessionStorage
      sessionStorage.setItem('bookingResults', JSON.stringify(data));

      if (data.success && data.resultId) {
        onClose?.()
        router.push(`/book/results/${data.resultId}`)
      } else {
        throw new Error(data.message || "An error occurred")
      }
    } catch (error) {
      console.error('Error:', error)
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const initForm = () => {
      setConsecutiveSlots(state.consecutiveSlots || initialConfig?.consecutiveSlots || "4");
      setDate(state.dateRange || initialConfig?.dateRange || {
        from: new Date(),
        to: addDays(new Date(), 6)
      });
      setSelectedTimeSlots(state.selectedTimeSlots || (initialConfig?.selectedTimeSlots || []) as TimeSlot[]);
      setAllLocations(state.allLocations || initialConfig?.allLocations || false);
      setErrorMessage(null);
    };

    initForm();

  }, [initialConfig, state]);

  useEffect(() => {
    setState(prev => {
      if (
        prev.consecutiveSlots !== consecutiveSlots ||
        prev.dateRange?.from !== date?.from ||
        prev.dateRange?.to !== date?.to ||
        prev.selectedTimeSlots !== selectedTimeSlots ||
        prev.allLocations !== allLocations
      ) {
        return {
          ...prev,
          consecutiveSlots,
          dateRange: date,
          selectedTimeSlots,
          allLocations
        };
      }
      return prev;
    });
  }, [setState, consecutiveSlots, date, selectedTimeSlots, allLocations]);  

  return (
    <div className={cn("space-y-6", className)}>
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {errorMessage}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6" key={Date.now()}>
        <div className="space-y-2">
          <Label className="font-medium">What venues should we look for?</Label>
          <div className="max-w-[300px]">
            <div className="grid grid-cols-2 rounded-lg border p-1 bg-gray-50/50">
              <button
                type="button"
                onClick={() => handleAllLocationsChange(false)}
                className={cn(
                  "relative rounded-md px-4 py-2 text-sm transition-all duration-300 ease-in-out",
                  !allLocations 
                    ? "bg-[#936de8] text-white" 
                    : "text-gray-600 hover:bg-[#936de8]/10"
                )}
              >
                <span className="relative z-10">My Favourites</span>
              </button>
              <button
                type="button"
                onClick={() => handleAllLocationsChange(true)}
                className={cn(
                  "relative rounded-md px-4 py-2 text-sm transition-all duration-300 ease-in-out",
                  allLocations 
                    ? "bg-[#936de8] text-white" 
                    : "text-gray-600 hover:bg-[#936de8]/10"
                )}
              >
                <span className="relative z-10">All Locations</span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Select the dates you want to play at?</Label>
          <DateRangePicker 
            date={date} 
            onDateChange={handleDateChange}
            onOpenChange={(open) => {
              setIsDatePickerOpen(open)
            }}
          />
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Select preferred time slots</Label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map(slot => {
              const Icon = slot.icon
              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => toggleTimeSlot(slot.id)}
                  className={cn(
                    "flex flex-col items-center py-3 px-2 rounded-lg border transition-all duration-200",
                    "hover:border-[#936de8]/50 hover:bg-[#936de8]/5",
                    selectedTimeSlots.includes(slot.id)
                      ? "border-[#936de8] bg-[#936de8]/10"
                      : "border-gray-200"
                  )}
                >
                  <Icon className={cn(
                    "w-5 h-5 mb-1",
                    selectedTimeSlots.includes(slot.id)
                      ? "text-[#936de8]"
                      : "text-gray-500"
                  )} />
                  <span className="font-medium text-sm">{slot.label}</span>
                  <span className="text-xs text-gray-500">{slot.time}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label className="font-medium">Search for back-to-back sessions?</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span onClick={(e) => e.preventDefault()}>
                    <InfoIcon className="w-4 h-4 text-gray-400 cursor-help" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="mb-2">Consecutive slots are back-to-back time slots. For example, if you select 2 consecutive slots, you'll book two slots right after each other.</p>
                  <div className="flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                    <div className="w-6 h-0.5 bg-[#936de8]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#936de8]" />
                    <div className="w-6 h-0.5 bg-[#936de8]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#936de8]" />
                    <div className="w-6 h-0.5 bg-gray-200" />
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <RadioGroup
            value={consecutiveSlots}
            onValueChange={handleConsecutiveSlotsChange}
            className="flex gap-4"
          >
            {["2", "3", "4"].map((value) => (
              <div key={value} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={value} 
                  id={`slot-${value}`}
                  className="text-[#936de8] border-[#936de8]"
                />
                <Label htmlFor={`slot-${value}`}>{value}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-3 pt-2">
          <Button 
            type="submit" 
            className={cn(
              "w-full h-11",
              "bg-[#936de8] text-white hover:bg-[#936de8]/90",
              isLoading && "animate-pulse"
            )}
            disabled={isLoading || selectedTimeSlots.length === 0 || isDatePickerOpen}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                <span>Searching...</span>
              </div>
            ) : (
              "Search Available Courts"
            )}
          </Button>
          
          {showCancel && (
            <Button 
              type="button" 
              variant="outline" 
              className="w-full h-11"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

