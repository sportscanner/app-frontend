import { format } from "date-fns"
import { Clock, MapPin, ExternalLink, ArrowRight } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TimeSlot {
  time: string
  available: boolean
}

interface BookingSlot {
  startTime: string
  endTime: string
  location: string
  distance: number
  price: number
  organization: string
  date: string
  otherSlots: TimeSlot[]
}

interface BookingSlotCardProps {
  slot: BookingSlot
}

export function BookingSlotCard({ slot }: BookingSlotCardProps) {
  return (
    <Card className="w-full">
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-[1fr,auto]">
          <div className="space-y-1">
            <div className="flex items-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <time>{slot.startTime} - {slot.endTime}</time>
                <span>•</span>
                <time>{format(new Date(slot.date), 'EEE, MMM d')}</time>
              </div>
            </div>
            <p className="text-xs font-medium text-[#936de8]">{slot.organization}</p>
            <h3 className="text-lg font-semibold">{slot.location}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{slot.distance.toFixed(1)} miles away</span>
            </div>

            <div className="border-t border-dashed pt-3">
              <p className="text-sm font-medium text-gray-600 mb-2">Also available at:</p>
              <div className="flex flex-wrap gap-1">
                {slot.otherSlots.slice(0, 5).map((timeSlot, index) => (
                  <div
                    key={index}
                    className={cn(
                      "px-2 py-1 rounded text-xs font-medium border transition-colors",
                      timeSlot.available
                        ? "border-[#936de8] bg-[#936de8]/10 text-[#936de8]"
                        : "border-gray-200 bg-gray-50 text-gray-400"
                    )}
                  >
                    {timeSlot.time}
                  </div>
                ))}
                {slot.otherSlots.length > 5 && (
                  <div className="px-2 py-1 rounded text-xs font-medium border border-gray-200 bg-gray-50 text-gray-400">
                    +{slot.otherSlots.length - 5} more
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-row sm:flex-col items-start sm:items-end justify-between sm:justify-end gap-2 pt-3 sm:pt-0 border-t sm:border-0">
            <div className="flex flex-col items-start sm:items-end">
              <span className="text-xs text-muted-foreground">starting from</span>
              <span className="text-lg">£{slot.price.toFixed(2)}</span>
            </div>
            <Button className="bg-[#936de8] hover:bg-[#936de8]/90 text-white rounded-lg px-4">
              Book Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

