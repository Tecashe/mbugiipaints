"use client"

import { useState, useEffect } from "react"

interface Artwork {
  id: string
  title: string
  description: string | null
  price: number
  category: string
  medium: string
  dimensions: string
  year: number
  images: string[]
  status: "AVAILABLE" | "SOLD" | "RESERVED" | "NOT_FOR_SALE"
  featured: boolean
  tags: string[]
  createdAt: string
  updatedAt: string
  _count?: {
    orderItems: number
  }
}

interface UseArtworksOptions {
  category?: string
  search?: string
  sortBy?: string
  status?: string
  featured?: boolean
}

export function useArtworks(options: UseArtworksOptions = {}) {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchArtworks = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const params = new URLSearchParams()

      if (options.category) params.append("category", options.category)
      if (options.search) params.append("search", options.search)
      if (options.sortBy) params.append("sortBy", options.sortBy)
      if (options.status) params.append("status", options.status)
      if (options.featured) params.append("featured", "true")

      const response = await fetch(`/api/artworks?${params.toString()}`)

      if (!response.ok) {
        throw new Error("Failed to fetch artworks")
      }

      const data = await response.json()
      setArtworks(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchArtworks()
  }, [options.category, options.search, options.sortBy, options.status, options.featured])

  return {
    artworks,
    isLoading,
    error,
    refetch: fetchArtworks,
  }
}

export function useArtwork(id: string) {
  const [artwork, setArtwork] = useState<Artwork | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchArtwork = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`/api/artworks/${id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch artwork")
        }

        const data = await response.json()
        setArtwork(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchArtwork()
  }, [id])

  return {
    artwork,
    isLoading,
    error,
  }
}
