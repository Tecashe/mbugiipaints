"use client"

import { useState, useEffect } from "react"
import { useAuth } from "./use-auth"

interface CartItem {
  id: string
  orderId: string
  artworkId: string
  quantity: number
  price: number
  artwork: {
    id: string
    title: string
    images: string[]
    status: string
  }
}

interface Cart {
  id?: string
  orderItems: CartItem[]
  subtotal?: number
  tax?: number
  shipping?: number
  total?: number
}

export function useCart() {
  const [cart, setCart] = useState<Cart>({ orderItems: [] })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const fetchCart = async () => {
    if (!user) {
      setCart({ orderItems: [] })
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch("/api/cart")

      if (!response.ok) {
        throw new Error("Failed to fetch cart")
      }

      const data = await response.json()
      setCart(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const addToCart = async (artworkId: string, quantity = 1) => {
    if (!user) {
      setError("Please log in to add items to cart")
      return false
    }

    try {
      setError(null)

      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ artworkId, quantity }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to add to cart")
      }

      await fetchCart()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      return false
    }
  }

  const removeFromCart = async (itemId: string) => {
    try {
      setError(null)

      const response = await fetch(`/api/cart/${itemId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to remove from cart")
      }

      await fetchCart()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      return false
    }
  }

  useEffect(() => {
    fetchCart()
  }, [user])

  return {
    cart,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    refetch: fetchCart,
    itemCount: cart.orderItems.length,
  }
}
