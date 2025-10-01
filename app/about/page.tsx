import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Palette, Award, Users, Heart } from "lucide-react"

export default function AboutPage() {
  const achievements = [
    { icon: Award, title: "10+ Years Experience", description: "Decade of professional painting" },
    { icon: Palette, title: "Multiple Mediums", description: "Oil, Acrylic, Watercolor expertise" },
    { icon: Users, title: "50+ Commissions", description: "Custom pieces for collectors" },
    { icon: Heart, title: "Passionate Artist", description: "Dedicated to artistic excellence" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-amber-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full"></div>
              <Link href="/" className="text-xl font-bold text-gray-900">
                mbugiipaints
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-amber-600 transition-colors">
                Home
              </Link>
              <Link href="/gallery" className="text-gray-700 hover:text-amber-600 transition-colors">
                Gallery
              </Link>
              <Link href="/about" className="text-amber-600 font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-amber-600 transition-colors">
                Contact
              </Link>
              <Link href="/admin" className="text-gray-700 hover:text-amber-600 transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
                  Meet the Artist
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight text-balance">
                  The Story Behind
                  <span className="text-transparent bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text">
                    {" "}
                    mbugiipaints
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed text-pretty">
                  Every brushstroke tells a story, every color carries emotion. I'm a passionate artist dedicated to
                  creating paintings that connect with people on a deep, meaningful level.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
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

      {/* Achievements */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Artistic Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
              A decade of dedication to the craft, constantly evolving and pushing creative boundaries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center">
                    <achievement.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{achievement.title}</h3>
                <p className="text-gray-600 text-sm">{achievement.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-3xl transform -rotate-3"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                <Image
                  src="/artist-studio-with-paintings-and-art-supplies.jpg"
                  alt="Artist studio"
                  width={500}
                  height={400}
                  className="rounded-2xl w-full h-auto"
                />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">My Artistic Philosophy</h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p className="text-pretty">
                  Art has always been my language of choice when words fall short. Growing up, I found solace in colors
                  and discovered that each hue could express emotions I couldn't articulate otherwise.
                </p>
                <p className="text-pretty">
                  My work explores the intersection of emotion and nature, using vibrant palettes to capture moments of
                  beauty, tranquility, and human connection. Whether it's the golden glow of a sunset or the dynamic
                  energy of urban life, I strive to create pieces that resonate with viewers.
                </p>
                <p className="text-pretty">
                  Every painting is a journey of discovery. I let the colors guide me, allowing spontaneity and
                  intuition to shape the final piece. This approach creates authentic, emotionally rich artworks that
                  tell their own unique stories.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold text-gray-900">My Creative Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
              From initial inspiration to final brushstroke, each piece follows a thoughtful creative journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center border-0 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Inspiration</h3>
              <p className="text-gray-600 text-pretty">
                Finding inspiration in everyday moments, nature, emotions, and human experiences that spark creative
                vision.
              </p>
            </Card>

            <Card className="p-6 text-center border-0 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Exploration</h3>
              <p className="text-gray-600 text-pretty">
                Experimenting with color palettes, compositions, and techniques to find the perfect expression for each
                concept.
              </p>
            </Card>

            <Card className="p-6 text-center border-0 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Creation</h3>
              <p className="text-gray-600 text-pretty">
                Bringing the vision to life through careful brushwork, layering colors, and allowing intuition to guide
                the process.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold text-white">Let's Create Something Beautiful Together</h2>
          <p className="text-xl text-amber-100 text-pretty">
            Whether you're looking for a custom commission or want to add an existing piece to your collection, I'd love
            to help you find the perfect artwork.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-amber-700 hover:bg-amber-50">
              <Link href="/contact">Commission a Piece</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              <Link href="/gallery">Browse Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full"></div>
                <span className="text-xl font-bold">mbugiipaints</span>
              </div>
              <p className="text-gray-400 text-pretty">
                Creating vibrant artworks that bring color and emotion to life through passionate painting.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/gallery" className="block text-gray-400 hover:text-white transition-colors">
                  Gallery
                </Link>
                <Link href="/about" className="block text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
                <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
                <Link href="/admin" className="block text-gray-400 hover:text-white transition-colors">
                  Admin
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Connect</h3>
              <p className="text-gray-400">Follow my artistic journey and stay updated with new creations.</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 mbugiipaints. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
