"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, CreditCard } from "lucide-react"

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Sunset Dreams",
      artist: "mbugiipaints",
      medium: "Oil on Canvas",
      size: "24x36 inches",
      price: 1200,
      quantity: 1,
      image: "/abstract-sunset-painting-with-warm-colors.jpg",
      status: "available",
    },
    {
      id: 3,
      title: "Nature's Symphony",
      artist: "mbugiipaints",
      medium: "Watercolor",
      size: "16x20 inches",
      price: 650,
      quantity: 1,
      image: "/nature-landscape-watercolor-painting.jpg",
      status: "available",
    },
  ])

  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "art10") {
      setAppliedPromo("ART10")
      setPromoCode("")
    } else {
      alert("Invalid promo code")
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = appliedPromo === "ART10" ? subtotal * 0.1 : 0
  const shipping = subtotal > 1000 ? 0 : 50
  const tax = (subtotal - discount) * 0.08
  const total = subtotal - discount + shipping + tax

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-extralight text-foreground">Your Cart is Empty</h1>
              <p className="text-xl font-light text-muted-foreground text-pretty">
                Discover beautiful artworks and add them to your cart to get started.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="font-light tracking-wide">
                <Link href="/shop">Browse Artworks</Link>
              </Button>
              <Button variant="outline" size="lg" className="font-light tracking-wide bg-transparent">
                <Link href="/gallery">View Gallery</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors font-light"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-extralight text-foreground">Shopping Cart</h1>
                <p className="font-light text-muted-foreground">{cartItems.length} items in your cart</p>
              </div>

              <div className="space-y-6">
                {cartItems.map((item) => (
                  <Card key={item.id} className="p-6">
                    <div className="flex gap-6">
                      <div className="relative w-32 h-32 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <Badge className="absolute -top-2 -right-2 bg-green-100 text-green-800 border-green-200">
                          {item.status}
                        </Badge>
                      </div>

                      <div className="flex-1 space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-xl font-light text-foreground">{item.title}</h3>
                          <p className="font-light text-muted-foreground">by {item.artist}</p>
                          <p className="text-sm font-light text-muted-foreground">
                            {item.medium} • {item.size}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="font-light text-muted-foreground">Quantity:</span>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 p-0"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center font-light">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 p-0"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="text-xl font-light text-foreground">${item.price * item.quantity}</div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="p-6 sticky top-24">
                <div className="space-y-6">
                  <h2 className="text-2xl font-light text-foreground">Order Summary</h2>

                  <div className="space-y-4">
                    <div className="flex justify-between font-light">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span className="text-foreground">${subtotal}</span>
                    </div>

                    {appliedPromo && (
                      <div className="flex justify-between font-light">
                        <span className="text-muted-foreground">Discount ({appliedPromo}):</span>
                        <span className="text-green-600">-${discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between font-light">
                      <span className="text-muted-foreground">Shipping:</span>
                      <span className="text-foreground">{shipping === 0 ? "Free" : `$${shipping}`}</span>
                    </div>

                    <div className="flex justify-between font-light">
                      <span className="text-muted-foreground">Tax:</span>
                      <span className="text-foreground">${tax.toFixed(2)}</span>
                    </div>

                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between text-xl font-light">
                        <span className="text-foreground">Total:</span>
                        <span className="text-foreground">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg border border-border bg-background font-light focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <Button variant="outline" onClick={applyPromoCode} className="font-light bg-transparent">
                        Apply
                      </Button>
                    </div>
                    {appliedPromo && (
                      <div className="text-sm font-light text-green-600">Promo code applied: 10% off</div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Button size="lg" className="w-full font-light tracking-wide">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Proceed to Checkout
                    </Button>
                    <Button variant="outline" size="lg" className="w-full font-light tracking-wide bg-transparent">
                      <Link href="/shop">Continue Shopping</Link>
                    </Button>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex items-center space-x-3 text-sm font-light text-muted-foreground">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Free shipping on orders over $1,000</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm font-light text-muted-foreground">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>30-day return policy</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm font-light text-muted-foreground">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Certificate of authenticity included</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
