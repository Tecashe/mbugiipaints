"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Mail, Palette } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate password reset email
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <Card className="p-8 shadow-2xl border-0 text-center">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h1 className="text-2xl font-extralight text-foreground">Check Your Email</h1>
                  <p className="font-light text-muted-foreground text-pretty">
                    We've sent a password reset link to <strong>{email}</strong>
                  </p>
                </div>
                <div className="space-y-4">
                  <Button className="w-full font-light tracking-wide">
                    <Link href="/auth/login">Back to Login</Link>
                  </Button>
                  <Button variant="outline" className="w-full font-light tracking-wide bg-transparent">
                    Resend Email
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/auth/login"
              className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors font-light"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </Link>
          </div>

          <Card className="p-8 shadow-2xl border-0">
            <div className="space-y-8">
              {/* Header */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Palette className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-extralight text-foreground">Reset Password</h1>
                  <p className="font-light text-muted-foreground text-pretty">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-light text-foreground">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background font-light focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>

                <Button type="submit" className="w-full font-light tracking-wide" size="lg" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>

              {/* Footer */}
              <div className="text-center">
                <p className="text-sm font-light text-muted-foreground">
                  Remember your password?{" "}
                  <Link href="/auth/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
