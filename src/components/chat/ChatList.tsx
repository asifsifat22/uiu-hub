'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'

interface Profile {
  id: string
  full_name: string
  avatar_url: string | null
}

export default function ChatList() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data: profiles, error } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url')
          .neq('id', (await supabase.auth.getUser()).data.user?.id)

        if (error) throw error
        setProfiles(profiles || [])
      } catch (error) {
        console.error('Error fetching profiles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfiles()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-2">
      {profiles.map((profile) => (
        <Link
          key={profile.id}
          href={`/dashboard/chat/${profile.id}`}
          className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            {profile.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={profile.full_name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                {profile.full_name[0]}
              </div>
            )}
          </div>
          <div className="ml-3">
            <h3 className="font-medium">{profile.full_name}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}
