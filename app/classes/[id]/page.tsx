"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useClass } from "@/hooks/use-classes"
import { useBookings } from "@/hooks/use-bookings"
import { useAuth } from "@/hooks/use-auth"
import Image from "next/image"
import Link from "next/link"
import { Clock, Users, Calendar, MapPin, Star, Palette, ArrowLeft, Check } from "lucide-react"

export default function ClassDetailPage({ params }: { params: { id: string } }) {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [isEnrolling, setIsEnrolling] = useState(false)

  const { classData, isLoading, error } = useClass(params.id)
  const { createBooking } = useBookings()
  const { user } = useAuth()

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

  const handleEnrollment = async () => {
    if (!user) {
      alert("Please log in to enroll in classes")
      return
    }

    setIsEnrolling(true)
    const success = await createBooking(params.id)
    setIsEnrolling(false)

    if (success) {
      alert("Enrollment successful! You'll receive a confirmation email shortly.")
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 px-4 text-center">
          <p className="text-destructive">Error loading class: {error}</p>
        </div>
      </div>
    )
  }

  if (isLoading || !classData) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 px-4 text-center">
          <p className="text-xl font-light text-muted-foreground">Loading class details...</p>
        </div>
      </div>
    )
  }

  const currentStudents = classData._count?.bookings || 0
  const spotsRemaining = classData.maxStudents - currentStudents
  const isClassFull = spotsRemaining <= 0

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/classes"
              className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors font-light"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Classes</span>
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-4">
                    <Badge className={getLevelColor(classData.level)}>{getLevelLabel(classData.level)}</Badge>
                    <h1 className="text-4xl lg:text-5xl font-extralight text-foreground text-balance">
                      {classData.title}
                    </h1>
                    <p className="text-xl font-light text-muted-foreground text-pretty">{classData.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm font-light text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 fill-current text-yellow-500" />
                    <span>4.9 (24 reviews)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>
                      {currentStudents}/{classData.maxStudents} enrolled
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{classData.duration}</span>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src={classData.images[0] || "/placeholder.svg?height=400&width=800&query=art class painting"}
                  alt={classData.title}
                  width={800}
                  height={400}
                  className="w-full h-96 object-cover"
                />
              </div>

              {/* Tabs */}
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview" className="font-light">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="curriculum" className="font-light">
                    Curriculum
                  </TabsTrigger>
                  <TabsTrigger value="requirements" className="font-light">
                    Requirements
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="font-light">
                    Reviews
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 mt-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-light text-foreground">What You'll Learn</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {classData.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="font-light text-muted-foreground">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-light text-foreground">What's Included</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {classData.included.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="font-light text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="curriculum" className="space-y-6 mt-8">
                  <h3 className="text-2xl font-light text-foreground">Course Curriculum</h3>
                  <div className="space-y-6">
                    {classData.curriculum.map((week: any, index: number) => (
                      <Card key={index} className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <Badge variant="outline">Week {week.week}</Badge>
                            <h4 className="text-lg font-light text-foreground">{week.title}</h4>
                          </div>
                          <div className="grid md:grid-cols-2 gap-2">
                            {week.topics.map((topic: string, topicIndex: number) => (
                              <div key={topicIndex} className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                                <span className="font-light text-muted-foreground text-sm">{topic}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="requirements" className="space-y-6 mt-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-light text-foreground">Requirements</h3>
                      <div className="space-y-3">
                        {classData.requirements.map((req, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="font-light text-muted-foreground">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-light text-foreground">Class Details</h3>
                      <div className="space-y-3 font-light text-muted-foreground">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 flex-shrink-0" />
                          <span>{classData.schedule}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 flex-shrink-0" />
                          <span>{classData.location}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="w-5 h-5 flex-shrink-0" />
                          <span>
                            {classData.sessions} sessions over {classData.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-6 mt-8">
                  <h3 className="text-2xl font-light text-foreground">Student Reviews</h3>
                  <div className="space-y-6">
                    {/* Mock reviews - in real app, fetch from database */}
                    {[
                      {
                        name: "Sarah Johnson",
                        rating: 5,
                        comment:
                          "Amazing class! I went from never touching watercolors to creating beautiful landscapes. The instruction was clear and encouraging.",
                      },
                      {
                        name: "Michael Chen",
                        rating: 5,
                        comment:
                          "Perfect for beginners. The small class size meant lots of personal attention. Highly recommend!",
                      },
                    ].map((testimonial, index) => (
                      <Card key={index} className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-light text-foreground">{testimonial.name}</h4>
                            <div className="flex items-center space-x-1">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-current text-yellow-500" />
                              ))}
                            </div>
                          </div>
                          <p className="font-light text-muted-foreground text-pretty">"{testimonial.comment}"</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Enrollment Card */}
              <Card className="p-6 sticky top-24">
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-light text-foreground">${classData.price}</div>
                    <div className="text-sm font-light text-muted-foreground">{spotsRemaining} spots remaining</div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-light">
                        <span className="text-muted-foreground">Start Date:</span>
                        <span className="text-foreground">{new Date(classData.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm font-light">
                        <span className="text-muted-foreground">End Date:</span>
                        <span className="text-foreground">{new Date(classData.endDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm font-light">
                        <span className="text-muted-foreground">Schedule:</span>
                        <span className="text-foreground text-right">{classData.schedule}</span>
                      </div>
                      <div className="flex justify-between text-sm font-light">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="text-foreground">{classData.location}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full font-light tracking-wide"
                    size="lg"
                    onClick={handleEnrollment}
                    disabled={isEnrolling || isClassFull || !user}
                  >
                    {isEnrolling
                      ? "Enrolling..."
                      : isClassFull
                        ? "Class Full"
                        : !user
                          ? "Login to Enroll"
                          : "Enroll Now"}
                  </Button>

                  <div className="text-center">
                    <Button variant="outline" className="font-light tracking-wide bg-transparent" asChild>
                      <Link href="/contact">Ask Questions</Link>
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Instructor Card */}
              <Card className="p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-light text-foreground">Your Instructor</h3>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <Palette className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-light text-foreground">mbugiipaints</div>
                      <div className="text-sm font-light text-muted-foreground">Professional Artist</div>
                    </div>
                  </div>
                  <p className="text-sm font-light text-muted-foreground text-pretty">
                    With over 10 years of experience in painting and art education, I'm passionate about helping
                    students discover their creative potential.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full font-light tracking-wide bg-transparent"
                    asChild
                  >
                    <Link href="/about">View Profile</Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
