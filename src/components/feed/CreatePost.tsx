'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiImage, FiX } from 'react-icons/fi'
import Button from '@/components/ui/Button'
import { uploadFile } from '@/lib/upload'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

export default function CreatePost({ onPostCreated }: { onPostCreated: () => void }) {
  const [content, setContent] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setSelectedFiles(prev => [...prev, ...files])
    
    // Create previews
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviews(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
    setPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() && selectedFiles.length === 0) return

    try {
      setLoading(true)

      // Upload images if any
      const imageUrls = await Promise.all(
        selectedFiles.map(file => uploadFile(file, 'post'))
      )

      // Create post
      const { error } = await supabase.from('posts').insert({
        user_id: (await supabase.auth.getUser()).data.user?.id,
        content,
        images: imageUrls.filter(Boolean)
      })

      if (error) throw error

      // Reset form
      setContent('')
      setSelectedFiles([])
      setPreviews([])
      onPostCreated()
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-4 mb-6"
    >
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full min-h-[100px] p-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary resize-none"
        />

        {/* Image Previews */}
        <AnimatePresence>
          {previews.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-3 gap-2 mt-2"
            >
              {previews.map((preview, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between mt-4">
          <div className="relative">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="flex items-center gap-2 text-gray-500 hover:text-primary cursor-pointer transition-colors"
            >
              <FiImage className="w-5 h-5" />
              <span>Add Photos</span>
            </label>
          </div>

          <Button
            type="submit"
            loading={loading}
            disabled={!content.trim() && selectedFiles.length === 0}
          >
            Post
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
