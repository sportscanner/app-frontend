'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Search, Clock, Percent, MapPin, Star, Users, Trophy, Radar, BarChart, BookCheck, Lock, Check } from 'lucide-react'
import { AutoScrollCarousel } from "@/components/ui/auto-scroll-carousel"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger, useDrawer } from "@/components/ui/drawer"
import { FaTableTennis } from "react-icons/fa"
import { GiShuttlecock, GiPingPongBat, GiTennisRacket } from "react-icons/gi"
import { LoginModal } from "@/components/login-modal"
import { useAppState } from '@/lib/state'

interface FeatureCardProps {
  icon: React.ElementType
  title: string
  description: string
  underDevelopment?: boolean
}

function FeatureCard({ icon: Icon, title, description, underDevelopment = false }: FeatureCardProps) {
  return (
    <div className={`relative bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${underDevelopment ? 'border-2 border-dashed border-gray-300 bg-gray-100 opacity-60 filter grayscale' : ''}`}>
      {underDevelopment && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 flex items-center space-x-1">
          <Lock className="w-4 h-4 text-gray-500" />
          <span className="text-xs font-medium text-gray-500">Under development</span>
        </div>
      )}
      <div className="flex items-center mb-4">
        <div className={`mr-4 p-3 rounded-full ${underDevelopment ? 'bg-gray-200' : 'bg-[#936de8]/10'}`}>
          <Icon className={`w-6 h-6 ${underDevelopment ? 'text-gray-400' : 'text-[#936de8]'}`} />
        </div>
        <h3 className={`text-xl font-semibold ${underDevelopment ? 'text-gray-600' : 'text-[#001C3C]'}`}>{title}</h3>
      </div>
      <p className={`${underDevelopment ? 'text-gray-500' : 'text-gray-600'}`}>{description}</p>
    </div>
  )
}

const stats = [
  { icon: Search, value: "95%", label: "Faster Search Experience" },
  { icon: Clock, value: "24/7", label: "Real-time Availability" },
  { icon: MapPin, value: "30+", label: "Sports Venues tracked" },
  { icon: Radar, value: "90%", label: "London city coverage" },
  { icon: Users, value: "1k+", label: "Active Users" },
  { icon: Trophy, value: "4", label: "Sports Available" },
]

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

export default function LandingPage() {
  const { isOpen, setIsOpen } = useDrawer()
  const router = useRouter()
  const [postcode, setPostcode] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { state, setState, resetState } = useAppState()

  useEffect(() => {
    // Reset global state when landing page mounts
    resetState()
  }, [resetState])

  const handleSportSelect = (href: string, active: boolean) => {
    if (active) {
      router.push(href)
      setIsOpen(false)
    }
  }

  const formatPostcode = (input: string) => {
    const cleaned = input.replace(/[^\w\s]/gi, '').toUpperCase()
    const formatted = cleaned.replace(/^([A-Z]{1,2}\d{1,2})(\d)([A-Z]{2})$/, '$1 $2$3')
    return formatted
  }

  const validatePostcode = (input: string) => {
    const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i
    return postcodeRegex.test(input)
  }

  const handlePostcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    const formatted = formatPostcode(input)
    setPostcode(formatted)
    setIsValid(validatePostcode(formatted))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValid) {
      setShowLoginModal(true)
    }
  }

  const handleContinueAsGuest = () => {
    setShowLoginModal(false)
    setIsOpen(true)
  }

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#936de8]/5 to-[#ab92ec]/5 pointer-events-none" />
      <div className="relative">
      {/* Hero Section */}
      <main className="flex-1">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center space-y-8">
            {/* Hero Content */}
            <div className="max-w-3xl mx-auto space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-[#936de8] to-[#ab92ec] text-transparent bg-clip-text">Sportscanner</span>
                <span className="text-[#001C3C]">, your ultimate sports hub</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto">
                Discover, Compare, and Book Sports Facilities Across London
              </p>
              {/* Search Box and CTA Button */}
              <form className="pt-4 flex w-full max-w-md mx-auto">
                <div className="relative flex w-full rounded-xl overflow-hidden border border-gray-200 bg-white focus-within:border-[#936de8] focus-within:ring-2 focus-within:ring-[#936de8] transition-all duration-200">
                  <input
                    type="text"
                    placeholder="Enter your postcode to get started"
                    value={postcode}
                    onChange={handlePostcodeChange}
                    className="flex-grow px-4 py-3 focus:outline-none border-none bg-transparent"
                  />
                  <button 
                    type="button"
                    onClick={handleSubmit}
                    className={`px-5 h-auto rounded-none ${
                      isValid 
                        ? 'bg-[#001C3C] hover:bg-[#001C3C]/90' 
                        : 'bg-gray-400 cursor-not-allowed'
                      } transition-colors`}
                    disabled={!isValid}
                    aria-label="Submit postcode"
                  >
                    <Search className="w-5 h-5 text-white" />
                  </button>
                </div>
              </form>

              {/* Login Modal */}
              <LoginModal 
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onContinueAsGuest={handleContinueAsGuest}
              />

              {/* Sports Selection Drawer */}
              <Drawer open={isOpen} onOpenChange={setIsOpen}>
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
                        onClick={() => handleSportSelect(sport.href, sport.active)}
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

            {/* Stats Auto-Scroll Carousel */}
            <div className="py-8">
              <AutoScrollCarousel className="py-4" duration={30}>
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex-none w-[280px] bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-[#001C3C] mx-auto mb-4">
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#001C3C]">{stat.value}</h3>
                    <p className="text-gray-600 mt-2">{stat.label}</p>
                  </div>
                ))}
              </AutoScrollCarousel>
            </div>

            {/* Experience the Power of Smart Scheduling Section */}
            <section className="py-16 bg-gradient-to-b from-white to-gray-50">
              <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-[#001C3C]">Experience the Power of Smart Scheduling</h2>
                  <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                    Revolutionize your sports booking experience with Sportscanner's intelligent features.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FeatureCard
                    icon={Search}
                    title="Effortless Discovery"
                    description="Search across a vast network of London's top sports venues in a single, streamlined interface."
                  />
                  <FeatureCard
                    icon={BarChart}
                    title="Advanced Search Analytics"
                    description="Combine available slots for seamless multi-hour bookings, ensuring you get the perfect playing time."
                  />
                  <FeatureCard
                    icon={BookCheck}
                    title="Book with Ease"
                    description="Secure your spot quickly and conveniently, all within the Sportscanner platform."
                  />
                  <FeatureCard
                    icon={MapPin}
                    title="Find Your Local Fit"
                    description="Discover incredible sports opportunities near you, making it easier to stay active and connected to the London sports scene."
                    underDevelopment={true}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      </div>
      {/* Footer */}
      <footer className="border-t bg-white/50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Sportscanner. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

