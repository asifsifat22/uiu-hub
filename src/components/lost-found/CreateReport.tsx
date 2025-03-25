'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { uploadFile } from '@/lib/upload'
import ImageUpload from '../ui/ImageUpload'
import Button from '../ui/Button'

export default function CreateReport() {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState<'lost' | 'found'>('lost')
  const [location, setLocation] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !description || !location) return

    setLoading(true)
    try {
      let imageUrl = null
      if (image) {
        imageUrl = await uploadFile(image, 'lost-found')
      }

      const { error } = await supabase.from('lost_found').insert({
        title,
        description,
        type,
        location,
        image_url: imageUrl,
        user_id: (await supabase.auth.getUser()).data.user?.id,
        status: 'open'
      })

      if (error) throw error

      // Reset form
      setTitle('')
      setDescription('')
      setLocation('')
      setImage(null)
    } catch (error) {
      console.error('Error creating report:', error)
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
        <label className="block text-sm font-medium mb-1">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as 'lost' | 'found')}
          className="w-full p-2 border rounded"
        >
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
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
        <label className="block text-sm font-medium mb-1">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image (Optional)</label>
        <ImageUpload
          onImageSelect={(file) => setImage(file)}
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Report'}
      </Button>
    </form>
  )
}
