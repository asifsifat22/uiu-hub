'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FiEdit2, FiMail, FiPhone, FiBook, FiMapPin } from 'react-icons/fi'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Image from 'next/image'

interface Profile {
  id: string
  full_name: string
  avatar_url: string | null
  department: string
  student_id: string
  phone: string
  bio: string
  email: string
}

export default function Profile() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      let { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) throw error

      setProfile({ ...data, email: user.email || '' })
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Profile Header */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="relative h-24 w-24">
                {profile?.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt={profile.full_name}
                    fill
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary">
                      {profile?.full_name?.charAt(0) || '?'}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{profile?.full_name}</h1>
                <p className="text-gray-500">{profile?.department} Student</p>
                <p className="text-sm text-gray-400">Student ID: {profile?.student_id}</p>
              </div>
            </div>
            <Button
              variant="outline"
              icon={<FiEdit2 />}
              onClick={() => router.push('/dashboard/profile/edit')}
            >
              Edit Profile
            </Button>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600">
                  <FiMail className="h-5 w-5 text-gray-400" />
                  <span>{profile?.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <FiPhone className="h-5 w-5 text-gray-400" />
                  <span>{profile?.phone || 'Not provided'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Academic Information</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600">
                  <FiBook className="h-5 w-5 text-gray-400" />
                  <span>{profile?.department}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <FiMapPin className="h-5 w-5 text-gray-400" />
                  <span>United International University</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          {profile?.bio && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">About</h2>
              <p className="text-gray-600">{profile.bio}</p>
            </div>
          )}
        </Card>

        {/* Activity Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Study Groups</h3>
            <p className="text-3xl font-bold text-primary">12</p>
            <p className="text-sm text-gray-500">Active groups</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Book Exchange</h3>
            <p className="text-3xl font-bold text-primary">8</p>
            <p className="text-sm text-gray-500">Active listings</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Resources</h3>
            <p className="text-3xl font-bold text-primary">25</p>
            <p className="text-sm text-gray-500">Shared resources</p>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
