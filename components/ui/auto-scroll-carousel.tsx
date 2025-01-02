"use client"

import { useEffect, useRef, useState } from 'react'
import { cn } from "@/lib/utils"

interface AutoScrollCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number
  pauseOnHover?: boolean
  children: React.ReactNode
}

export function AutoScrollCarousel({
  className,
  duration = 20,
  pauseOnHover = false,
  children,
  ...props
}: AutoScrollCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [start, setStart] = useState(false)

  useEffect(() => {
    if (!scrollerRef.current || !contentRef.current) return
    
    const scrollerContent = contentRef.current
    const scrollWidth = scrollerContent.offsetWidth
    
    scrollerRef.current.style.setProperty('--duration', `${duration}s`)
    scrollerRef.current.style.setProperty('--gap', '1rem')

    // Add a small delay before starting the animation
    const timer = setTimeout(() => setStart(true), 100)

    return () => clearTimeout(timer)
  }, [duration])

  return (
    <div
      className={cn(
        "group relative max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
      {...props}
    >
      <div
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        <div ref={contentRef} className="flex items-center justify-start gap-4 min-w-max">
          {children}
        </div>
        <div aria-hidden="true" className="flex items-center justify-start gap-4 min-w-max">
          {children}
        </div>
      </div>
    </div>
  )
}

