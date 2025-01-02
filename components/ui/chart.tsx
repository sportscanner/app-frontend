"use client"

import * as React from "react"
import { ResponsiveContainer } from "recharts"

export interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartProps>(
  ({ config, children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        <ResponsiveContainer width="100%" height="100%">
          {React.Children.map(children, child => 
            React.isValidElement(child) 
              ? React.cloneElement(child, { fill: "#01e7bb" })
              : child
          )}
        </ResponsiveContainer>
      </div>
    )
  }
)
ChartContainer.displayName = "ChartContainer"

interface ChartTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
  payload?: any[]
  hideLabel?: boolean
}

const ChartTooltip = React.forwardRef<HTMLDivElement, ChartTooltipProps>(
  ({ active, payload, hideLabel = false, ...props }, ref) => {
    if (!active || !payload) {
      return null
    }

    return (
      <div
        ref={ref}
        className="rounded-lg border bg-background p-2 shadow-sm"
        {...props}
      >
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            {!hideLabel && (
              <span className="text-sm font-medium">{item.name}:</span>
            )}
            <span className="text-sm font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    )
  }
)
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipProps>(
  ({ active, payload, hideLabel = false, ...props }, ref) => {
    if (!active || !payload) {
      return null
    }

    return (
      <div
        ref={ref}
        className="rounded-lg border bg-background p-2 shadow-sm"
        {...props}
      >
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            {!hideLabel && (
              <span className="text-sm font-medium">{item.name}:</span>
            )}
            <span className="text-sm font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"

// Note: To remove grid lines, ensure that <CartesianGrid /> is not used in the BarChart component

export { ChartContainer, ChartTooltip, ChartTooltipContent }

