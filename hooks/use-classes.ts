"use client"

import { useState, useEffect } from "react"

interface Class {
  id: string
  title: string
  description: string | null
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
  duration: string
  sessions: number
  price: number
  maxStudents: number
  schedule: string
  startDate: string
  endDate: string
  location: string
  address: string | null
  images: string[]
  materials: string | null
  highlights: string[]
  curriculum: any[]
  requirements: string[]
  included: string[]
  status: "ACTIVE" | "CANCELLED" | "COMPLETED"
  createdAt: string
  updatedAt: string
  _count?: {
    bookings: number
  }
  bookings?: any[]
}

interface UseClassesOptions {
  level?: string
  search?: string
  status?: string
  upcoming?: boolean
}

export function useClasses(options: UseClassesOptions = {}) {
  const [classes, setClasses] = useState<Class[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchClasses = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const params = new URLSearchParams()

      if (options.level) params.append("level", options.level)
      if (options.search) params.append("search", options.search)
      if (options.status) params.append("status", options.status)
      if (options.upcoming) params.append("upcoming", "true")

      const response = await fetch(`/api/classes?${params.toString()}`)

      if (!response.ok) {
        throw new Error("Failed to fetch classes")
      }

      const data = await response.json()
      setClasses(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchClasses()
  }, [options.level, options.search, options.status, options.upcoming])

  return {
    classes,
    isLoading,
    error,
    refetch: fetchClasses,
  }
}

export function useClass(id: string) {
  const [classData, setClassData] = useState<Class | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchClass = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`/api/classes/${id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch class")
        }

        const data = await response.json()
        setClassData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchClass()
  }, [id])

  return {
    classData,
    isLoading,
    error,
  }
}
