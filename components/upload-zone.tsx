"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, X } from "lucide-react"
import Image from "next/image"

interface UploadZoneProps {
  onFilesChange: (files: File[]) => void
  maxFiles?: number
  acceptedTypes?: string[]
  maxSize?: number // in MB
}

export function UploadZone({
  onFilesChange,
  maxFiles = 10,
  acceptedTypes = ["image/jpeg", "image/png", "image/gif"],
  maxSize = 10,
}: UploadZoneProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [errors, setErrors] = useState<string[]>([])

  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `${file.name}: File type not supported`
    }
    if (file.size > maxSize * 1024 * 1024) {
      return `${file.name}: File size exceeds ${maxSize}MB`
    }
    return null
  }

  const handleFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files)
    const newErrors: string[] = []
    const validFiles: File[] = []

    fileArray.forEach((file) => {
      const error = validateFile(file)
      if (error) {
        newErrors.push(error)
      } else if (uploadedFiles.length + validFiles.length < maxFiles) {
        validFiles.push(file)
      } else {
        newErrors.push(`Maximum ${maxFiles} files allowed`)
      }
    })

    setErrors(newErrors)

    if (validFiles.length > 0) {
      const updatedFiles = [...uploadedFiles, ...validFiles]
      setUploadedFiles(updatedFiles)
      onFilesChange(updatedFiles)
    }
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      if (e.dataTransfer.files) {
        handleFiles(e.dataTransfer.files)
      }
    },
    [uploadedFiles, maxFiles],
  )

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  const removeFile = (index: number) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(updatedFiles)
    onFilesChange(updatedFiles)
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive ? "border-amber-400 bg-amber-50" : "border-gray-300 hover:border-amber-400 hover:bg-amber-50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept={acceptedTypes.join(",")}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="space-y-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <Upload className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <p className="text-lg font-medium text-gray-900">Drop your images here</p>
            <p className="text-gray-600">or click to browse files</p>
          </div>
          <p className="text-sm text-gray-500">
            Supports: {acceptedTypes.map((type) => type.split("/")[1].toUpperCase()).join(", ")} up to {maxSize}MB each
          </p>
          <p className="text-sm text-gray-500">Maximum {maxFiles} files</p>
        </div>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-red-800 mb-2">Upload Errors:</h4>
          <ul className="text-sm text-red-700 space-y-1">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* File Preview */}
      {uploadedFiles.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Uploaded Images ({uploadedFiles.length}/{maxFiles})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
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
                <p className="text-xs text-gray-600 mt-1 truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(1)}MB</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
