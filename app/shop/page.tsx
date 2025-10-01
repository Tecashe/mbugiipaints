"use client"
export const dynamic = 'force-dynamic'
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useArtworks } from "@/hooks/use-artworks"
import { useCart } from "@/hooks/use-cart"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart, Filter, Search, Star, Eye } from "lucide-react"

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [wishlist, setWishlist] = useState<string[]>([])

  const { artworks, isLoading, error } = useArtworks({
    category: selectedCategory === "all" ? undefined : selectedCategory,
    search: searchTerm || undefined,
    sortBy: sortBy,
    status: "AVAILABLE", // Only show available items in shop
  })

  const { addToCart, cart } = useCart()

  const handleAddToCart = async (artworkId: string) => {
    const success = await addToCart(artworkId)
    if (success) {
      // Could show a success toast here
    }
  }

  const toggleWishlist = (artworkId: string) => {
    if (wishlist.includes(artworkId)) {
      setWishlist(wishlist.filter((id) => id !== artworkId))
    } else {
      setWishlist([...wishlist, artworkId])
    }
  }

  const isInCart = (artworkId: string) => {
    return cart.orderItems.some((item) => item.artworkId === artworkId)
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 px-4 text-center">
          <p className="text-destructive">Error loading shop: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <Badge variant="secondary" className="font-light tracking-wide">
              Art Collection
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-extralight text-foreground leading-tight text-balance">
              Original Artworks
              <span className="block font-light text-primary">Available for Purchase</span>
            </h1>
            <p className="text-xl font-light text-muted-foreground max-w-3xl mx-auto text-pretty">
              Discover unique, original paintings and artworks. Each piece is carefully crafted and ready to bring
              beauty to your space.
            </p>
          </div>
          <div className="flex items-center justify-center space-x-4 text-sm font-light text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Sold</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Reserved</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search artworks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background font-light focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-auto">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="all" className="font-light">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="paintings" className="font-light">
                    Paintings
                  </TabsTrigger>
                  <TabsTrigger value="watercolors" className="font-light">
                    Watercolors
                  </TabsTrigger>
                  <TabsTrigger value="abstract" className="font-light">
                    Abstract
                  </TabsTrigger>
                  <TabsTrigger value="drawings" className="font-light">
                    Drawings
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-light text-muted-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-lg border border-border bg-background font-light focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm font-light text-muted-foreground">
            {isLoading ? "Loading..." : `Showing ${artworks.length} available artworks`}
          </div>
        </div>
      </section>

      {/* Artworks Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-xl font-light text-muted-foreground">Loading artworks...</p>
            </div>
          ) : artworks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl font-light text-muted-foreground">No artworks found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artworks.map((artwork, index) => (
                <Card
                  key={artwork.id}
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={artwork.images[0] || "/placeholder.svg?height=400&width=400&query=abstract art painting"}
                      alt={artwork.title}
                      width={400}
                      height={500}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-100 text-green-800 border-green-200">Available</Badge>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => toggleWishlist(artwork.id)}
                        className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                          wishlist.includes(artwork.id)
                            ? "bg-red-500/90 text-white"
                            : "bg-white/90 text-gray-800 hover:bg-red-500/90 hover:text-white"
                        }`}
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                      <Link href={`/shop/${artwork.id}`}>
                        <button className="p-2 rounded-full bg-white/90 text-gray-800 hover:bg-primary/90 hover:text-white transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>

                    {/* Price */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                        <div className="text-lg font-light text-gray-800">${artwork.price}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-light text-foreground group-hover:text-primary transition-colors">
                        {artwork.title}
                      </h3>
                      <p className="text-sm font-light text-muted-foreground line-clamp-2">{artwork.description}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm font-light text-muted-foreground">
                      <div>
                        {artwork.medium} • {artwork.dimensions}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-current text-yellow-500" />
                        <span>4.8 (12)</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="text-2xl font-light text-foreground">${artwork.price}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="font-light tracking-wide bg-transparent" asChild>
                          <Link href={`/shop/${artwork.id}`}>View Details</Link>
                        </Button>
                        <Button
                          size="sm"
                          className="font-light tracking-wide"
                          onClick={() => handleAddToCart(artwork.id)}
                          disabled={isInCart(artwork.id)}
                        >
                          {isInCart(artwork.id) ? (
                            "In Cart"
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Add to Cart
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cart Summary */}
      {cart.orderItems.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40">
          <Link href="/cart">
            <Button size="lg" className="font-light tracking-wide shadow-2xl">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Cart ({cart.orderItems.length})
            </Button>
          </Link>
        </div>
      )}

      {/* Newsletter  CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-extralight text-foreground text-balance">
              Stay Updated on New Releases
            </h2>
            <p className="text-xl font-light text-muted-foreground text-pretty">
              Be the first to know when new artworks become available. Join our collector's newsletter for exclusive
              previews and early access.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background font-light focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="font-light tracking-wide">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
