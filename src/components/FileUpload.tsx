'use client'

import { useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import { uploadFile } from '@/lib/upload'

interface FileUploadProps {
  type: 'book' | 'resource' | 'lost-found' | 'post' | 'avatar'
  onUploadComplete: (url: string) => void
  className?: string
}

export default function FileUpload({ type, onUploadComplete, className = '' }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const url = await uploadFile(file, type)
      if (url) {
        onUploadComplete(url)
      }
    } catch (error) {
      console.error('Upload failed:', error)
    }
    setIsUploading(false)
  }

  return (
    <div className={`relative ${className}`}>
      <input
        type="file"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={isUploading}
      />
      <div className="flex items-center justify-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg">
        <FiUpload />
        <span>{isUploading ? 'Uploading...' : 'Upload File'}</span>
      </div>
    </div>
  )
}
