"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Card } from "@/components/ui/card"
import { Palette } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireAdmin?: boolean
  redirectTo?: string
}

export function AuthGuard({
  children,
  requireAuth = true,
  requireAdmin = false,
  redirectTo = "/auth/login",
}: AuthGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isLoading) return

    const isAuthenticated = !!user
    const isAdmin = user?.role === "ADMIN"

    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo)
      return
    }

    if (requireAdmin && !isAdmin) {
      router.push("/auth/login")
      return
    }

    setShouldRender(true)
  }, [user, isLoading, requireAuth, requireAdmin, redirectTo, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Palette className="w-8 h-8 text-primary" />
          </div>
          <p className="font-light text-muted-foreground">Checking authentication...</p>
        </Card>
      </div>
    )
  }

  if (!shouldRender) {
    return null // Will redirect
  }

  return <>{children}</>
}
