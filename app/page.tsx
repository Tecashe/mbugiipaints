import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Palette, Award, Users, Calendar } from "lucide-react"

export default function HomePage() {
  const featuredArtworks = [
    {
      id: 1,
      title: "Sunset Dreams",
      medium: "Oil on Canvas",
      size: "24x36 inches",
      year: "2024",
      price: "$1,200",
      status: "Available",
      image: "/abstract-sunset-painting-with-warm-colors.jpg",
    },
    {
      id: 2,
      title: "Urban Reflections",
      medium: "Acrylic on Canvas",
      size: "18x24 inches",
      year: "2024",
      price: "$850",
      status: "Sold",
      image: "/urban-cityscape-reflection.png",
    },
    {
      id: 3,
      title: "Nature's Symphony",
      medium: "Watercolor",
      size: "16x20 inches",
      year: "2023",
      price: "$650",
      status: "Available",
      image: "/nature-landscape-watercolor-painting.jpg",
    },
  ]

  const stats = [
    { icon: Palette, label: "Artworks Created", value: "150+" },
    { icon: Award, label: "Awards Won", value: "12" },
    { icon: Users, label: "Happy Collectors", value: "200+" },
    { icon: Calendar, label: "Years Experience", value: "10+" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <Badge variant="secondary" className="font-light tracking-wide">
                  Professional Artist & Educator
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-extralight text-foreground leading-tight text-balance">
                  Creating Art That
                  <span className="block font-light text-primary">Speaks to the Soul</span>
                </h1>
                <p className="text-xl font-light text-muted-foreground leading-relaxed text-pretty max-w-lg">
                  Welcome to my world of vibrant paintings and artistic expression. I'm mbugiipaints, transforming
                  emotions into visual stories through color, texture, and form.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="font-light tracking-wide group">
                  <Link href="/gallery" className="flex items-center">
                    Explore Gallery
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="font-light tracking-wide bg-transparent">
                  <Link href="/classes">Join Art Classes</Link>
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl transform rotate-2"></div>
              <div className="relative bg-card rounded-3xl p-8 shadow-2xl border">
                <Image
                  src="/artist-painting-at-easel-with-colorful-palette.jpg"
                  alt="mbugiipaints creating art"
                  width={500}
                  height={600}
                  className="rounded-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl font-light text-foreground">{stat.value}</div>
                    <div className="text-sm font-light text-muted-foreground tracking-wide">{stat.label}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl lg:text-5xl font-extralight text-foreground text-balance">Featured Artworks</h2>
            <p className="text-xl font-light text-muted-foreground max-w-2xl mx-auto text-pretty">
              Each piece tells a unique story, capturing moments of beauty and emotion through carefully chosen colors
              and compositions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArtworks.map((artwork, index) => (
              <Card
                key={artwork.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={artwork.image || "/placeholder.svg"}
                    alt={artwork.title}
                    width={400}
                    height={500}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Badge
                    className={`absolute top-4 right-4 ${
                      artwork.status === "Available" ? "bg-green-500/90 text-white" : "bg-red-500/90 text-white"
                    }`}
                  >
                    {artwork.status}
                  </Badge>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-light text-foreground">{artwork.title}</h3>
                    <div className="space-y-1 text-sm font-light text-muted-foreground">
                      <p>
                        {artwork.medium} • {artwork.size}
                      </p>
                      <p>
                        {artwork.year} • {artwork.price}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full font-light tracking-wide bg-transparent">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="font-light tracking-wide bg-transparent">
              <Link href="/gallery">View Complete Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Art Classes Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge variant="secondary" className="font-light tracking-wide">
                  Art Education
                </Badge>
                <h2 className="text-4xl lg:text-5xl font-extralight text-foreground text-balance">
                  Learn the Art of Painting
                </h2>
                <p className="text-xl font-light text-muted-foreground leading-relaxed text-pretty">
                  Join my comprehensive art classes and discover your creative potential. From beginner fundamentals to
                  advanced techniques, I'll guide you through your artistic journey.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-light text-muted-foreground">Small class sizes for personalized attention</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-light text-muted-foreground">All skill levels welcome</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-light text-muted-foreground">Materials and supplies included</span>
                </div>
              </div>
              <Button size="lg" className="font-light tracking-wide">
                <Link href="/classes">Explore Classes</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl transform -rotate-2"></div>
              <div className="relative bg-card rounded-3xl p-8 shadow-2xl border">
                <Image
                  src="/artist-studio-with-paintings-and-art-supplies.jpg"
                  alt="Art class in session"
                  width={500}
                  height={400}
                  className="rounded-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-extralight text-foreground text-balance">Stay Connected</h2>
            <p className="text-xl font-light text-muted-foreground text-pretty">
              Join my newsletter to receive updates on new artworks, upcoming classes, and exclusive behind-the-scenes
              content from my studio.
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

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">

                <div className="flex items-center gap-2">
                  <Image src="/painterlogo.png" alt="Mbugiipaints" width={64} height={64} className="h-12 w-12 sm:h-16 sm:w-16" />
                  <span className="text-lg sm:text-xl font-bold">Mbugiipaints</span>
                </div>
                {/* <span className="text-xl font-light tracking-wide">mbugiipaints</span> */}
              </div>
              <p className="font-light text-muted-foreground text-pretty">
                Creating vibrant artworks and sharing the joy of painting through education and inspiration.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-light text-foreground tracking-wide">Gallery</h3>
              <div className="space-y-2">
                <Link
                  href="/gallery"
                  className="block font-light text-muted-foreground hover:text-foreground transition-colors"
                >
                  All Artworks
                </Link>
                <Link
                  href="/gallery?category=paintings"
                  className="block font-light text-muted-foreground hover:text-foreground transition-colors"
                >
                  Paintings
                </Link>
                <Link
                  href="/gallery?category=watercolor"
                  className="block font-light text-muted-foreground hover:text-foreground transition-colors"
                >
                  Watercolors
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-light text-foreground tracking-wide">Classes</h3>
              <div className="space-y-2">
                <Link
                  href="/classes"
                  className="block font-light text-muted-foreground hover:text-foreground transition-colors"
                >
                  All Classes
                </Link>
                <Link
                  href="/classes?level=beginner"
                  className="block font-light text-muted-foreground hover:text-foreground transition-colors"
                >
                  Beginner
                </Link>
                <Link
                  href="/classes?level=advanced"
                  className="block font-light text-muted-foreground hover:text-foreground transition-colors"
                >
                  Advanced
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-light text-foreground tracking-wide">Connect</h3>
              <div className="space-y-2">
                <Link
                  href="/about"
                  className="block font-light text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block font-light text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
                <Link
                  href="/shop"
                  className="block font-light text-muted-foreground hover:text-foreground transition-colors"
                >
                  Shop
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center">
            <p className="font-light text-muted-foreground">&copy; 2025 mbugiipaints. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
