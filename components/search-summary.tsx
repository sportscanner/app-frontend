import { Button } from "@/components/ui/button"
import { Calendar, Clock, Sliders } from 'lucide-react'
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface SearchConfig {
  selectedTimeSlots: string[]
  dateRange: {
    from: Date
    to: Date
  }
  consecutiveSlots: string
  allLocations: boolean
}

interface SearchSummaryProps {
  config: SearchConfig
  onEditSearch: () => void
  className?: string
}

export function SearchSummary({ config, onEditSearch, className }: SearchSummaryProps) {
  const timeSlotLabels = {
    morning: "Morning (6AM-12PM)",
    afternoon: "Afternoon (12PM-6PM)",
    evening: "Evening (6PM-10PM)"
  }

  return (
    <Button
      variant="outline"
      className={cn(
        "flex items-center gap-2 px-3 h-9 rounded-full",
        "hover:bg-accent hover:text-accent-foreground",
        className
      )}
      onClick={onEditSearch}
    >
      <Sliders className="h-4 w-4" />
      <span className="text-sm font-medium">Filters</span>
    </Button>
  )
}

