'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FiBook, FiUsers, FiSearch, FiHome, FiMessageCircle, FiFileText, FiTrendingUp, FiBell } from 'react-icons/fi'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import LoadingScreen from '@/components/ui/LoadingScreen'

const features = [
  {
    name: 'Book Exchange',
    description: 'Buy, sell, or exchange second-hand books and notes.',
    icon: FiBook,
    href: '/dashboard/books',
    color: 'bg-blue-500',
    stats: '150+ listings'
  },
  {
    name: 'Study Groups',
    description: 'Create or join study groups with your classmates.',
    icon: FiUsers,
    href: '/dashboard/study-groups',
    color: 'bg-green-500',
    stats: '25 active groups'
  },
  {
    name: 'Lost & Found',
    description: 'Report lost items or help others find their belongings.',
    icon: FiSearch,
    href: '/dashboard/lost-found',
    color: 'bg-yellow-500',
    stats: '10 recent items'
  },
  {
    name: 'Roommate Finder',
    description: 'Find roommates or search for available hostels.',
    icon: FiHome,
    href: '/dashboard/roommate',
    color: 'bg-purple-500',
    stats: '45 listings'
  },
  {
    name: 'Social Feed',
    description: 'Stay updated with campus activities and announcements.',
    icon: FiMessageCircle,
    href: '/dashboard/feed',
    color: 'bg-pink-500',
    stats: '100+ posts today'
  },
  {
    name: 'Resources',
    description: 'Access and share study materials and resources.',
    icon: FiFileText,
    href: '/dashboard/resources',
    color: 'bg-indigo-500',
    stats: '500+ resources'
  },
]

const quickActions = [
  { name: 'Post Book', icon: FiBook, href: '/dashboard/books/new' },
  { name: 'Create Group', icon: FiUsers, href: '/dashboard/study-groups/new' },
  { name: 'Report Lost Item', icon: FiSearch, href: '/dashboard/lost-found/new' },
  { name: 'Create Post', icon: FiMessageCircle, href: '/dashboard/feed/new' },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/')
      } else {
        setUser(user)
      }
      setLoading(false)
    }

    getUser()
  }, [router, supabase])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block"
        >
          <Card className="px-6 py-4 mb-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center">
                <FiTrendingUp className="h-6 w-6" />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-semibold text-gray-900">Welcome back!</h2>
                <p className="text-gray-600">Your campus activity is trending up 24% this week</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Welcome to UIU Hub
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600"
        >
          Your one-stop platform for all campus needs
        </motion.p>
      </div>

      {/* Quick Actions */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {quickActions.map((action) => (
          <motion.div key={action.name} variants={item}>
            <Link href={action.href}>
              <Button
                variant="outline"
                className="w-full"
                icon={<action.icon className="h-5 w-5" />}
              >
                {action.name}
              </Button>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Features Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {features.map((feature) => (
          <motion.div key={feature.name} variants={item}>
            <Link href={feature.href}>
              <Card className="p-6 h-full">
                <div className={`${feature.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{feature.name}</h2>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-primary font-medium">{feature.stats}</span>
                  <span className="text-gray-400">View details →</span>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Help Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-center"
      >
        <Card className="inline-block px-6 py-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <FiBell className="h-5 w-5 text-primary" />
            <span>Need help? Contact support at support@uiuhub.com</span>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
