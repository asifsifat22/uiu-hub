'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiHeart, FiMessageCircle, FiShare2, FiMoreVertical } from 'react-icons/fi'
import Image from 'next/image'
import TimeAgo from 'react-timeago'
import Card from '@/components/ui/Card'

interface PostProps {
  post: {
    id: string
    content: string
    images: string[]
    likes: number
    created_at: string
    profiles: {
      id: string
      full_name: string
      avatar_url: string | null
    }
    comments: {
      id: string
      content: string
      created_at: string
      profiles: {
        id: string
        full_name: string
        avatar_url: string | null
      }
    }[]
  }
}

export default function Post({ post }: PostProps) {
  const [showComments, setShowComments] = useState(false)
  const [comment, setComment] = useState('')
  const [liked, setLiked] = useState(false)

  const handleLike = () => {
    setLiked(!liked)
    // TODO: Implement like functionality with Supabase
  }

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return
    // TODO: Implement comment functionality with Supabase
    setComment('')
  }

  return (
    <Card className="mb-6 overflow-hidden">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10">
            {post.profiles.avatar_url ? (
              <Image
                src={post.profiles.avatar_url}
                alt={post.profiles.full_name}
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">
                  {post.profiles.full_name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {post.profiles.full_name}
            </h3>
            <div className="text-sm text-gray-500">
              <TimeAgo date={post.created_at} />
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <FiMoreVertical className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Post Content */}
      <p className="px-4 mb-4 text-gray-600">{post.content}</p>

      {/* Post Images */}
      {post.images.length > 0 && (
        <div className={`grid gap-1 mb-4 ${
          post.images.length === 1 ? 'grid-cols-1' :
          post.images.length === 2 ? 'grid-cols-2' :
          'grid-cols-3'
        }`}>
          {post.images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square"
            >
              <Image
                src={image}
                alt={`Post image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Post Actions */}
      <div className="px-4 py-2 border-t border-gray-100 flex items-center gap-6">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 ${
            liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
          } transition-colors`}
        >
          <FiHeart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
          <span>{post.likes + (liked ? 1 : 0)}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors"
        >
          <FiMessageCircle className="w-5 h-5" />
          <span>{post.comments.length}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors">
          <FiShare2 className="w-5 h-5" />
          <span>Share</span>
        </button>
      </div>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-gray-100 overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="relative h-8 w-8 flex-shrink-0">
                    {comment.profiles.avatar_url ? (
                      <Image
                        src={comment.profiles.avatar_url}
                        alt={comment.profiles.full_name}
                        fill
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">
                          {comment.profiles.full_name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <h4 className="font-semibold text-sm text-gray-900">
                        {comment.profiles.full_name}
                      </h4>
                      <p className="text-sm text-gray-600">{comment.content}</p>
                    </div>
                    <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
                      <div className="text-sm text-gray-500">
                        <TimeAgo date={comment.created_at} />
                      </div>
                      <button className="hover:text-primary transition-colors">
                        Like
                      </button>
                      <button className="hover:text-primary transition-colors">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Comment Form */}
              <form onSubmit={handleComment} className="flex gap-3">
                <div className="relative h-8 w-8 flex-shrink-0">
                  {/* Current user avatar */}
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">U</span>
                  </div>
                </div>
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 bg-gray-50 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
