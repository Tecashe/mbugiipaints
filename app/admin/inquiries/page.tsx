"use client"

export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Calendar, User, MessageSquare, Search, Reply, Archive, Trash2 } from "lucide-react"

interface Inquiry {
  id: number
  name: string
  email: string
  subject: string
  message: string
  projectType: string
  date: string
  status: "new" | "replied" | "archived"
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [replyMessage, setReplyMessage] = useState("")

  useEffect(() => {
    const storedInquiries = JSON.parse(localStorage.getItem("inquiries") || "[]")
    setInquiries(storedInquiries)
  }, [])

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || inquiry.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const updateInquiryStatus = (id: number, status: "new" | "replied" | "archived") => {
    const updatedInquiries = inquiries.map((inquiry) => (inquiry.id === id ? { ...inquiry, status } : inquiry))
    setInquiries(updatedInquiries)
    localStorage.setItem("inquiries", JSON.stringify(updatedInquiries))
  }

  const deleteInquiry = (id: number) => {
    const updatedInquiries = inquiries.filter((inquiry) => inquiry.id !== id)
    setInquiries(updatedInquiries)
    localStorage.setItem("inquiries", JSON.stringify(updatedInquiries))
    if (selectedInquiry?.id === id) {
      setSelectedInquiry(null)
    }
  }

  const handleReply = () => {
    if (selectedInquiry) {
      updateInquiryStatus(selectedInquiry.id, "replied")
      setReplyMessage("")
      alert("Reply sent successfully!")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500"
      case "replied":
        return "bg-green-500"
      case "archived":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-light text-foreground mb-2">Client Inquiries</h1>
              <p className="text-muted-foreground font-light">
                Manage and respond to client messages and project inquiries.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Inquiries List */}
              <div className="lg:col-span-1 space-y-4">
                {/* Search and Filter */}
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search inquiries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-background border-border/60"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border/60 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 font-light"
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                {/* Inquiries List */}
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {filteredInquiries.map((inquiry) => (
                    <Card
                      key={inquiry.id}
                      className={`p-4 cursor-pointer transition-colors border border-border/40 ${
                        selectedInquiry?.id === inquiry.id ? "bg-muted/40" : "bg-card hover:bg-muted/20"
                      }`}
                      onClick={() => setSelectedInquiry(inquiry)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(inquiry.status)}`} />
                          <span className="font-light text-foreground text-sm">{inquiry.name}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {inquiry.projectType}
                        </Badge>
                      </div>
                      <p className="text-sm font-light text-foreground mb-1 truncate">{inquiry.subject}</p>
                      <p className="text-xs text-muted-foreground">{new Date(inquiry.date).toLocaleDateString()}</p>
                    </Card>
                  ))}
                  {filteredInquiries.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground font-light">No inquiries found</div>
                  )}
                </div>
              </div>

              {/* Inquiry Detail */}
              <div className="lg:col-span-2">
                {selectedInquiry ? (
                  <Card className="p-6 border border-border/40 bg-card">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-xl font-light text-foreground mb-2">{selectedInquiry.subject}</h2>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {selectedInquiry.name}
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            {selectedInquiry.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(selectedInquiry.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{selectedInquiry.projectType}</Badge>
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(selectedInquiry.status)}`} />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mb-6">
                      <h3 className="font-light text-foreground mb-3 flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Message
                      </h3>
                      <div className="bg-muted/20 rounded-lg p-4">
                        <p className="text-foreground font-light leading-relaxed whitespace-pre-wrap">
                          {selectedInquiry.message}
                        </p>
                      </div>
                    </div>

                    {/* Reply Section */}
                    <div className="mb-6">
                      <h3 className="font-light text-foreground mb-3 flex items-center gap-2">
                        <Reply className="h-4 w-4" />
                        Reply
                      </h3>
                      <Textarea
                        placeholder="Type your reply..."
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        rows={4}
                        className="mb-4 bg-background border-border/60"
                      />
                      <Button onClick={handleReply} disabled={!replyMessage.trim()}>
                        <Reply className="h-4 w-4 mr-2" />
                        Send Reply
                      </Button>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-4 border-t border-border/40">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateInquiryStatus(selectedInquiry.id, "archived")}
                      >
                        <Archive className="h-4 w-4 mr-2" />
                        Archive
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteInquiry(selectedInquiry.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </Card>
                ) : (
                  <Card className="p-12 border border-border/40 bg-card text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-light text-foreground mb-2">Select an Inquiry</h3>
                    <p className="text-muted-foreground font-light">
                      Choose an inquiry from the list to view details and respond.
                    </p>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
