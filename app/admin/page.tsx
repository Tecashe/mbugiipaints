"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Image from "next/image"
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Upload,
  BarChart3,
  Users,
  Mail,
  Settings,
  Search,
  Filter,
  DollarSign,
  Palette,
  BookOpen,
  ShoppingBag,
  Calendar,
  LogOut,
} from "lucide-react"

// Mock data for the admin dashboard
const mockArtworks = [
  {
    id: 1,
    title: "Sunset Dreams",
    medium: "Oil on Canvas",
    size: "24x36 inches",
    year: "2024",
    category: "Landscapes",
    price: 1200,
    available: true,
    views: 245,
    inquiries: 8,
    image: "/abstract-sunset-painting-with-warm-colors.jpg",
  },
  {
    id: 2,
    title: "Urban Reflections",
    medium: "Acrylic on Canvas",
    size: "18x24 inches",
    year: "2024",
    category: "Urban",
    price: 850,
    available: true,
    views: 189,
    inquiries: 5,
    image: "/urban-cityscape-reflection.png",
  },
  {
    id: 3,
    title: "Nature's Symphony",
    medium: "Watercolor",
    size: "16x20 inches",
    year: "2023",
    category: "Nature",
    price: 650,
    available: false,
    views: 312,
    inquiries: 12,
    image: "/nature-landscape-watercolor-painting.jpg",
  },
]

const mockClasses = [
  {
    id: 1,
    title: "Watercolor Fundamentals",
    level: "beginner",
    duration: "4 weeks",
    price: 280,
    enrolled: 6,
    maxStudents: 8,
    startDate: "March 15, 2025",
    status: "active",
  },
  {
    id: 2,
    title: "Advanced Oil Painting",
    level: "advanced",
    duration: "6 weeks",
    price: 450,
    enrolled: 4,
    maxStudents: 6,
    startDate: "March 20, 2025",
    status: "active",
  },
  {
    id: 3,
    title: "Portrait Painting Masterclass",
    level: "intermediate",
    duration: "8 weeks",
    price: 650,
    enrolled: 3,
    maxStudents: 6,
    startDate: "April 1, 2025",
    status: "upcoming",
  },
]

const mockOrders = [
  {
    id: 1,
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    artwork: "Sunset Dreams",
    amount: 1200,
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: 2,
    customer: "Michael Chen",
    email: "michael@example.com",
    artwork: "Nature's Symphony",
    amount: 650,
    status: "processing",
    date: "2024-01-14",
  },
  {
    id: 3,
    customer: "Emma Davis",
    email: "emma@example.com",
    artwork: "Urban Reflections",
    amount: 850,
    status: "pending",
    date: "2024-01-13",
  },
]

