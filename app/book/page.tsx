'use client'

import BadmintonBookingForm from './badminton-form'
import Image from 'next/image'
import { Clock, MapPin, Shield, Trophy, Lock } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function BookingPage() {
  const [mountKey, setMountKey] = useState(0);
  const features = [
    {
      icon: Clock,
      title: "Real-time Availability",
      description: "Check court availability instantly across multiple venues"
    },
    {
      icon: MapPin,
      title: "30+ Venues",
      description: "Find courts near you with our extensive network of venues"
    },
    {
      icon: Shield,
      title: "Secure Booking",
      description: "Book with confidence using our secure payment system",
      underDevelopment: true
    },
    {
      icon: Trophy,
      title: "Best Price Guarantee",
      description: "Get the best rates with our price match guarantee"
    }
  ];

  useEffect(() => {
    setMountKey(prevKey => prevKey + 1);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <div className="relative min-h-[85vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1"
            alt="Badminton court"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
        </div>

        <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Find and book badminton courts
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8">
              Compare prices and availability across London's best venues
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-6">
            <BadmintonBookingForm key={mountKey} />
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why book with Sportscanner?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We make it easy to find and book badminton courts across London
            </p>
          </div>

          {/* Desktop View */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>

          {/* Mobile View with Carousel */}
          <div className="sm:hidden relative">
            <Carousel className="w-full max-w-xs mx-auto">
              <CarouselContent>
                {features.map((feature, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <FeatureCard {...feature} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex items-center justify-between absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 pointer-events-none">
                <CarouselPrevious className="pointer-events-auto" />
                <CarouselNext className="pointer-events-auto" />
              </div>
              <div className="flex justify-center mt-4 gap-1">
                {features.map((_, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 rounded-full bg-gray-300"
                    aria-hidden="true"
                  />
                ))}
              </div>
            </Carousel>
            <p className="text-center text-sm text-gray-500 mt-2">
              Swipe or use arrows to see more features
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  underDevelopment?: boolean;
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
      <div className="flex flex-col items-center text-center">
        <div className={`mb-4 p-3 rounded-full ${underDevelopment ? 'bg-gray-200' : 'bg-[#936de8]/10'}`}>
          <Icon className={`w-6 h-6 ${underDevelopment ? 'text-gray-400' : 'text-[#936de8]'}`} />
        </div>
        <h3 className={`text-lg font-semibold mb-2 ${underDevelopment ? 'text-gray-600' : 'text-[#001C3C]'}`}>{title}</h3>
        <p className={`text-sm ${underDevelopment ? 'text-gray-500' : 'text-gray-600'}`}>{description}</p>
      </div>
    </div>
  )
}

