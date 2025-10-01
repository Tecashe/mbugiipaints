import { notFound } from "next/navigation"
import { Calendar, User, ArrowLeft, Share2, Heart, MessageCircle, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

// Mock blog data (same as blog page)
const blogPosts = [
  {
    id: 1,
    title: "Finding Inspiration in Everyday Moments",
    excerpt:
      "How I discovered that the most profound artistic inspiration often comes from the simplest, most overlooked moments in our daily lives.",
    content: `
      <p>As artists, we often feel pressure to find inspiration in grand gestures, exotic locations, or profound experiences. But over the years, I've discovered that some of my most meaningful work has emerged from the quiet, ordinary moments that fill our days.</p>
      
      <p>Take, for example, the way morning light filters through my kitchen window, casting geometric shadows across the breakfast table. Or the weathered hands of my neighbor as she tends to her garden, each line telling a story of decades spent nurturing life from soil.</p>
      
      <h2>The Art of Seeing</h2>
      
      <p>Learning to see artistically isn't about finding the extraordinary—it's about recognizing the extraordinary within the ordinary. It's about training your eye to notice the subtle interplay of colors in a puddle reflecting the sky, or the graceful curve of a cat stretching in a patch of sunlight.</p>
      
      <p>I keep a small sketchbook with me always, not for creating finished pieces, but for capturing these fleeting moments of beauty. A quick gesture drawing of someone waiting for the bus, a color study of the sunset reflected in office windows, notes about the quality of light at different times of day.</p>
      
      <h2>Translating Moments into Art</h2>
      
      <p>The challenge isn't just in seeing these moments, but in translating them into something that resonates with others. How do you capture the feeling of that perfect morning light? How do you convey the story told by weathered hands?</p>
      
      <p>For me, it often starts with emotion rather than literal representation. What did that moment make me feel? What was the essence of that experience? Then I work backwards, using color, composition, and texture to evoke that same emotional response in the viewer.</p>
      
      <p>Remember, the goal isn't to document reality—it's to share the poetry you found within it.</p>
    `,
    author: "mbugiipaints",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Inspiration",
    tags: ["creativity", "daily life", "inspiration"],
    image: "/abstract-sunset-painting-with-warm-colors.jpg",
    featured: true,
  },
  // Add other posts here...
]

interface BlogPostPageProps {
  params: {
    id: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.id === Number.parseInt(params.id))

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-8 border-b border-border/40">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-12">
              <Badge variant="outline" className="mb-4">
                {post.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-light text-foreground mb-6 leading-tight">{post.title}</h1>
              <p className="text-xl text-muted-foreground font-light leading-relaxed mb-8">{post.excerpt}</p>

              <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
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

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    Like
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </header>

            {/* Featured Image */}
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-12">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div
                className="text-foreground font-light leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Article Footer */}
            <footer className="mt-16 pt-8 border-t border-border/40">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    24 Likes
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />8 Comments
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Article
                </Button>
              </div>
            </footer>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-16 bg-muted/20 border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-light text-foreground mb-12 text-center">Related Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts
                .filter((p) => p.id !== post.id)
                .slice(0, 3)
                .map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`} className="group">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                      <Image
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <Badge variant="outline" className="mb-2">
                      {relatedPost.category}
                    </Badge>
                    <h3 className="text-lg font-light text-foreground group-hover:text-primary transition-colors leading-tight">
                      {relatedPost.title}
                    </h3>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
