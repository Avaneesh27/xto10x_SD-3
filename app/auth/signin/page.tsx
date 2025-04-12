"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignIn() {
  const router = useRouter()
  const [mobileNumber, setMobileNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // In a real app, this would be an API call to send OTP
      console.log(`Sending OTP to ${mobileNumber}`)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsOtpSent(true)
    } catch (err) {
      setError("Failed to send OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // In a real app, this would be an API call to verify OTP
      console.log(`Verifying OTP ${otp} for ${mobileNumber}`)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate successful login
      localStorage.setItem("authToken", "sample-token-123")
      router.push("/")
    } catch (err) {
      setError("Invalid OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1470&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
      }}
    >
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
          <CardDescription className="text-center">Enter your mobile number to receive an OTP</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

          {!isOtpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <Input
                  id="mobileNumber"
                  type="tel"
                  placeholder="Enter your 10-digit mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                  pattern="[0-9]{10}"
                  className="w-full"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </Button>

              <div className="text-center text-sm mt-4">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter the 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  pattern="[0-9]{6}"
                  className="w-full"
                />
                <p className="text-sm text-gray-500">
                  OTP sent to {mobileNumber}.
                  <button
                    type="button"
                    onClick={() => setIsOtpSent(false)}
                    className="text-blue-600 hover:underline ml-1"
                  >
                    Change
                  </button>
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify & Sign In"}
              </Button>

              <div className="text-center text-sm">
                Didn't receive OTP?{" "}
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="text-blue-600 hover:underline"
                  disabled={isLoading}
                >
                  Resend
                </button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
