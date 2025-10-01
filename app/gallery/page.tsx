"use client"
export const dynamic = 'force-dynamic'
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useArtworks } from "@/hooks/use-artworks"
import { useCart } from "@/hooks/use-cart"
import Link from "next/link"
import Image from "next/image"
import { Search, Grid, List, ShoppingCart, Heart } from "lucide-react"

const categories = ["all", "landscapes", "urban", "nature", "abstract", "portraits"]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [wishlist, setWishlist] = useState<string[]>([])

  const { artworks, isLoading, error } = useArtworks({
    category: selectedCategory === "all" ? undefined : selectedCategory,
    search: searchTerm || undefined,
    sortBy: "newest",
  })

  const { addToCart } = useCart()

  const toggleWishlist = (artworkId: string) => {
    if (wishlist.includes(artworkId)) {
      setWishlist(wishlist.filter((id) => id !== artworkId))
    } else {
      setWishlist([...wishlist, artworkId])
    }
  }

  const handleAddToCart = async (artworkId: string) => {
    const success = await addToCart(artworkId)
    if (success) {
      // Could show a success toast here
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-100 text-green-800 border-green-200"
      case "SOLD":
        return "bg-red-100 text-red-800 border-red-200"
      case "RESERVED":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "Available"
      case "SOLD":
        return "Sold"
      case "RESERVED":
        return "Reserved"
      case "NOT_FOR_SALE":
        return "Not for Sale"
      default:
        return status
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 px-4 text-center">
          <p className="text-destructive">Error loading gallery: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <Badge variant="secondary" className="font-light tracking-wide">
              Art Collection
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-extralight text-foreground leading-tight text-balance">
              Gallery
              <span className="block font-light text-primary">Original Artworks</span>
            </h1>
            <p className="text-xl font-light text-muted-foreground max-w-3xl mx-auto text-pretty">
              Explore my collection of paintings, each piece crafted with passion and attention to detail.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search artworks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 font-light"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="font-light capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm font-light text-muted-foreground">
            {isLoading ? "Loading..." : `Showing ${artworks.length} artworks`}
          </div>
        </div>
      </section>

      {/* Gallery Grid/List */}
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
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
              {artworks.map((artwork, index) => (
                <Card
                  key={artwork.id}
                  className={`group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 ${
                    viewMode === "grid" ? "transform hover:-translate-y-2" : ""
                  }`}
                >
                  {viewMode === "grid" ? (
                    // Grid View
                    <>
                      <div className="relative overflow-hidden">
                        <Image
                          src={artwork.images[0] || "/placeholder.svg?height=400&width=400&query=abstract art painting"}
                          alt={artwork.title}
                          width={400}
                          height={500}
                          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className={getStatusColor(artwork.status)}>{getStatusLabel(artwork.status)}</Badge>
                        </div>
                        <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="p-6 space-y-3">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-light text-foreground">{artwork.title}</h3>
                          <span className="text-lg font-light text-primary">${artwork.price}</span>
                        </div>
                        <div className="space-y-1 text-sm font-light text-muted-foreground">
                          <p>
                            <span className="font-medium">Medium:</span> {artwork.medium}
                          </p>
                          <p>
                            <span className="font-medium">Size:</span> {artwork.dimensions}
                          </p>
                          <p>
                            <span className="font-medium">Year:</span> {artwork.year}
                          </p>
                        </div>
                        <p className="text-sm font-light text-muted-foreground text-pretty line-clamp-2">
                          {artwork.description}
                        </p>
                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" className="flex-1 font-light bg-transparent" asChild>
                            <Link href={`/gallery/${artwork.id}`}>View Details</Link>
                          </Button>
                          {artwork.status === "AVAILABLE" && (
                            <Button className="flex-1 font-light" onClick={() => handleAddToCart(artwork.id)}>
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Add to Cart
                            </Button>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    // List View
                    <div className="flex gap-6 p-6">
                      <div className="relative flex-shrink-0">
                        <Image
                          src={artwork.images[0] || "/placeholder.svg?height=250&width=200&query=abstract art painting"}
                          alt={artwork.title}
                          width={200}
                          height={250}
                          className="w-48 h-60 object-cover rounded-lg"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className={getStatusColor(artwork.status)}>{getStatusLabel(artwork.status)}</Badge>
                        </div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-2xl font-light text-foreground">{artwork.title}</h3>
                            <Badge variant="outline" className="mt-2 font-light capitalize">
                              {artwork.category}
                            </Badge>
                          </div>
                          <span className="text-2xl font-light text-primary">${artwork.price}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm font-light text-muted-foreground">
                          <div>
                            <span className="font-medium">Medium:</span>
                            <p>{artwork.medium}</p>
                          </div>
                          <div>
                            <span className="font-medium">Size:</span>
                            <p>{artwork.dimensions}</p>
                          </div>
                          <div>
                            <span className="font-medium">Year:</span>
                            <p>{artwork.year}</p>
                          </div>
                        </div>
                        <p className="font-light text-muted-foreground text-pretty">{artwork.description}</p>
                        <div className="flex gap-3">
                          <Button variant="outline" className="font-light bg-transparent" asChild>
                            <Link href={`/gallery/${artwork.id}`}>View Details</Link>
                          </Button>
                          {artwork.status === "AVAILABLE" && (
                            <Button className="font-light" onClick={() => handleAddToCart(artwork.id)}>
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Add to Cart
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
