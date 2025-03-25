'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { uploadFile } from '@/lib/upload'
import Button from '../ui/Button'

export default function UploadResource() {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [course, setCourse] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !description || !course || !file) return

    setLoading(true)
    try {
      const fileUrl = await uploadFile(file, 'resource')
      if (!fileUrl) throw new Error('Failed to upload file')

      const { error } = await supabase.from('resources').insert({
        title,
        description,
        course,
        file_url: fileUrl,
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        user_id: (await supabase.auth.getUser()).data.user?.id,
      })

      if (error) throw error

      // Reset form
      setTitle('')
      setDescription('')
      setCourse('')
      setFile(null)
    } catch (error) {
      console.error('Error uploading resource:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Course</label>
        <input
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="e.g. CSE 4125"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">File</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Resource'}
      </Button>
    </form>
  )
}
