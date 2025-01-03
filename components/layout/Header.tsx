"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Card } from "@/components/ui/card"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, useDrawer } from "@/components/ui/drawer"
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
    <nav className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
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
          {/*Removed Drawer component as it was empty after removing the button*/}
        </div>
      </div>
    </nav>
  )
}

