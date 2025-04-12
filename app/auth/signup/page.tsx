"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignUp() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    voterId: "",
    mobileNumber: "",
    otp: "",
  })
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // In a real app, this would be an API call to validate details and send OTP
      console.log(`Sending OTP to ${formData.mobileNumber}`)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsOtpSent(true)
    } catch (err) {
      setError("Failed to send OTP. Please check your details and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // In a real app, this would be an API call to verify OTP and create account
      console.log("Signing up with:", formData)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate successful signup
      localStorage.setItem("authToken", "sample-token-123")
      router.push("/")
    } catch (err) {
      setError("Failed to create account. Please try again.")
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
          <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
          <CardDescription className="text-center">Enter your details to sign up for Gram Vaani</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

          {!isOtpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="voterId">Voter ID</Label>
                <Input
                  id="voterId"
                  name="voterId"
                  type="text"
                  placeholder="Enter your voter ID"
                  value={formData.voterId}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <Input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="tel"
                  placeholder="Enter your 10-digit mobile number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  className="w-full"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending OTP..." : "Continue"}
              </Button>

              <div className="text-center text-sm mt-4">
                Already have an account?{" "}
                <Link href="/auth/signin" className="text-blue-600 hover:underline">
                  Sign in
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  name="otp"
                  type="text"
                  placeholder="Enter the 6-digit OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{6}"
                  className="w-full"
                />
                <p className="text-sm text-gray-500">
                  OTP sent to {formData.mobileNumber}.
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
                {isLoading ? "Creating Account..." : "Sign Up"}
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
