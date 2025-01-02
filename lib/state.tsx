'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { DateRange } from "@/components/ui/date-range-picker"

interface AppState {
  consecutiveSlots: string
  dateRange: DateRange | undefined
  selectedTimeSlots: string[]
  allLocations: boolean
}

interface AppStateContextType {
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
  resetState: () => void
}

const initialState: AppState = {
  consecutiveSlots: "4",
  dateRange: undefined,
  selectedTimeSlots: [],
  allLocations: false,
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined)

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState)

  const resetState = useCallback(() => {
    setState(initialState)
  }, [])

  return (
    <AppStateContext.Provider value={{ state, setState, resetState }}>
      {children}
    </AppStateContext.Provider>
  )
}

export const useAppState = () => {
  const context = useContext(AppStateContext)
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider')
  }
  return context
}

