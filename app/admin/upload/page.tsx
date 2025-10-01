"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Upload, X, ArrowLeft, Save, Eye, AlertCircle, CheckCircle, Palette } from "lucide-react"

export default function UploadArtworkPage() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [formData, setFormData] = useState({
    title: "",
    medium: "",
    size: "",
    year: new Date().getFullYear().toString(),
    category: "",
    price: "",
    description: "",
    available: true,
    tags: "",
  })
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")

  const categories = ["Landscapes", "Urban", "Nature", "Abstract", "Portraits", "Still Life"]
  const mediums = ["Oil on Canvas", "Acrylic on Canvas", "Watercolor", "Mixed Media", "Digital", "Charcoal", "Pastel"]

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("image/"))
      setUploadedFiles((prev) => [...prev, ...files])
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter((file) => file.type.startsWith("image/"))
      setUploadedFiles((prev) => [...prev, ...files])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)
    setUploadStatus("uploading")

    // Simulate upload process
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setUploadStatus("success")

      // Reset form after successful upload
      setTimeout(() => {
        setFormData({
          title: "",
          medium: "",
          size: "",
          year: new Date().getFullYear().toString(),
          category: "",
          price: "",
          description: "",
          available: true,
          tags: "",
        })
        setUploadedFiles([])
        setUploadStatus("idle")
      }, 2000)
    } catch (error) {
      setUploadStatus("error")
    } finally {
      setIsUploading(false)
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
                <Link
                  href="/admin"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground font-light"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Dashboard</span>
                </Link>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Palette className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-xl font-light tracking-wide">mbugiipaints</span>
                </div>
                <Badge variant="secondary" className="font-light tracking-wide">
                  Upload Artwork
                </Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" className="font-light bg-transparent">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Upload Status */}
          {uploadStatus === "success" && (
            <Card className="p-4 mb-6 bg-green-50 border-green-200">
              <div className="flex items-center space-x-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                <span className="font-light">Artwork uploaded successfully!</span>
              </div>
            </Card>
          )}

          {uploadStatus === "error" && (
            <Card className="p-4 mb-6 bg-red-50 border-red-200">
              <div className="flex items-center space-x-2 text-red-800">
                <AlertCircle className="w-5 h-5" />
                <span className="font-light">Upload failed. Please try again.</span>
              </div>
            </Card>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload Section */}
            <Card className="p-6">
              <h2 className="text-xl font-light text-foreground mb-4">Upload Images</h2>

              {/* Drag and Drop Area */}
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary hover:bg-primary/5"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-lg font-light text-foreground">Drop your images here</p>
                    <p className="font-light text-muted-foreground">or click to browse files</p>
                  </div>
                  <p className="text-sm font-light text-muted-foreground">Supports: JPG, PNG, GIF up to 10MB each</p>
                </div>
              </div>

              {/* Uploaded Files Preview */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-light text-foreground mb-4">Uploaded Images ({uploadedFiles.length})</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                          <Image
                            src={URL.createObjectURL(file) || "/placeholder.svg"}
                            alt={`Upload ${index + 1}`}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <p className="text-xs font-light text-muted-foreground mt-1 truncate">{file.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Artwork Details */}
            <Card className="p-6">
              <h2 className="text-xl font-light text-foreground mb-4">Artwork Details</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="font-light">
                      Title *
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter artwork title"
                      className="font-light"
                    />
                  </div>

                  <div>
                    <Label htmlFor="medium" className="font-light">
                      Medium *
                    </Label>
                    <select
                      id="medium"
                      name="medium"
                      value={formData.medium}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-border rounded-md bg-background font-light focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select medium</option>
                      {mediums.map((medium) => (
                        <option key={medium} value={medium}>
                          {medium}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="size" className="font-light">
                      Size *
                    </Label>
                    <Input
                      id="size"
                      name="size"
                      value={formData.size}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 24x36 inches"
                      className="font-light"
                    />
                  </div>

                  <div>
                    <Label htmlFor="year" className="font-light">
                      Year *
                    </Label>
                    <Input
                      id="year"
                      name="year"
                      type="number"
                      value={formData.year}
                      onChange={handleInputChange}
                      required
                      min="1900"
                      max={new Date().getFullYear()}
                      className="font-light"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="category" className="font-light">
                      Category *
                    </Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-border rounded-md bg-background font-light focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="price" className="font-light">
                      Price
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="e.g., 1200"
                      className="font-light"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tags" className="font-light">
                      Tags
                    </Label>
                    <Input
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="landscape, sunset, warm colors (comma separated)"
                      className="font-light"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="available"
                      name="available"
                      checked={formData.available}
                      onChange={handleInputChange}
                      className="rounded"
                    />
                    <Label htmlFor="available" className="font-light">
                      Available for purchase
                    </Label>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Label htmlFor="description" className="font-light">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe your artwork, inspiration, techniques used, or any other details..."
                  className="font-light"
                />
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <Button type="button" variant="outline" className="font-light bg-transparent">
                Save as Draft
              </Button>
              <div className="flex space-x-4">
                <Button type="button" variant="outline" className="font-light bg-transparent">
                  Preview
                </Button>
                <Button
                  type="submit"
                  disabled={isUploading || uploadedFiles.length === 0 || !formData.title}
                  className="font-light tracking-wide disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Publish Artwork
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AuthGuard>
  )
}
