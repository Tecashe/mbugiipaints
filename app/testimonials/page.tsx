import { Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Mock testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Art Collector",
    location: "San Francisco, CA",
    rating: 5,
    text: "mbugiipaints' work has completely transformed my living space. The abstract piece I purchased captures light in the most extraordinary way - it literally changes throughout the day. The quality is exceptional and the personal touch in packaging made it feel like receiving a gift.",
    image: "/artist-painting-at-easel-with-colorful-palette.jpg",
    artworkPurchased: "Sunset Reflections Series",
    date: "2024-01-10",
    featured: true,
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Interior Designer",
    location: "New York, NY",
    rating: 5,
    text: "I've been recommending mbugiipaints to my clients for over a year now. The attention to color harmony and composition is remarkable. Every piece feels intentional and adds such depth to any space.",
    image: "/abstract-colorful-emotional-painting.jpg",
    artworkPurchased: "Urban Dreams Collection",
    date: "2024-01-05",
    featured: false,
  },
  {
    id: 3,
    name: "Emma Thompson",
    role: "Art Class Student",
    location: "Portland, OR",
    rating: 5,
    text: "Taking the 'Color Theory Fundamentals' class was a game-changer for my artistic journey. The instructor's approach is both technical and intuitive, making complex concepts accessible. I've grown so much as an artist.",
    image: "/nature-landscape-watercolor-painting.jpg",
    artworkPurchased: null,
    classAttended: "Color Theory Fundamentals",
    date: "2023-12-28",
    featured: false,
  },
  {
    id: 4,
    name: "David Park",
    role: "Corporate Client",
    location: "Seattle, WA",
    rating: 5,
    text: "We commissioned a large-scale piece for our office lobby, and the result exceeded all expectations. The collaborative process was smooth, and the final artwork perfectly captures our company's innovative spirit.",
    image: "/urban-cityscape-reflection.png",
    artworkPurchased: "Custom Commission",
    date: "2023-12-15",
    featured: false,
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "Private Collector",
    location: "Los Angeles, CA",
    rating: 5,
    text: "I've been collecting contemporary art for 15 years, and mbugiipaints' work stands out for its emotional depth and technical mastery. Each piece tells a story and continues to reveal new details over time.",
    image: "/abstract-sunset-painting-with-warm-colors.jpg",
    artworkPurchased: "Emotional Landscapes Series",
    date: "2023-12-01",
    featured: true,
  },
  {
    id: 6,
    name: "James Mitchell",
    role: "Art Class Student",
    location: "Denver, CO",
    rating: 5,
    text: "The 'Abstract Composition Workshop' opened my eyes to new possibilities in my art. The personalized feedback and supportive environment made all the difference. Highly recommend to any serious artist.",
    image: "/artist-studio-with-paintings-and-art-supplies.jpg",
    artworkPurchased: null,
    classAttended: "Abstract Composition Workshop",
    date: "2023-11-20",
    featured: false,
  },
]

const stats = [
  { label: "Happy Clients", value: "200+" },
  { label: "Artworks Sold", value: "150+" },
  { label: "Students Taught", value: "300+" },
  { label: "Years Experience", value: "8+" },
]

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border/40">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-foreground mb-6">Client Stories</h1>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Hear from collectors, students, and art enthusiasts who have experienced the transformative power of
              original artwork and creative education.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-light text-foreground mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-light">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-light text-foreground mb-12 text-center">Featured Reviews</h2>
            <div className="grid lg:grid-cols-2 gap-12">
              {testimonials
                .filter((t) => t.featured)
                .map((testimonial) => (
                  <div key={testimonial.id} className="relative">
                    <div className="absolute -top-4 -left-4 text-6xl text-muted-foreground/20">
                      <Quote className="h-12 w-12" />
                    </div>
                    <div className="bg-card border border-border/40 rounded-lg p-8 relative">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <blockquote className="text-foreground font-light leading-relaxed mb-6 text-lg">
                        "{testimonial.text}"
                      </blockquote>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-foreground">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                        </div>
                        <div className="text-right">
                          {testimonial.artworkPurchased && (
                            <Badge variant="secondary" className="mb-1">
                              {testimonial.artworkPurchased}
                            </Badge>
                          )}
                          {testimonial.classAttended && (
                            <Badge variant="outline" className="mb-1">
                              {testimonial.classAttended}
                            </Badge>
                          )}
                          <div className="text-xs text-muted-foreground">
                            {new Date(testimonial.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-light text-foreground mb-12 text-center">All Reviews</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials
                .filter((t) => !t.featured)
                .map((testimonial) => (
                  <div key={testimonial.id} className="bg-card border border-border/40 rounded-lg p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-foreground font-light leading-relaxed mb-4">
                      "{testimonial.text}"
                    </blockquote>
                    <div className="space-y-2">
                      <div className="font-medium text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                      {testimonial.artworkPurchased && (
                        <Badge variant="secondary" className="text-xs">
                          {testimonial.artworkPurchased}
                        </Badge>
                      )}
                      {testimonial.classAttended && (
                        <Badge variant="outline" className="text-xs">
                          {testimonial.classAttended}
                        </Badge>
                      )}
                      <div className="text-xs text-muted-foreground pt-2">
                        {new Date(testimonial.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-light text-foreground mb-4">Ready to Start Your Art Journey?</h2>
            <p className="text-muted-foreground font-light mb-8 leading-relaxed">
              Join hundreds of satisfied clients and students who have discovered the joy of original art and creative
              expression.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Browse Artwork</Button>
              <Button variant="outline" size="lg">
                View Classes
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
