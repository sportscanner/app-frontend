"use client"

import { useState } from "react"
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onContinueAsGuest: () => void
}

export function LoginModal({ isOpen, onClose, onContinueAsGuest }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempted with:", { email, password })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Log in to Sportscanner</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email address
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full h-12 text-lg bg-[#936de8] hover:bg-[#936de8]/90">
            LOG IN
          </Button>
          <div className="space-y-4 text-center">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Not yet a member? Want to get personalised results based on your club membership discounts and location?
              </p>
              <a href="/join" className="text-[#936de8] hover:underline font-medium">
                Join for free
              </a>
            </div>
            {/* <a href="/reset-password" className="text-sm text-gray-600 hover:text-gray-900">
              Forgot Password?{" "}
              <span className="text-[#936de8] hover:underline font-medium">Reset it</span>
            </a> */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">OR</span>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 text-lg border-2"
              onClick={onContinueAsGuest}
            >
              CONTINUE AS A GUEST
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

