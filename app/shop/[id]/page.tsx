"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ShoppingCart, Heart, Share2, Star, Shield, Truck, RotateCcw } from "lucide-react"

export default function ArtworkDetailPage({ params }: { params: { id: string } }) {
  const [selectedTab, setSelectedTab] = useState("details")
  const [isInCart, setIsInCart] = useState(false)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  // Mock artwork data - in real app, fetch by ID
  const artwork = {
    id: 1,
    title: "Sunset Dreams",
    artist: "mbugiipaints",
    medium: "Oil on Canvas",
    size: "24x36 inches",
    year: "2024",
    price: 1200,
    originalPrice: 1400,
    category: "paintings",
    status: "available",
    images: [
      "/abstract-sunset-painting-with-warm-colors.jpg",
      "/artist-studio-with-paintings-and-art-supplies.jpg",
      "/nature-landscape-watercolor-painting.jpg",
    ],
    rating: 4.9,
    review: 12,
    description:
      "A vibrant sunset painting capturing the golden hour with warm, flowing colors. This piece represents the peaceful transition from day to night, with layers of warm oranges, deep reds, and soft purples that create a sense of movement and tranquility.",
    longDescription:
      "Created during a series of plein air sessions at the coast, this oil painting captures the ephemeral beauty of sunset. The layered brushwork creates depth and movement, while the warm color palette evokes feelings of peace and contemplation. This piece would make a stunning focal point in any living space, bringing warmth and natural beauty indoors.",
    tags: ["sunset", "abstract", "warm colors", "landscape"],
    dimensions: {
      width: 24,
      height: 36,
      depth: 1.5,
    },
    weight: "3.2 lbs",
    materials: ["Professional grade oil paints", "Premium cotton canvas", "Wooden stretcher frame"],
    techniques: ["Impasto", "Glazing", "Wet-on-wet blending"],
    care: [
      "Display away from direct sunlight",
      "Maintain stable temperature and humidity",
      "Dust gently with soft, dry brush",
      "Professional cleaning recommended",
    ],
    shipping: {
      domestic: "Free shipping within US",
      international: "International shipping available",
      packaging: "Professional art packaging with insurance",
      timeframe: "Ships within 3-5 business days",
    },
    certificate: true,
    signed: true,
    framed: false,
    reviews: [
      {
        id: 1,
        name: "Sarah Johnson",
        rating: 5,
        date: "2024-01-15",
        comment:
          "Absolutely stunning piece! The colors are even more vibrant in person. It's become the centerpiece of our living room.",
        verified: true,
      },
      {
        id: 2,
        name: "Michael Chen",
        rating: 5,
        date: "2024-01-10",
        comment: "Beautiful work. The texture and depth are incredible. Shipping was fast and packaging was excellent.",
        verified: true,
      },
      {
        id: 3,
        name: "Emma Davis",
        rating: 4,
        date: "2024-01-05",
        comment: "Love this painting! The warm colors create such a peaceful atmosphere. Highly recommend.",
        verified: true,
      },
    ],
  }

  const relatedArtworks = [
    {
      id: 2,
      title: "Urban Reflections",
      price: 850,
      image: "/urban-cityscape-reflection.png",
    },
    {
      id: 3,
      title: "Nature's Symphony",
      price: 650,
      image: "/nature-landscape-watercolor-painting.jpg",
    },
    {
      id: 5,
      title: "Coastal Serenity",
      price: 950,
      image: "/coastal-ocean-painting-with-waves.jpg",
    },
  ]

  const handleAddToCart = () => {
    setIsInCart(true)
    // Add to cart logic here
  }

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200"
      case "sold":
        return "bg-red-100 text-red-800 border-red-200"
      case "reserved":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
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
              <span>Back to Shop</span>
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src={artwork.images[selectedImage] || "/placeholder.svg"}
                  alt={artwork.title}
                  width={600}
                  height={800}
                  className="w-full h-96 lg:h-[600px] object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getStatusColor(artwork.status)}>
                    {artwork.status.charAt(0).toUpperCase() + artwork.status.slice(1)}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {artwork.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${artwork.title} view ${index + 1}`}
                      width={200}
                      height={150}
                      className="w-full h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl lg:text-5xl font-extralight text-foreground text-balance">{artwork.title}</h1>
                  <p className="text-lg font-light text-muted-foreground">by {artwork.artist}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(artwork.rating) ? "fill-current text-yellow-500" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-light text-muted-foreground">
                    {artwork.rating} ({artwork.reviews.length} reviews)
                  </span>
                </div>

                <p className="text-lg font-light text-muted-foreground text-pretty">{artwork.description}</p>
              </div>

              {/* Price and Actions */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-baseline space-x-4">
                    <div className="text-4xl font-light text-foreground">${artwork.price}</div>
                    {artwork.originalPrice && (
                      <div className="text-xl font-light text-muted-foreground line-through">
                        ${artwork.originalPrice}
                      </div>
                    )}
                  </div>
                  <div className="text-sm font-light text-muted-foreground">
                    {artwork.medium} • {artwork.size} • {artwork.year}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="flex-1 font-light tracking-wide"
                    onClick={handleAddToCart}
                    disabled={artwork.status !== "available" || isInCart}
                  >
                    {isInCart ? (
                      "Added to Cart"
                    ) : artwork.status !== "available" ? (
                      "Not Available"
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="font-light tracking-wide bg-transparent"
                    onClick={toggleWishlist}
                  >
                    <Heart className={`w-5 h-5 mr-2 ${isInWishlist ? "fill-current text-red-500" : ""}`} />
                    {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
                  </Button>
                  <Button variant="outline" size="lg" className="font-light tracking-wide bg-transparent">
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center space-y-2">
                  <Shield className="w-6 h-6 text-primary mx-auto" />
                  <div className="text-sm font-light text-muted-foreground">Authenticity Certificate</div>
                </div>
                <div className="text-center space-y-2">
                  <Truck className="w-6 h-6 text-primary mx-auto" />
                  <div className="text-sm font-light text-muted-foreground">Free Shipping</div>
                </div>
                <div className="text-center space-y-2">
                  <RotateCcw className="w-6 h-6 text-primary mx-auto" />
                  <div className="text-sm font-light text-muted-foreground">30-Day Returns</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-16">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details" className="font-light">
                  Details
                </TabsTrigger>
                <TabsTrigger value="shipping" className="font-light">
                  Shipping
                </TabsTrigger>
                <TabsTrigger value="care" className="font-light">
                  Care
                </TabsTrigger>
                <TabsTrigger value="reviews" className="font-light">
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-8 mt-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-light text-foreground mb-4">Artwork Details</h3>
                      <div className="space-y-3 font-light text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Medium:</span>
                          <span className="text-foreground">{artwork.medium}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Dimensions:</span>
                          <span className="text-foreground">{artwork.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Year Created:</span>
                          <span className="text-foreground">{artwork.year}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Weight:</span>
                          <span className="text-foreground">{artwork.weight}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Signed:</span>
                          <span className="text-foreground">{artwork.signed ? "Yes" : "No"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Certificate:</span>
                          <span className="text-foreground">{artwork.certificate ? "Included" : "Not included"}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-light text-foreground mb-4">Materials Used</h3>
                      <ul className="space-y-2 font-light text-muted-foreground">
                        {artwork.materials.map((material, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                            <span>{material}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-light text-foreground mb-4">About This Piece</h3>
                      <p className="font-light text-muted-foreground text-pretty">{artwork.longDescription}</p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-light text-foreground mb-4">Techniques</h3>
                      <ul className="space-y-2 font-light text-muted-foreground">
                        {artwork.techniques.map((technique, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                            <span>{technique}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="shipping" className="space-y-6 mt-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-light text-foreground">Shipping Information</h3>
                    <div className="space-y-3 font-light text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Domestic Shipping:</span>
                        <span className="text-foreground">{artwork.shipping.domestic}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>International:</span>
                        <span className="text-foreground">{artwork.shipping.international}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Processing Time:</span>
                        <span className="text-foreground">{artwork.shipping.timeframe}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Packaging:</span>
                        <span className="text-foreground">{artwork.shipping.packaging}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-light text-foreground">Delivery Options</h3>
                    <div className="space-y-3">
                      <div className="p-4 border border-border rounded-lg">
                        <div className="font-light text-foreground">Standard Shipping</div>
                        <div className="text-sm font-light text-muted-foreground">5-7 business days • Free</div>
                      </div>
                      <div className="p-4 border border-border rounded-lg">
                        <div className="font-light text-foreground">Express Shipping</div>
                        <div className="text-sm font-light text-muted-foreground">2-3 business days • $25</div>
                      </div>
                      <div className="p-4 border border-border rounded-lg">
                        <div className="font-light text-foreground">White Glove Delivery</div>
                        <div className="text-sm font-light text-muted-foreground">Professional installation • $150</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="care" className="space-y-6 mt-8">
                <div className="max-w-2xl">
                  <h3 className="text-2xl font-light text-foreground mb-6">Artwork Care Instructions</h3>
                  <div className="space-y-4">
                    {artwork.care.map((instruction, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        </div>
                        <p className="font-light text-muted-foreground">{instruction}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6 mt-8">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-light text-foreground">Customer Reviews</h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(artwork.rating) ? "fill-current text-yellow-500" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-light text-muted-foreground">
                        {artwork.rating} out of 5 ({artwork.reviews.length} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {artwork.reviews.map((review) => (
                      <Card key={review.id} className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="font-light text-foreground">{review.name}</div>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  Verified Purchase
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-current text-yellow-500" />
                                ))}
                              </div>
                              <span className="text-sm font-light text-muted-foreground">{review.date}</span>
                            </div>
                          </div>
                          <p className="font-light text-muted-foreground text-pretty">"{review.comment}"</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Artworks */}
          <section className="mt-20">
            <h2 className="text-3xl font-extralight text-foreground mb-8">You Might Also Like</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArtworks.map((related) => (
                <Card
                  key={related.id}
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={related.image || "/placeholder.svg"}
                      alt={related.title}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-light text-foreground">{related.title}</h3>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-light text-foreground">${related.price}</div>
                      <Link href={`/shop/${related.id}`}>
                        <Button size="sm" variant="outline" className="font-light bg-transparent">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
