'use client'

import BadmintonBookingForm from './badminton-form'
import Image from 'next/image'
import { Clock, MapPin, Shield, Trophy, Lock } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function BookingPage() {
  const [mountKey, setMountKey] = useState(0);

  useEffect(() => {
    // Force remount of BadmintonBookingForm when component mounts
    setMountKey(prevKey => prevKey + 1);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <div className="relative min-h-[85vh] flex items-center justify-center">
        {/* Background Image */}
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

        {/* Content */}
        <div className="relative z-20 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Find and book badminton courts
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8">
              Compare prices and availability across London's best venues
            </p>
          </div>

          {/* Search Form Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-6">
            <BadmintonBookingForm key={mountKey} />
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why book with Sportscanner?</h2>
            <p className="mt-4 text-lg text-gray-600">
              We make it easy to find and book badminton courts across London
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-[#936de8]/10">
                <Clock className="h-6 w-6 text-[#936de8]" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Real-time Availability</h3>
              <p className="mt-2 text-base text-gray-600">
                Check court availability instantly across multiple venues
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-[#936de8]/10">
                <MapPin className="h-6 w-6 text-[#936de8]" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">30+ Venues</h3>
              <p className="mt-2 text-base text-gray-600">
                Find courts near you with our extensive network of venues
              </p>
            </div>

            <div className="text-center relative border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-100 opacity-60">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-100/80 backdrop-blur-sm px-2 py-1 flex items-center space-x-1">
                <Lock className="w-4 h-4 text-gray-500" />
                <span className="text-xs font-medium text-gray-500">Under development</span>
              </div>
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-gray-200">
                <Shield className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-600">Secure Booking</h3>
              <p className="mt-2 text-base text-gray-500">
                Book with confidence using our secure payment system
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-[#936de8]/10">
                <Trophy className="h-6 w-6 text-[#936de8]" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Best Price Guarantee</h3>
              <p className="mt-2 text-base text-gray-600">
                Get the best rates with our price match guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