const mockInquiries = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    subject: "Commission Inquiry",
    message: "I'm interested in commissioning a similar piece for my living room...",
    date: "2024-01-15",
    status: "new",
    type: "commission",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael@example.com",
    subject: "Class Enrollment",
    message: "Would like to enroll in the watercolor fundamentals class...",
    date: "2024-01-14",
    status: "responded",
    type: "class",
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma@example.com",
    subject: "Artwork Purchase",
    message: "Is the Urban Reflections piece still available for purchase?",
    date: "2024-01-13",
    status: "in-progress",
    type: "purchase",
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userRole")
    window.location.href = "/"
  }

  const stats = {
    totalArtworks: 15,
    availableArtworks: 12,
    totalViews: 2847,
    totalInquiries: 34,
    monthlyRevenue: 4200,
    conversionRate: 12.5,
    activeClasses: 3,
    totalStudents: 24,
    pendingOrders: 2,
    completedOrders: 18,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
      case "active":
      case "available":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
      case "upcoming":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "processing":
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "completed":
      case "responded":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="bg-card border-b border-border sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Palette className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-xl font-light tracking-wide">mbugiipaints</span>
                </div>
                <Badge variant="secondary" className="font-light tracking-wide">
                  Admin Dashboard
                </Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" className="font-light bg-transparent">
                  <Link href="/" className="flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>View Site</span>
                  </Link>
                </Button>
                <Button size="sm" className="font-light tracking-wide">
                  <Link href="/admin/upload" className="flex items-center space-x-2">
                    <Plus className="w-4 h-4 mr-2" />
                    <span>Add Artwork</span>
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="font-light text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tab Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview" className="font-light">
                <BarChart3 className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="artworks" className="font-light">
                <Upload className="w-4 h-4 mr-2" />
                Artworks
              </TabsTrigger>
              <TabsTrigger value="classes" className="font-light">
                <BookOpen className="w-4 h-4 mr-2" />
                Classes
              </TabsTrigger>
              <TabsTrigger value="orders" className="font-light">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="inquiries" className="font-light">
                <Mail className="w-4 h-4 mr-2" />
                Inquiries
              </TabsTrigger>
              <TabsTrigger value="settings" className="font-light">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8 mt-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-light text-muted-foreground">Total Artworks</p>
                      <p className="text-3xl font-light text-foreground">{stats.totalArtworks}</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Upload className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <p className="text-sm font-light text-muted-foreground mt-2">
                    <span className="text-green-600">+2</span> this month
                  </p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-light text-muted-foreground">Active Classes</p>
                      <p className="text-3xl font-light text-foreground">{stats.activeClasses}</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <p className="text-sm font-light text-muted-foreground mt-2">{stats.totalStudents} total students</p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-light text-muted-foreground">Monthly Revenue</p>
                      <p className="text-3xl font-light text-foreground">${stats.monthlyRevenue.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <p className="text-sm font-light text-muted-foreground mt-2">
                    <span className="text-green-600">+23%</span> from last month
                  </p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-light text-muted-foreground">Total Views</p>
                      <p className="text-3xl font-light text-foreground">{stats.totalViews.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Eye className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <p className="text-sm font-light text-muted-foreground mt-2">
                    <span className="text-green-600">+15%</span> from last month
                  </p>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="p-6">
                  <h3 className="text-lg font-light text-foreground mb-4">Recent Orders</h3>
                  <div className="space-y-4">
                    {mockOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex-1">
                          <p className="font-light text-foreground">{order.customer}</p>
                          <p className="text-sm font-light text-muted-foreground">{order.artwork}</p>
                          <p className="text-xs font-light text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-light text-foreground">${order.amount}</p>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 font-light bg-transparent">
                    View All Orders
                  </Button>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-light text-foreground mb-4">Class Enrollments</h3>
                  <div className="space-y-4">
                    {mockClasses.map((cls) => (
                      <div key={cls.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex-1">
                          <p className="font-light text-foreground">{cls.title}</p>
                          <p className="text-sm font-light text-muted-foreground">
                            {cls.enrolled}/{cls.maxStudents} students
                          </p>
                          <p className="text-xs font-light text-muted-foreground">{cls.startDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-light text-foreground">${cls.price}</p>
                          <Badge className={getStatusColor(cls.status)}>{cls.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 font-light bg-transparent">
                    Manage Classes
                  </Button>
                </Card>
              </div>
            </TabsContent>

            {/* Artworks Tab */}
            <TabsContent value="artworks" className="space-y-6 mt-8">
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search artworks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 font-light"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="font-light bg-transparent">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm" className="font-light tracking-wide">
                    <Link href="/admin/upload" className="flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Add New Artwork</span>
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Artworks Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockArtworks.map((artwork) => (
                  <Card key={artwork.id} className="overflow-hidden">
                    <div className="relative">
                      <Image
                        src={artwork.image || "/placeholder.svg"}
                        alt={artwork.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className={getStatusColor(artwork.available ? "available" : "sold")}>
                          {artwork.available ? "Available" : "Sold"}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-light text-foreground">{artwork.title}</h3>
                        <p className="text-sm font-light text-muted-foreground">{artwork.medium}</p>
                        <p className="text-sm font-light text-muted-foreground">{artwork.size}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-light text-primary">${artwork.price}</span>
                        <div className="text-sm font-light text-muted-foreground">
                          <span>{artwork.views} views</span> • <span>{artwork.inquiries} inquiries</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 font-light bg-transparent">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 font-light bg-transparent">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-700 font-light bg-transparent"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Classes Tab */}
            <TabsContent value="classes" className="space-y-6 mt-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-light text-foreground">Art Classes Management</h2>
                <Button className="font-light tracking-wide">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Class
                </Button>
              </div>

              <div className="grid gap-6">
                {mockClasses.map((cls) => (
                  <Card key={cls.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-light text-foreground">{cls.title}</h3>
                        <div className="flex items-center space-x-4 text-sm font-light text-muted-foreground">
                          <span>Level: {cls.level}</span>
                          <span>Duration: {cls.duration}</span>
                          <span>Price: ${cls.price}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm font-light text-muted-foreground">
                          <span>
                            Students: {cls.enrolled}/{cls.maxStudents}
                          </span>
                          <span>Starts: {cls.startDate}</span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(cls.status)}>{cls.status}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="font-light bg-transparent">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Class
                      </Button>
                      <Button variant="outline" size="sm" className="font-light bg-transparent">
                        <Users className="w-4 h-4 mr-2" />
                        View Students
                      </Button>
                      <Button variant="outline" size="sm" className="font-light bg-transparent">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6 mt-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-light text-foreground">Order Management</h2>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="font-light">
                    {stats.pendingOrders} pending
                  </Badge>
                  <Badge variant="secondary" className="font-light">
                    {stats.completedOrders} completed
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <Card key={order.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-2">
                        <h3 className="font-light text-foreground">{order.customer}</h3>
                        <p className="text-sm font-light text-muted-foreground">{order.email}</p>
                        <p className="text-sm font-light text-muted-foreground">Artwork: {order.artwork}</p>
                        <p className="text-sm font-light text-muted-foreground">Order Date: {order.date}</p>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="text-xl font-light text-foreground">${order.amount}</div>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="font-light bg-transparent">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="font-light bg-transparent">
                        Update Status
                      </Button>
                      <Button variant="outline" size="sm" className="font-light bg-transparent">
                        Contact Customer
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Inquiries Tab */}
            <TabsContent value="inquiries" className="space-y-6 mt-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-light text-foreground">Customer Inquiries</h2>
                <Badge variant="secondary" className="font-light">
                  {mockInquiries.length} total
                </Badge>
              </div>

              <div className="space-y-4">
                {mockInquiries.map((inquiry) => (
                  <Card key={inquiry.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-2">
                        <h3 className="font-light text-foreground">{inquiry.name}</h3>
                        <p className="text-sm font-light text-muted-foreground">{inquiry.email}</p>
                        <p className="text-sm font-light text-muted-foreground">Subject: {inquiry.subject}</p>
                        <p className="text-sm font-light text-muted-foreground">Type: {inquiry.type}</p>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge className={getStatusColor(inquiry.status)}>{inquiry.status}</Badge>
                        <p className="text-sm font-light text-muted-foreground">{inquiry.date}</p>
                      </div>
                    </div>
                    <p className="font-light text-muted-foreground mb-4 text-pretty">{inquiry.message}</p>
                    <div className="flex gap-2">
                      <Button size="sm" className="font-light tracking-wide">
                        Reply
                      </Button>
                      <Button variant="outline" size="sm" className="font-light bg-transparent">
                        Mark as Read
                      </Button>
                      <Button variant="outline" size="sm" className="font-light bg-transparent">
                        Archive
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6 mt-8">
              <h2 className="text-2xl font-light text-foreground">Settings</h2>
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-light text-foreground mb-4">Profile Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="artistName" className="font-light">
                        Artist Name
                      </Label>
                      <Input id="artistName" defaultValue="mbugiipaints" className="font-light" />
                    </div>
                    <div>
                      <Label htmlFor="email" className="font-light">
                        Email
                      </Label>
                      <Input id="email" type="email" defaultValue="hello@mbugiipaints.com" className="font-light" />
                    </div>
                    <div>
                      <Label htmlFor="bio" className="font-light">
                        Bio
                      </Label>
                      <Textarea
                        id="bio"
                        rows={4}
                        defaultValue="Passionate artist creating vibrant paintings that bring color and emotion to life."
                        className="font-light"
                      />
                    </div>
                    <Button className="font-light tracking-wide">Save Changes</Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-light text-foreground mb-4">Notification Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-light text-foreground">New Orders</p>
                        <p className="text-sm font-light text-muted-foreground">Get notified when someone purchases</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-light text-foreground">Class Enrollments</p>
                        <p className="text-sm font-light text-muted-foreground">
                          Notifications for new class registrations
                        </p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-light text-foreground">Weekly Reports</p>
                        <p className="text-sm font-light text-muted-foreground">Receive weekly analytics summaries</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-light text-foreground">Marketing Updates</p>
                        <p className="text-sm font-light text-muted-foreground">
                          Tips and updates about promoting your art
                        </p>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthGuard>
  )
}
