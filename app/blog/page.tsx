import { Search, Calendar, User, ArrowRight, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "Finding Inspiration in Everyday Moments",
    excerpt:
      "How I discovered that the most profound artistic inspiration often comes from the simplest, most overlooked moments in our daily lives.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    author: "mbugiipaints",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Inspiration",
    tags: ["creativity", "daily life", "inspiration"],
    image: "/abstract-sunset-painting-with-warm-colors.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Color Theory in Abstract Painting",
    excerpt:
      "Understanding how colors interact and influence emotion in abstract compositions. A deep dive into my color selection process.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    author: "mbugiipaints",
    date: "2024-01-10",
    readTime: "8 min read",
    category: "Technique",
    tags: ["color theory", "abstract", "technique"],
    image: "/abstract-colorful-emotional-painting.jpg",
    featured: false,
  },
  {
    id: 3,
    title: "Setting Up Your First Art Studio",
    excerpt:
      "Essential tips for creating an inspiring and functional art space, whether you have a dedicated room or just a corner.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    author: "mbugiipaints",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "Studio Life",
    tags: ["studio", "setup", "beginner"],
    image: "/artist-studio-with-paintings-and-art-supplies.jpg",
    featured: false,
  },
  {
    id: 4,
    title: "The Journey of a Painting: From Concept to Canvas",
    excerpt:
      "Follow along as I document the complete creative process behind my latest landscape series, from initial sketches to final touches.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    author: "mbugiipaints",
    date: "2023-12-28",
    readTime: "10 min read",
    category: "Process",
    tags: ["process", "landscape", "behind the scenes"],
    image: "/nature-landscape-watercolor-painting.jpg",
    featured: false,
  },
]

const categories = ["All", "Inspiration", "Technique", "Studio Life", "Process"]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border/40">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-foreground mb-6">Art & Inspiration</h1>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Thoughts on creativity, technique, and the artistic journey. Join me as I share insights from the studio
              and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="border-b border-border/40">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search articles..." className="pl-10 bg-background border-border/60" />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === "All" ? "default" : "outline"}
                    size="sm"
                    className="font-light"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <Badge variant="secondary" className="mb-4">
                Featured
              </Badge>
            </div>
            {blogPosts
              .filter((post) => post.featured)
              .map((post) => (
                <div key={post.id} className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-4">
                        {post.category}
                      </Badge>
                      <h2 className="text-3xl font-light text-foreground mb-4 leading-tight">{post.title}</h2>
                      <p className="text-muted-foreground font-light leading-relaxed mb-6">{post.excerpt}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Link href={`/blog/${post.id}`}>
                      <Button className="group">
                        Read Full Article
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-light text-foreground mb-12 text-center">Recent Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts
                .filter((post) => !post.featured)
                .map((post) => (
                  <article key={post.id} className="group">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-6">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <span>{post.readTime}</span>
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-3">
                          {post.category}
                        </Badge>
                        <h3 className="text-xl font-light text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground font-light leading-relaxed text-sm">{post.excerpt}</p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Link
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        Read more
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-light text-foreground mb-4">Stay Inspired</h2>
            <p className="text-muted-foreground font-light mb-8 leading-relaxed">
              Get weekly insights, studio updates, and exclusive content delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder="Enter your email" className="flex-1 bg-background border-border/60" />
              <Button>Subscribe</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">No spam, unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
