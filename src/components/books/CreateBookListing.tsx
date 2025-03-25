'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { uploadFile } from '@/lib/upload'
import ImageUpload from '../ui/ImageUpload'
import Button from '../ui/Button'

export default function CreateBookListing() {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !description || !price || !image) return

    setLoading(true)
    try {
      const imageUrl = await uploadFile(image, 'book')
      if (!imageUrl) throw new Error('Failed to upload image')

      const { error } = await supabase.from('books').insert({
        title,
        description,
        price: parseFloat(price),
        image_url: imageUrl,
        user_id: (await supabase.auth.getUser()).data.user?.id,
        status: 'available'
      })

      if (error) throw error
      
      // Reset form
      setTitle('')
      setDescription('')
      setPrice('')
      setImage(null)
    } catch (error) {
      console.error('Error creating book listing:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Book Title</label>
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
        <label className="block text-sm font-medium mb-1">Price (BDT)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded"
          min="0"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Book Image</label>
        <ImageUpload
          onImageSelect={(file) => setImage(file)}
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Listing'}
      </Button>
    </form>
  )
}
