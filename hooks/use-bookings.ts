"use client"

import { useState, useEffect } from "react"
import { useAuth } from "./use-auth"

interface Booking {
  id: string
  userId: string
  classId: string
  status: "CONFIRMED" | "CANCELLED" | "COMPLETED"
  notes: string | null
  bookedAt: string
  createdAt: string
  updatedAt: string
  class: {
    id: string
    title: string
    startDate: string
    endDate: string
    location: string
    price: number
  }
  user: {
    id: string
    name: string | null
    email: string
  }
}

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const fetchBookings = async () => {
    if (!user) {
      setBookings([])
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch("/api/bookings")

      if (!response.ok) {
        throw new Error("Failed to fetch bookings")
      }

      const data = await response.json()
      setBookings(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const createBooking = async (classId: string, notes?: string) => {
    if (!user) {
      setError("Please log in to book a class")
      return false
    }

    try {
      setError(null)

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ classId, notes }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create booking")
      }

      await fetchBookings()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      return false
    }
  }

  const cancelBooking = async (bookingId: string) => {
    try {
      setError(null)

      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to cancel booking")
      }

      await fetchBookings()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      return false
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [user])

  return {
    bookings,
    isLoading,
    error,
    createBooking,
    cancelBooking,
    refetch: fetchBookings,
  }
}
