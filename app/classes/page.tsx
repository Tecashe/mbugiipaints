"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useClasses } from "@/hooks/use-classes"
import Image from "next/image"
import Link from "next/link"
import { Clock, Users, Calendar, MapPin, Star, BookOpen, Palette, Award, Filter, Search } from "lucide-react"

export default function ClassesPage() {
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const { classes, isLoading, error } = useClasses({
    level: selectedLevel === "all" ? undefined : selectedLevel,
    search: searchTerm || undefined,
    status: "ACTIVE",
    upcoming: true,
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case "BEGINNER":
        return "bg-green-100 text-green-800 border-green-200"
      case "INTERMEDIATE":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "ADVANCED":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getLevelLabel = (level: string) => {
    return level.charAt(0) + level.slice(1).toLowerCase()
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 px-4 text-center">
          <p className="text-destructive">Error loading classes: {error}</p>
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
              Art Education
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-extralight text-foreground leading-tight text-balance">
              Learn to Paint with
              <span className="block font-light text-primary">Professional Guidance</span>
            </h1>
            <p className="text-xl font-light text-muted-foreground max-w-3xl mx-auto text-pretty">
              Join our comprehensive art classes and discover your creative potential. From beginner fundamentals to
              advanced techniques, I'll guide you through every step of your artistic journey.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-light tracking-wide">
              Browse Classes
            </Button>
            <Button variant="outline" size="lg" className="font-light tracking-wide bg-transparent">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search classes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background font-light focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Tabs value={selectedLevel} onValueChange={setSelectedLevel} className="w-auto">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all" className="font-light">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="beginner" className="font-light">
                    Beginner
                  </TabsTrigger>
                  <TabsTrigger value="intermediate" className="font-light">
                    Intermediate
                  </TabsTrigger>
                  <TabsTrigger value="advanced" className="font-light">
                    Advanced
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm font-light text-muted-foreground">
            {isLoading ? "Loading..." : `Showing ${classes.length} classes`}
          </div>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-xl font-light text-muted-foreground">Loading classes...</p>
            </div>
          ) : classes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl font-light text-muted-foreground">No classes found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {classes.map((cls, index) => (
                <Card
                  key={cls.id}
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={cls.images[0] || "/placeholder.svg?height=250&width=400&query=art class painting"}
                      alt={cls.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={getLevelColor(cls.level)}>{getLevelLabel(cls.level)}</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-gray-800">${cls.price}</Badge>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-light text-foreground group-hover:text-primary transition-colors">
                        {cls.title}
                      </h3>
                      <p className="text-sm font-light text-muted-foreground line-clamp-2">{cls.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs font-light text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3 h-3" />
                        <span>{cls.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-3 h-3" />
                        <span>
                          {cls._count?.bookings || 0}/{cls.maxStudents}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-3 h-3" />
                        <span>{cls.sessions} sessions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-3 h-3 fill-current text-yellow-500" />
                        <span>4.8 (12)</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-xs font-light text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{cls.location}</span>
                      </div>
                      <div className="text-xs font-light text-muted-foreground">
                        Starts: {new Date(cls.startDate).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="pt-4 space-y-2">
                      <Button className="w-full font-light tracking-wide" asChild>
                        <Link href={`/classes/${cls.id}`}>View Details & Enroll</Link>
                      </Button>
                      <div className="text-center">
                        <span className="text-xs font-light text-muted-foreground">
                          {cls.maxStudents - (cls._count?.bookings || 0)} spots remaining
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Our Classes */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl lg:text-5xl font-extralight text-foreground text-balance">
              Why Choose Our Art Classes?
            </h2>
            <p className="text-xl font-light text-muted-foreground max-w-3xl mx-auto text-pretty">
              Experience personalized instruction, professional techniques, and a supportive creative community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Small Class Sizes",
                description: "Maximum 12 students per class ensures personalized attention and guidance.",
              },
              {
                icon: Award,
                title: "Professional Instruction",
                description: "Learn from an experienced artist with 10+ years of teaching and creating.",
              },
              {
                icon: Palette,
                title: "All Materials Included",
                description: "Focus on learning without worrying about supplies - everything is provided.",
              },
              {
                icon: BookOpen,
                title: "Structured Curriculum",
                description: "Progressive learning path designed to build skills systematically.",
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-light text-foreground">{feature.title}</h3>
                    <p className="text-sm font-light text-muted-foreground text-pretty">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-extralight text-foreground text-balance">
              Ready to Start Your Artistic Journey?
            </h2>
            <p className="text-xl font-light text-muted-foreground text-pretty">
              Join hundreds of students who have discovered their creative potential through our comprehensive art
              classes.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-light tracking-wide">
              Schedule Free Consultation
            </Button>
            <Button variant="outline" size="lg" className="font-light tracking-wide bg-transparent" asChild>
              <Link href="/contact">Ask Questions</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
