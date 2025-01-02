"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight } from 'lucide-react'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger, useDrawer } from "@/components/ui/drawer"
import { FaTableTennis } from "react-icons/fa"
import { GiShuttlecock, GiPingPongBat, GiTennisRacket } from "react-icons/gi"

const sports = [
  { 
    name: 'Badminton', 
    icon: GiShuttlecock, 
    href: '/book', 
    active: true 
  },
  { 
    name: 'Table Tennis', 
    icon: FaTableTennis, 
    href: '/table-tennis', 
    active: false 
  },
  { 
    name: 'Paddle', 
    icon: GiTennisRacket, 
    href: '/paddle', 
    active: false 
  },
  { 
    name: 'Pickleball', 
    icon: GiPingPongBat, 
    href: '/pickleball', 
    active: false 
  },
]

export function Header() {
  const { isOpen, setIsOpen } = useDrawer()

  return (
    <nav className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sportscanner-v2-purple-transparent%20bg-PfekjV0cIdNycje0NDyZF84cwZRijN.png"
              alt="Sportscanner Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-[#001C3C]">Sportscanner</span>
          </Link>
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline" className="hidden sm:flex" onClick={() => setIsOpen(true)}>
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-auto max-h-[85vh]">
              <DrawerHeader>
                <DrawerTitle>Choose Your Sport</DrawerTitle>
                <DrawerDescription>Select a sport to find and book available facilities</DrawerDescription>
              </DrawerHeader>
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sports.map((sport) => (
                  <Card 
                    key={sport.name}
                    className={`relative overflow-hidden cursor-pointer transition-all duration-200 ${
                      sport.active 
                        ? 'hover:shadow-lg hover:-translate-y-1' 
                        : 'opacity-60 hover:opacity-70'
                    }`}
                    onClick={() => sport.active && setIsOpen(false)}
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${sport.active ? 'bg-[#936de8]/10' : 'bg-gray-100'}`}>
                          <sport.icon className={`w-8 h-8 ${sport.active ? 'text-[#936de8]' : 'text-gray-400'}`} />
                        </div>
                        <div>
                          <h3 className={`font-semibold ${sport.active ? 'text-blue-600' : 'text-gray-400'}`}>
                            {sport.name}
                          </h3>
                          {!sport.active && (
                            <span className="inline-block mt-1 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              Coming Soon
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </nav>
  )
}

