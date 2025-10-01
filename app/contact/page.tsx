"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    projectType: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store inquiry in localStorage for demo
    const inquiries = JSON.parse(localStorage.getItem("inquiries") || "[]")
    const newInquiry = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString(),
      status: "new",
    }
    inquiries.push(newInquiry)
    localStorage.setItem("inquiries", JSON.stringify(inquiries))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        projectType: "",
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border/40">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-foreground mb-6">Let's Create Together</h1>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Ready to commission a custom piece or have questions about my work? I'd love to hear from you and bring
              your artistic vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="p-8 border border-border/40 bg-card">
                <h2 className="text-2xl font-light text-foreground mb-6">Send Me a Message</h2>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-light text-foreground mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground font-light">
                      Thank you for reaching out. I'll get back to you within 24-48 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-light">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="bg-background border-border/60"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-light">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-background border-border/60"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectType" className="font-light">
                        Project Type
                      </Label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-background border border-border/60 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 font-light"
                      >
                        <option value="">Select a project type</option>
                        <option value="commission">Custom Commission</option>
                        <option value="purchase">Purchase Existing Artwork</option>
                        <option value="class">Art Class Inquiry</option>
                        <option value="collaboration">Collaboration</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="font-light">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="bg-background border-border/60"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="font-light">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="bg-background border-border/60"
                        placeholder="Tell me about your project, preferred size, colors, timeline, or any other details..."
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <Card className="p-6 border border-border/40 bg-card">
                  <h3 className="text-xl font-light text-foreground mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-light text-foreground">Email</p>
                        <p className="text-muted-foreground font-light">hello@mbugiipaints.com</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-light text-foreground">Phone</p>
                        <p className="text-muted-foreground font-light">+1 (555) 123-4567</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-light text-foreground">Studio Location</p>
                        <p className="text-muted-foreground font-light">Available for local consultations</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-light text-foreground">Response Time</p>
                        <p className="text-muted-foreground font-light">Within 24-48 hours</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border border-border/40 bg-card">
                  <h3 className="text-xl font-light text-foreground mb-6">Commission Process</h3>
                  <div className="space-y-4">
                    {[
                      "Initial consultation to discuss your vision, size, and timeline",
                      "Detailed proposal with pricing and project timeline",
                      "50% deposit to begin work, with progress updates",
                      "Final payment and artwork delivery or pickup",
                    ].map((step, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-light mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-muted-foreground font-light leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 border border-border/40 bg-muted/20">
                  <h3 className="text-xl font-light text-foreground mb-4">Pricing Guide</h3>
                  <div className="space-y-3">
                    {[
                      { size: 'Small (16x20")', price: "Starting at $600" },
                      { size: 'Medium (18x24")', price: "Starting at $800" },
                      { size: 'Large (24x36")', price: "Starting at $1,200" },
                      { size: 'Extra Large (30x40"+)', price: "Starting at $1,500" },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-light text-foreground">{item.size}</span>
                        <Badge variant="secondary">{item.price}</Badge>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 font-light">
                    *Prices vary based on complexity, medium, and timeline. Custom quotes provided for each project.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-muted/20 border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-light text-foreground mb-4">Stay Connected</h2>
            <p className="text-muted-foreground font-light mb-8 leading-relaxed">
              Get updates on new artworks, upcoming classes, and exclusive behind-the-scenes content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder="Enter your email" className="flex-1 bg-background border-border/60" />
              <Button>Subscribe</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4 font-light">No spam, unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
