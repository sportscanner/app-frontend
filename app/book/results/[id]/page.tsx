'use client'

import { useState, useEffect } from 'react'
import { notFound, useRouter } from "next/navigation"
import { BookingSlotCard } from "@/components/booking-slot-card"
import { SearchSummary } from "@/components/search-summary"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import BadmintonBookingForm from "@/app/book/badminton-form"

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

interface SearchConfig {
  selectedTimeSlots: string[]
  dateRange: {
    from: string
    to: string
  }
  consecutiveSlots: string
  allLocations: boolean
}

interface SearchResults {
  config: SearchConfig
  slots: BookingSlot[]
}

export default function ResultsPage({ params }: { params: { id: string } }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [results, setResults] = useState<SearchResults | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedResults = sessionStorage.getItem('bookingResults')
    if (storedResults) {
      try {
        const parsedResults = JSON.parse(storedResults)
        if (parsedResults.resultId === params.id) {
          setResults(parsedResults)
          setIsLoading(false)
        } else {
          throw new Error('Stored results do not match the current page')
        }
      } catch (err) {
        console.error('Error parsing stored results:', err)
        setError('An error occurred while loading the results. Please try searching again.')
        setIsLoading(false)
      }
    } else {
      setError('No results found. Please try searching again.')
      setIsLoading(false)
    }
  }, [params.id])

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>
  }

  if (error || !results) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <p className="text-red-600 mb-4">{error || 'No results found'}</p>
        <button
          onClick={() => router.push('/book')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go Back to Search
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#001C3C]">Available Badminton Slots</h1>
            <SearchSummary 
              config={results.config}
              onEditSearch={() => setIsDrawerOpen(true)}
              className="bg-white"
            />
          </div>
          <span className="text-sm text-muted-foreground">Availability found across {results.slots.length} venues</span>
        </div>

        <div className="grid gap-4">
          {results.slots.map((slot, index) => (
            <BookingSlotCard key={index} slot={slot} />
          ))}
        </div>
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Refine Your Search</DrawerTitle>
            <DrawerDescription>Adjust your search criteria to find more slots</DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <BadmintonBookingForm 
              initialConfig={results.config}
              onClose={() => setIsDrawerOpen(false)}
              showCancel
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

